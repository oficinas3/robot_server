import sys
import base64


def encode_map():
    with open('map.pgm', 'rb') as f:
        encoded = base64.b64encode(f.read())
        print(encoded[:10].decode('ascii'))


def decode_map(map_str: bytes):
    with open('map_dec.txt', 'wb') as f:
        f.write(base64.decodebytes(map_str))


if len(sys.argv) > 2:
    cmd = sys.argv[1]
    if cmd == "encode":
        encode_map()
    else:
        map_str = sys.argv[2].encode()
        decode_map(map_str)
else:
    print("Hello")
