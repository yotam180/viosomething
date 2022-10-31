from asyncio import subprocess
import threading
from flask import Flask, request
from flask_cors import CORS
import socket
from NLP.infer import *
import json
import incidents_service
from websocket_server import run_web_socket, close_web_socket, listen_manual


# create the Flask app
app = Flask(__name__)
CORS(app)

def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

@app.route('/query', methods=['GET'])
def query_example():
    #load alerts and return 
    return 'Query String Example'

@app.route('/form-example')
def form_example():
    return 'Form Data Example'

@app.route('/report', methods=['POST'])
def json_example():
    print(request.data)
    d = json.loads(request.data.decode('utf-8'))
    messages = d['last_messages']
    id = d['user']
    prob = check_conversation(messages)
    print("prob", prob)
    if prob >= 0.35:
        incidents_service.add_fishy_incident(id, prob)
    return ''


if __name__ == '__main__':
    # run app in debug mode on port 5000
    try:
        web_socket_thread = threading.Thread(target=run_web_socket).start()
        app.run(debug=False, port=9000, host='0.0.0.0')

        print(f"listening on {socket.gethostname()}:9000")
    except KeyboardInterrupt as e:
        print("closing servers")
        close_web_socket()
        web_socket_thread.join()
        shutdown_server()

print(__name__)

