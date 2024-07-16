# Binarion API
The API documentation of Binarion.

> [!Note]
> You can also check out the [Binarion Format Specification](./Specification.md) of you want to implement Binarion in other languages.

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

## Contents
* [Binarion](#binarion)
  * [save()](#save)
  * [load()](#load)
* [Inspector](#inspector)
  * [Getters](#getters)
  * [format()](#format)

# Binarion
```ts
import { Binarion } from 'binarion' // For ECMAScript or TypeScript.

const { Binarion } = require('binarion') // For CommonJS.
```

## save()
```ts
.save(<data>) // Save a JavaScript object using the Binarion format.
```
* `data: any` | The object you want to save.

> [!NOTE]
> You can check out [Supported Data Formats](https://github.com/LmanTW/Binarion/blob/main/README.md#supported-data-formats) to see what [JavaScript](https://en.wikipedia.org/wiki/JavaScript) objects are supported.

> return `Uint8Array`

## load()
```ts
.load(<bytes>) // Load a JavaScript object using the Binarion format.
```

* `bytes: Uint8Array` | The data you want to use to load a JavaScript object.

> return `any`

# Inspector
```ts
import { Inspector } from 'binarion' // For ECMAScript or TypeScript.

const { Inspector } = require('binarion') // For CommonJS.

new Inspector(<bytes>, <options>)
```

* `bytes: Uint8Array` | The Binarion data you want to inspect.
* `options?: Inspect.Options` | The options for the inspector.
  * `depth?: number` | The depth of the inspection. `Default: Infinite`

## Getters
* `childInspectResult: Inspect.Result` | The root fragment inspect result.
  * `dataFormatID: string` | The data format ID of the fragment.
  * `headerAttachment: number` | The header attachment of the fragment.
  * `name: string` | The name of the fragment.
  * `fragmentByteLength: number` | The byte length of the fragment.
  * `index: number` | The index of the fragment.
  * `children: Inspect.Result[]` | The children of the fragment..

# format()
```ts
.format() // Format the inspect result.
```

> return `string`
