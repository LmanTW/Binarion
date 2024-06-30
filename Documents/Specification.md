# Binarion Format Specification
* [Fragment](#fragment)
  * [Header](#header)
  * [Body](#body)
* [Data Types](#data-types)
  * [Null](#null)

# Fragment
A fragment stores a JavaScript object and is composed by two parts, a [header](#header) and a [body](#body).

## Header
The header contains the information about the data stored in the [body](#body).

`Type ID` | `Body Length Number Size` | `Body Length`

* `Type ID (4 Bit)` | The ID of the data type in the body.
* Body Length Integer Byte Length (4 Bit) | The size of the `Body Length` number in bytes.
* Body Length (`Body Length Number Size` Bytes) | The length of the body.

## Body
The body contains the actual data, the format of the body depends on the data type.

# Data Types
The data types that are supported by Binarion.

## Null
* ID: 0
* Body Length: 0
