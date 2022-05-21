import asyncio
import websockets

websocket_lifted = False

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
    async with websockets.serve(test, "0.0.0.0", 8765):
        await asyncio.Future()  # run forever


def test(websocket):
    print("here")

run_web_socket()