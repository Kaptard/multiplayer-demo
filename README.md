# multiplayer-demo
Simple demo for a turn-based multiplayer API

<br>

### Installation
```
npm install
```
(also requires mongodb and redis on the default ports)

<br>

### Usage
Start two clients with
```sh
cd demo
node queue
```
then enter an action like `rush B` when the input asks you to.
You'll see that the other client will receive said data in real-time.
