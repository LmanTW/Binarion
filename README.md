# Binarion
A binary format for storing JavaScript objects.

[Get Started]() | [API Documentation](./Documents/API.md)

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
