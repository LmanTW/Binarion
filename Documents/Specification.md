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
  * [Object](#object)
  * [Map](#map)
  * [Set](#set)
  * [Function](#function)

# Fragment
A fragment represents a [JavaScript](https://en.wikipedia.org/wiki/JavaScript) object and is composed by two parts, a [header](#header) and a [body](#body).

## Header
A header contains the information about the body.

Format (Bytes): `Info (Nibble)`
* `Info (Nibble)` - `Data Format ID` | `Header Attachment`
  * `Data Format ID (4-bit)` | The ID of the data format.
  * `Header Attachment (4-bit)` | The attachment of the header.

> [!NOTE]
> Example: `01110010`
> * `0111` | The ID of the data format. (7)
> * `0010` | The attachment of the header. (2)

## Body
A body contains the actual data, the format depends on the data format.

## Data Types
A data type is the most basic form of data in Binarion.

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
* `String Length (Integer)` | The length of thr string. (How many characters there are in the string.)
* `...Char Codes (Integer)` | The unicode codes of the characters in the string.

> [!NOTE]
> Example: `10000011` | `11100001` | `11100010` | `11100011`
> * `10000011` | The length of the string. (3)
> * `11100001` | The first character. (97)
> * `11100010` | The second character. (98)
> * `11100011` | The third character. (99)
