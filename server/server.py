import sys
import socket
from NLP.infer import *
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
   
    host = "127.0.0.1"
    port = 9000

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as soc:
        soc.bind((host, port))
        while True:
            soc.listen()
            con, addr = soc.accept()
            
            data = con.recv(1024) #data is byte like array 
            content = data.decode("utf-8")
            print(content)
            messages, identifier = parse_messages(content)

            prob = check_conversation(messages) #one message for each listen
            #call to or's function with prob and identifier

        


    soc.close()
