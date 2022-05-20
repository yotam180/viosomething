import sys
import socket
from NLP.train import *
import json

def parse_messages(content):
    s1 = content.index("message")
    s2 = content[s1:].index("'")
    s3 = content[s1 + s2:].index("'")
    messages = content[s1 + s2 + 1: s1 + s2 + s3 + 1]
    messages = json.loads(messages)

    s1 = content.index("identifier")
    s2 = content[s1:].index("'")
    s3 = content[s1 + s2:].index("'")
    identifier = content[s1 + s2 + 1: s1 + s2 + s3 + 1]
    identifier = int(identifier)

    return messages, identifier


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
        
        data = con.recv(1024) #data is byte like array 
        content = data.decode("utf-8")
        messages, identifier = parse_messages(content)

        prob = check_conversation(messages)
        #call to or's function with prob and identifier

        


    soc.close()
