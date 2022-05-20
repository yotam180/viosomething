import socket
import sys

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(f"Missing arguments, (expected 2 recivied {len(sys.argv - 1)})")
        exit(-1)
    host = sys.argv[1]
    port = sys.argv[2]

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as soc:
        soc.connect((host, int(port)))
        soc.sendall(bytes(f"GET / HTTP/1.1\r\nHost: {host}\r\n\r\n", "ASCII"))
        data = soc.recv(1024)
        print(data)