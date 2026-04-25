import json
import os
import hashlib
import psycopg2

SCHEMA = os.environ['MAIN_DB_SCHEMA']
SALT = 'sweet_candy_salt_2024'

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def make_token(phone: str, pw_hash: str) -> str:
    return hashlib.sha256(f"{phone}:{pw_hash}:{SALT}".encode()).hexdigest()

def handler(event: dict, context) -> dict:
    """Авторизация администратора по номеру телефона и паролю"""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    action = body.get('action')

    if action == 'login':
        phone = body.get('phone', '').strip().replace("'", "''")
        password = body.get('password', '')
        pw_hash = hashlib.sha256(password.encode()).hexdigest()
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id FROM {SCHEMA}.admins WHERE phone='{phone}' AND password_hash='{pw_hash}'")
        row = cur.fetchone()
        conn.close()
        if row:
            token = make_token(phone, pw_hash)
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True, 'token': token})}
        return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'ok': False, 'error': 'Неверный телефон или пароль'})}

    if action == 'verify':
        token = body.get('token', '')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT phone, password_hash FROM {SCHEMA}.admins")
        rows = cur.fetchall()
        conn.close()
        for phone, pw_hash in rows:
            if make_token(phone, pw_hash) == token:
                return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}
        return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'ok': False})}

    return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Unknown action'})}
