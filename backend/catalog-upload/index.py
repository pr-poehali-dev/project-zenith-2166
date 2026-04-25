import json
import os
import base64
import uuid
import boto3

def handler(event: dict, context) -> dict:
    """Загрузка фото товара в S3 и возврат публичного URL"""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    data_url = body.get('image', '')

    if ',' in data_url:
        header, encoded = data_url.split(',', 1)
    else:
        encoded = data_url

    ext = 'jpg'
    if 'png' in (header if ',' in data_url else ''):
        ext = 'png'
    elif 'webp' in (header if ',' in data_url else ''):
        ext = 'webp'

    image_bytes = base64.b64decode(encoded)
    key = f'catalog/{uuid.uuid4()}.{ext}'

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    s3.put_object(Bucket='files', Key=key, Body=image_bytes, ContentType=f'image/{ext}')

    url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/files/{key}"
    return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'url': url})}
