import json
import os
import pg8000.native

SCHEMA = os.environ['MAIN_DB_SCHEMA']

def get_conn():
    url = os.environ['DATABASE_URL']
    # postgresql://user:pass@host:port/db
    from urllib.parse import urlparse
    p = urlparse(url)
    return pg8000.native.Connection(
        user=p.username,
        password=p.password,
        host=p.hostname,
        port=p.port or 5432,
        database=p.path.lstrip('/'),
    )

def handler(event: dict, context) -> dict:
    """Управление каталогом конфет: получение, добавление, обновление, удаление позиций"""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    method = event.get('httpMethod')

    if method == 'GET':
        conn = get_conn()
        rows = conn.run(f'SELECT id, name, price, description, image_url, sort_order FROM {SCHEMA}.catalog_items ORDER BY sort_order, id')
        conn.close()
        items = [{'id': r[0], 'name': r[1], 'price': r[2], 'description': r[3], 'image_url': r[4], 'sort_order': r[5]} for r in rows]
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps(items, ensure_ascii=False)}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        conn = get_conn()
        rows = conn.run(
            f"INSERT INTO {SCHEMA}.catalog_items (name, price, description, image_url, sort_order) VALUES (:name, :price, :description, :image_url, (SELECT COALESCE(MAX(sort_order),0)+1 FROM {SCHEMA}.catalog_items)) RETURNING id",
            name=body['name'], price=body['price'], description=body.get('description', ''), image_url=body.get('image_url', '')
        )
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'id': rows[0][0]})}

    if method == 'PUT':
        body = json.loads(event.get('body') or '{}')
        conn = get_conn()
        conn.run(
            f'UPDATE {SCHEMA}.catalog_items SET name=:name, price=:price, description=:description, image_url=:image_url WHERE id=:id',
            name=body['name'], price=body['price'], description=body.get('description', ''), image_url=body.get('image_url', ''), id=body['id']
        )
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    if method == 'DELETE':
        params = event.get('queryStringParameters') or {}
        conn = get_conn()
        conn.run(f'DELETE FROM {SCHEMA}.catalog_items WHERE id=:id', id=int(params['id']))
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': cors, 'body': 'Method not allowed'}
