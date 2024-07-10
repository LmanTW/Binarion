# Binarion Format Specification
The Binarion format specification.

## Contents
* [Fragment](#fragment)
  * [Header](#header)
  * [Body](#body)
* [DataTypes](#datatypes)
  * [Nibble](#nibble)
  * [Integer](#integer)
  * [String](#string)
* [DataFormats](#dataformats)
  * [None](#none)
  * [Boolean](#boolean)
  * [Integer](#integer-1)
  * [Float](#float)
  * [String](#string-1)
  * [Array](#array)
  * [BoolArray](#boolarray)
  * [UintArray](#uintarray)
  * [FloatArray](#floatarray)
  * [Object](#object)
  * [Map](#map)
  * [Set](#set)
  * [Function](#function)

# Fragment
A fragment represents a [JavaScript](https://en.wikipedia.org/wiki/JavaScript) object and is composed by two parts, a [header](#header) and a [body](#body).

## Header
A header contains the information about the body.

Format (Bytes): `Info (Nibble)`
* `Info (Nibble)` (`Data Format ID` | `Header Attachment`)
  * `Data Format ID (4-bit)` | The ID of the data format.
  * `Header Attachment (4-bit)` | The attachment of the header.

> [!NOTE]
> Example: `01110010`
> * `0111` | The ID of the data format. (7)
> * `0010` | The attachment of the header. (2)

## Body
A body contains the actual data, the format depends on the [data format](#dataformats).

## Data Types
A data type is the most basic form of data in Binarion.

* [Nibble](#nibble)
* [Integer](#integer)
* [String](#string)

## Nibble
A nibble is one byte and contains two 4-bit integer.

Format (Bits): `Integer 1` | `Integer 2`
* `Integer 1 (4-bit)` | The first integer.
* `Integer 2 (4-bit)` | The second integer.

## Integer
An integer can be any length from 1 to 8 bytes, the integer ends when the end sign is set to 1.

Format (Bits): `End Sign (1-bit)` | `Integer Data (7-bit)`

> [!NOTE]
> Example: `00111001` | `11100000`
> * `00111001` | The first byte of the integer.
> * `11100000` | The second byte of the integer, the integer ends because the highest bit is set to 1.
>
> The full integer will be `1100000 0111001`. (With out the end sign)

## String
A string contains a series of interers that represent unicode codes.

Format (Bytes): `String Length` | `...Chat Codes`
* `String Length (Integer)` | The length of the string. (How many characters there are in the string.)
* `...Char Codes (Integer)` | The unicode codes of the characters in the string.

> [!NOTE]
> Example: `10000011` | `11100001` | `11100010` | `11100011`
> * `10000011` | The length of the string. (3)
> * `11100001` | The first character. (97)
> * `11100010` | The second character. (98)
> * `11100011` | The third character. (99)

# DataFormats
A data format is a more complicated form of data in Binarion.

* [None](#none)
* [Boolean](#boolean)
* [Integer](#integer-1)
* [Float](#float)
* [String](#string-1)
* [Array](#array)
* [BoolArray](#boolarray)
* [UintArray](#uintarray)
* [FloatArray](#floatarray)
* [Object](#object)
* [Map](#map)
* [Set](#set)
* [Function](#function)

## None
The None data format has no body, the value is contained within the [fragment header](#header).

| Header Attachment | Value     |
| ---               | ---       |
| 0                 | null      |
| 1                 | undefined |

## Boolean
The Boolean data format has no body, the value is contained within the [fragment header](#header).

| Header Attachment | Value |
| ---               | ---   |
| 0                 | false |
| 1                 | true  |

## Integer
The Integer data format is just an [Integer](#integer).

## Float

> [!NOTE]
> Haven't figured out how to implement `Float` and `FloatArray`, maybe someone can help me out.

## String
The String data format is just a [String](#string).

## Array
The Array data format contains a length and elements.

Format (Bytes): `Array Length` | `...Elements`
* `Array Length (Integer)` | The length of the array. (How many elements there are in the array.)
* `...Elements (Fragment)` | The elements in the array.

## BoolArray
The BoolArray data format contains a length and chunks.

Format (Bytes): `Array Length` | `...Chunks`
* `Array Length (Integer)` | The length of the array. (How many elements there are in the array.)
* `...Chunks (Byte)` | A chunk can contain up to 8 boolean value, the amound of chunks depends on the array length.

## UintArray
The BoolArray data format contains a length and chunks, and store the uint size in the [fragment header](#header).

Format (Bytes): `Array Length` | `...Chunks`
* `Array Length (Integer)` | The length of the array. (How many elements there are in the array.)
* `...Chunks (Byte)` | A single uint can take multiple byte to store, the uint size is stored in the [fragment header](#header).

The size of the uint can range from 1 to 8 bytes.

> [!NOTE]
> Example:
> - Header: `01110010`
> `01110010` The header of the fragment. (Data Format ID: 7, Uint Byte Length: 2)
> - Body: `10000011` | `10000110` | `10100000` | `00001101` | `01000000` | `10010011` | `11100000`
> `10000011` | The length of the array. (3)
> `10000110` | The first half of the first element.
> `10100000` | The second half of the first element.
> `00001101` | The first half of the second element.
> `01000000` | The second half of the second element.
> `10010011` | The first half of the third element.
> `11100000` | The third half of the third element.

## FloatArray

> [!NOTE]
> Haven't figured out how to implement `Float` and `FloatArray`, maybe someone can help me out.

## Object
The Object data format contains a size and chunks.

Format (Bytes): `Object Size` | '...Chunks'
* `Object Size (Integer)` | The size of the object.
* `...Chunks` | The elements in the object.
  * `Name (String)` | `Data (Fragment)`

## Map
The Map data format contains a size and chunks.

Format (Bytes): `Map Size` | '...Chunks'
* `Map Size (Integer)` | The size of the map.
* `...Chunks` | The elements in the map.
  * `Name (String)` | `Data (Fragment)`

## Set
The Set data foramt contains a size and elements.

Format (Bytes): `Set Size` | `...Elements`
* `Set Size (Integer)` | The size of the set.
* `...Elements (Fragment)` | The elements of the set.
