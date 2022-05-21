
from flask import Flask

app = Flask(__name__)

@app.route("/liveness")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/login")
def login(username: str, password: str):
    return "<p>Hello, World!</p>"
