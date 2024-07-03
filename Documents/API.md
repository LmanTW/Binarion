# Binarion API
The API documentation of Binarion.

> [!Note]
> You can also check out the [Format Specification](./Specification.md] of you want to implement Binarion in other languages.

## Installation

```
npm install binarion
```

> [!TIP]
> You can also download Binarion straight into your project if you don't want to stronger your `node_modules` blackhole.
>
> * [Binarion.mjs](./Assets/Binarion.cjs) ([CommonJS](https://en.wikipedia.org/wiki/CommonJS))
> * [Binarion.cjs](./Assets/Binarion.cjs) ([ECMAScript](https://en.wikipedia.org/wiki/ECMAScript))
> * [Binarion.d.ts](./Assets/Binarion.d.ts) ([Type Definition](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html))

## Content

* [Binarion](#binarion)
  * [save()](#save)
  * [load()](#load)

# Binarion

```ts
import Binarion from 'binarion' // For ECMAScript or TypeScript.

const Binarion = require('binarion') // For CommonJS.
```

## save()

```ts
.save(<data>) // Save a JavaScript object using the Binarion format.
```
* `data: any` | The object you want to save.

> [!NOTE]
> Check out [Implemented Data Formats](../README.md#implemented-data-formats) to see what [JavaScript](https://en.wikipedia.org/wiki/JavaScript) objects are supported.

> return `Uint8Array`

## load()

```ts
.load(<bytes>) // Load a JavaScript object using the Binarion format.
```
* `bytes Uint8Array` | The data you want to use to load a JavaScript object.

> return `any`
