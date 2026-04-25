import json
import os
import hashlib
import psycopg2

SCHEMA = os.environ['MAIN_DB_SCHEMA']

def handler(event: dict, context) -> dict:
    """Создание учётной записи администратора"""
    cors = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    phone = body.get('phone', '').strip().replace("'", "''")
    password = body.get('password', '')

    if not phone or not password:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'phone and password required'})}

    pw_hash = hashlib.sha256(password.encode()).hexdigest()
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(f"INSERT INTO {SCHEMA}.admins (phone, password_hash) VALUES ('{phone}', '{pw_hash}') ON CONFLICT (phone) DO UPDATE SET password_hash='{pw_hash}'")
    conn.commit()
    conn.close()
    return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}
