<img src="./Assets/Visual/Banner.svg"></img>

<div style="display: flex">
  <a href="./Documents/GetStarted.md">Get Started</a> | 
  <a href="./Documents/API.md">Documentation</a> | 
  <a href="./Documents/FAQ.md">FAQ</a>
</div>

## Example
```ts
import Binarion from 'binarion'

let data = Binarion.save({ a: 123, b: '123', c: new Uint8Array(64) })

console.log(Binarion.load(data))
```

## Installation
```bash
npm install binarion
```
