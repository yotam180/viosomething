import sys
import socket
from NLP.infer import *
import json
import incidents_service

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


# import main Flask class and request object
from flask import Flask, request
from flask_cors import CORS


# create the Flask app
app = Flask(__name__)
CORS(app)


@app.route('/query-example')
def query_example():
    return 'Query String Example'

@app.route('/form-example')
def form_example():
    return 'Form Data Example'

@app.route('/report')
def json_example():
    print(request.data)
    d = json.loads(request.body)
    messagees = d['last_messages']
    id = d['user']
    prob = check_conversation(messages)
    incidents_service.add_fishy_incident(id, prob)
    return 'JSON Object Example'

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=9000, host='0.0.0.0')


exit(0)


if __name__ == "__main__":
   
    host = "0.0.0.0"
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
