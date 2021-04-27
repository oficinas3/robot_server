import sys
import base64
import os.path

def encode_map():
    home = os.path.expanduser("~")
    path = os.path.join(home,"map.pgm")
    with open(path, 'rb') as f:
        encoded = base64.b64encode(f.read())
        print(encoded[:10].decode('ascii'))


def decode_map(map_str: bytes):
    home = os.path.expanduser("~")
    path = os.path.join(home,"map_dec.txt")
    with open(path, 'wb') as f:
        f.write(base64.decodebytes(map_str))


if len(sys.argv) == 2:
    cmd = sys.argv[1]
    if cmd == "encode":
        encode_map()
    else:
        print("Comando errado")
elif len(sys.argv) == 3:
    cmd = sys.argv[1]
    if cmd == "decode":
        map_str = sys.argv[2].encode()
        decode_map(map_str)
    else:
        print("Comando errado para pgm.py")
else:
    print("Faltando argumento para script pgm.py")
