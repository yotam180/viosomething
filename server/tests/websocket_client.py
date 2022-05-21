import asyncio
import websockets

async def hello():
    async with websockets.connect("ws://localhost:8765") as websocket:
        print("sending hello world")
        await websocket.send("Hello world!")
        a = await websocket.recv()
        print("response: " + a)

asyncio.run(hello())