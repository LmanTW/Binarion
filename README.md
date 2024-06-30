<img src="./Assets/Visual/Banner.svg"></img>

<p align="center">
  <a href="./Documents/GetStarted.md">Get Started</a> | 
  <a href="./Documents/API.md">Documentation</a> | 
  <a href="./Documents/FAQ.md">FAQ</a>
</p>

> [!WARNING]
> This project is still in it's early development stage, so we may introduce some breaking changes to the API and the data format.

## About Binarion
Binarion is designed for storing JavaScript objects that contain large amounts of data (Such as an ultra large `Uint8Array`). For most cases, using [JSON](https://en.wikipedia.org/wiki/JSON) will be faster and smaller, but for some use cases, Binarion can be a good choice. For example:

Using Binarion to store objects like the following one is going to be way faster compare to [JSON](https://en.wikipedia.org/wiki/JSON):
```ts
{
  width: 1000,
  height: 1000,

  pixels: new Uint8Array(4000000) // (width * height) * 4
}
```

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

## Supported Data Types
- [x] Null
- [x] Undefined
- [x] Boolean
- [x] Integer
- [ ] Float
- [x] String
 
- [x] Array
- [x] Uint8Array
- [x] Uint16Array
- [x] Uint32Array
- [ ] Float64Array

- [x] Object
- [ ] Map
- [ ] Set

- [ ] Function

