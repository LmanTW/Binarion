<img src="./Assets/Visual/Banner.svg"></img>

<p align="center">
  <a href="./Documents/GetStarted.md">Get Started</a> | 
  <a href="./Documents/API.md">Documentation</a> | 
  <a href="./Documents/FAQ.md">FAQ</a>
</p>

> [!WARNING]
> This project is still in it's early development stage, so we may introduce some breaking changes to the API and the data format.

## About Binarion
Binarion is designed for storing JavaScript objects that contain large amounts of data (Such as an ultra large `Uint8Array`). For most use cases, using [JSON](https://en.wikipedia.org/wiki/JSON) will be faster and more compact, but for some niche use cases, Binarion can be a good choice. For example:

Using Binarion to store objects like the following one is going to be **way faster** compare to [JSON](https://en.wikipedia.org/wiki/JSON):
```ts
{
  width: 1000,
  height: 1000,

  pixels: new Uint8Array(4000000) // (width * height) * 4
}
```

## Supported Data Types
> - [x] Null
> - [x] Undefined
> - [x] Boolean
> - [x] Integer
> - [ ] Float
> - [x] String
 
> - [x] Array
> - [x] Uint8Array
> - [x] Uint16Array
> - [x] Uint32Array
> - [ ] Float64Array

> - [ ] Object
> - [ ] Map
> - [ ] Set

> - [ ] Function

