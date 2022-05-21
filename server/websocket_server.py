import asyncio
from time import sleep
import websockets

from alert_manager import alert_queue

websocket_up = True
websocket_lifted = False

async def send_alerts(websocket):
    global websocket_up
    with open("logs.txt", "a") as f:
        f.write(f"\nalert manager state: up: {websocket_up}")
    while websocket_up:
        with open("logs.txt", "a") as f:
            f.write(f"\nalert_queue {alert_queue}")
        while len(alert_queue):
            message = alert_queue.pop()
            print(f"sending: {message}")
            await websocket.send(message)
        sleep(0.1)


def close_web_socket(): 
    global websocket_up
    websocket_up = False

def run_web_socket():
    global websocket_lifted
    if websocket_lifted:
        print("Web socket already running")
        return
    asyncio.run(start_web_socket())

async def start_web_socket():
    global websocket_lifted
    print("starting websocket")
    websocket_lifted = True
    async with websockets.serve(send_alerts, "0.0.0.0", 8765):
        await asyncio.Future()  # run forever

def listen_manual():
    while True:
        try:
            message = input()
            if message == 'exit':
                break
            alert_queue.append(message)
        except KeyboardInterrupt:
            break