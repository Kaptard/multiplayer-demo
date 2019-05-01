# multiplayer-demo
Simple demo for a turn-based multiplayer API with a two-player queue.

<br>

### Installation
```
npm install
```
(also requires mongodb and redis on the default ports)

<br>

### Usage
Start the API server with
```sh
node .
```

Start two clients with
```sh
cd demo
node queue
```

then enter an action like `rush B` when the input asks you to.
You'll see that the other client will receive the data in real-time.
