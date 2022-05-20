import sys
import socket


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(f"Missing arguments, (expected 1 recivied {len(sys.argv - 1)})")
        exit(-1)
    host = "127.0.0.1"
    port = int(sys.argv[1])

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as soc:
        soc.bind((host, port))
        soc.listen()
        con, addr = soc.accept()
        while True:
            data = con.recv(1024)
            if not data:
                break
            content = ""
            with open("example.html","r") as f:
                content = f.read()

            con.sendall(bytes(f"HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n{content}", "ASCII"))

    soc.close()
