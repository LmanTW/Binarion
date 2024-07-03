<img src="./Assets/Visuals/Banner.svg"></img>

<p align="center">
  <a href="https://github.com/LmanTW/Binarion/blob/main/Documents/GetStarted.md">Get Started</a> | 
  <a href="https://github.com/LmanTW/Binarion/blob/main/Documents/API.md">Documentation</a> | 
  <a href="https://github.com/LmanTW/Binarion/blob/main/Documents/Specification.md">Specification</a>
</p>

> [!WARNING]
> This project is still in it's early stages of development, so we may introduce some breaking changes to the API and the data format.

## About Binarion

> [!IMPORTANT]
> Binarion is not a competitor to [JSON](https://zh.wikipedia.org/wiki/JSON), it is not faster or more compact than [JSON](https://zh.wikipedia.org/wiki/JSON) most of the time.

Binarion is designed to store [JavaScript](https://en.wikipedia.org/wiki/JavaScript) objects that contain large TypedArray. For most use cases, using [JSON](https://zh.wikipedia.org/wiki/JSON) will be faster and more compact, but for some niche use cases, Binarion can be a good choice.

## Supported Data Formats
> [!NOTE]
> Haven't figured out how to implement `Float` and `FloatArray`, maybe someone can help me out.

| Name       | Corresponding JavaScript Object             | Implemented |
| ---        | ---                                         | ---         |
| None       | `null`, `undefined`                         | ✅          |
| Boolean    | `boolean`                                   | ✅          |
| Integer    | `number`                                    | ✅          |
| Float      | `float`                                     | ✅          |
| String     | `string`                                    | ✅          |
| Array      | `Array`                                     | ✅          |
| BoolArray  |                                             | ❌          |
| UintArray  | `Uint8Array`, `Uint16Array`, `Uint32Array`  | ✅          |
| FloatArray | `Float32Array`, `Float64Array`              | ❌          |
| Object     | `Object`                                    | ✅          |
| Map        | `Map`                                       | ✅          |
| Set        | `Set`                                       | ✅          |
| Function   | `Function`                                  | ❌          |
