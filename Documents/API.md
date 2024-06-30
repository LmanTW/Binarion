# Binarion API
The API documentation of Binarion.

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
