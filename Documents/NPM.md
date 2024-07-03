<img src="./Assets/Visuals/Banner.svg"></img>

<p align="center">
  <a href="https://github.com/LmanTW/Binarion/blob/main/Documents/GetStarted.md">Get Started</a> | 
  <a href="https://github.com/LmanTW/Binarion/blob/main/Documents/API.md">Documentation</a> | 
  <a href="https://github.com/LmanTW/Binarion/blob/main/Documents/Specification.md">Specification</a>
</p>

## Installation

```
npm install binarion
```

## Example

```ts
import Binarion from 'binarion'
import path from 'path'
import fs from 'fs'

const filePath = path.join(__dirname, 'Data')

const data = Binarion.save({
    a: true,
    b: 123,
    c: '123',
    d: [1, 2, 3, 4],
    e: Uint8Array.from([1, 2, 3, 4, 5])
})

fs.writeFileSync(filePath, data)
```
