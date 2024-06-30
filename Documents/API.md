# Binarion API
The API documentation of Binarion.

## Installation
```bash
npm install binarion
```

> [!TIP]
> You can also download Binarion straight into your project if you don't want to stronger your `node_modules` blackhole.
>
> * [Binarion.mjs](./Assets/Binarion.cjs) ([CommonJS](https://en.wikipedia.org/wiki/CommonJS))
> * [Binarion.cjs](./Assets/Binarion.cjs) ([ECMAScript](https://en.wikipedia.org/wiki/ECMAScript))
> * [Binarion.d.ts](./Assets/Binarion.d.ts) ([Type Definition](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html))

## Contents
* [Binarion](#binarion)
  * [save()](#save)
  * [load()](#load)

## Binarion
```ts
import Binarion from 'binarion'
```

## save()
```ts
.save(<data>) // Save a JavaScript object using the Binarion format.
```
* `data: any` | The object you want to save.

> return `Uint8Array`

## load()
```ts
.load(<bytes>) // Load a JavaScript object using the Binarion format.
```
* `bytes Uint8Array` | The data you want to use to load a JavaScript object.

> return `any`
