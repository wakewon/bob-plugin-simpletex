import requests
import base64


class Client:
    def __init__(self, api_key):
        self.api_key = api_key
        self.url = 'https://api.mathpix.com/v3/text'

    def infer(self, image_bytes):
        data_url = 'data:image/png;base64,' + base64.b64encode(image_bytes).decode()
        resp = requests.post(
            self.url,
            headers={
                'Content-Type': 'application/json',
                'app_id': 'bob-plugin-mathpix-debug',
                'app_key': self.api_key,
            },
            json={
                'url': data_url
            }
        )
        print(resp)
        print(resp.json())


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('api_key')
    parser.add_argument('image')

    args = parser.parse_args()

    client = Client(args.api_key)
    image_bytes = open(args.image, 'rb').read()
    client.infer(image_bytes)
    
