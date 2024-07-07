<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/LmanTW/Binarion/main/Assets/Visuals/Banner_Dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/LmanTW/Binarion/main/Assets/Visuals/Banner_Light.svg">
  <img alt="The banner" src="https://raw.githubusercontent.com/LmanTW/Binarion/main/Assets/Visuals/Banner_Dark.svg">
</picture>

<p align="center">
  <a href="https://github.com/LmanTW/Binarion/blob/main/Documents/GetStarted.md">Get Started</a> | 
  <a href="https://github.com/LmanTW/Binarion/blob/main/Documents/API.md">Documentation</a> | 
  <a href="https://github.com/LmanTW/Binarion/blob/main/Documents/Specification.md">Specification</a>
</p>

> [!WARNING]
> This project is still in it's early stages of development, so we may introduce some breaking changes to the API and the data format.

# Binarion
[![Npm version](https://img.shields.io/npm/v/binarion)](https://www.npmjs.com/package/binarion) [![Npm downloads](https://img.shields.io/npm/dm/binarion)](https://www.npmjs.com/package/binarion) [![CodeFactor grade](https://img.shields.io/codefactor/grade/github/LmanTW/Binarion)](https://www.codefactor.io/repository/github/lmantw/binarion/)

> [!IMPORTANT]
> Binarion is not a competitor to [JSON](https://zh.wikipedia.org/wiki/JSON), it is not faster or more compact than [JSON](https://zh.wikipedia.org/wiki/JSON) most of the time.

Binarion is designed to store [JavaScript](https://en.wikipedia.org/wiki/JavaScript) objects that contain large TypedArray. For most use cases, using [JSON](https://zh.wikipedia.org/wiki/JSON) will be faster and more compact, but for some niche use cases, Binarion can be a good choice.

* Store image pixel data with other information, like width and height.
* Store world data for 2D sandbox game. (width, height, chunks, blocks, etc...)
* ~~Store the state of [one million checkboxes](https://onemillioncheckboxes.com).~~

## Supported Data Formats
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

