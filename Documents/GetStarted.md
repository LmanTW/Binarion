# Get Started
Get started with Binarion.

## Contents
* [Install Binarion](#install-binarion)
* [Use Binarion](#use-binarion)
  * [Save JavaScript Objects](#save-javascript-objects)
  * [Load JavaScript Objects](#load-javascript-objects)
  * [Inspect Binarion Data](#inspect-binarion-data)

# Install Binarion
```
npm install binarion
```

> [!TIP]
> You can also download Binarion straight into your project if you don't want to stronger your `node_modules` blackhole.
>
> * [Binarion.mjs](./Assets/Binarion.cjs) ([CommonJS](https://en.wikipedia.org/wiki/CommonJS))
> * [Binarion.cjs](./Assets/Binarion.cjs) ([ECMAScript](https://en.wikipedia.org/wiki/ECMAScript))
> * [Binarion.d.ts](./Assets/Binarion.d.ts) ([Type Definition](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html))

# Use Binarion
> [!NOTE]
> The following examples uses [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript), but you can also use [CommonJS](https://en.wikipedia.org/wiki/CommonJS).

## Save JavaScript Objects 
```ts
import { Binarion } from 'binarion'
import path from 'path'
import fs from 'fs'

const data = Binarion.save({
  a: true,
  b: 123,
  c: '123',
  d: [1, 2, 3, 4],
  e: Uint8Array.from([1, 2, 3, 4, 5])
})

fs.writeFileSync(path.join(__dirname, 'Data'), data)
```

## Load JavaScript Objects
```ts
import { Binarion } from 'binarion'
import path from 'path'
import fs from 'fs'

const data = Binarion.load(fs.readFileSync(path.join(__dirname, 'Data')))

console.log(data)
```

## Inspect Binarion Data
```ts
import { Inspector } from 'binarion'
import path from 'path'
import fs from 'fs'

const inspector = new Inspector(fs.readFileSync(path.join(__dirname, 'Data')))

console.log(inspector.format())
```
