import util from 'util'

// Data
namespace Data {
  // A Data Type
  export interface Type <T> {
    id: number,

    getBodyLength: (data: T) => number,
    
    writeBody: (bytes: Uint8Array, offset: number, data: T, bodyLength: number) => void,
    readBody: (bytes: Uint8Array, offset: number, end: number) => T
  }

  // ID Of All The Data Types Supported By Binarion 
  export enum TypesID {
    // The ID is a 4-bit number, so the range is 0 ~ 15.

    Null = 0,
    Undefined = 1,
    Boolean = 2,
    Integer = 3,
    Float = 4,
    String = 5,
 
    Array = 6,
    Uint8Array = 7,
    Uint16Array = 8,
    Uint32Array = 9,
    // Float64Array

    Object = 11,
    Map = 12,
    Set = 13,

    Function = 14
  }

  // All The Data Types Supported By Binarion
  export namespace Types {
    // The Null Type
    export const NullType: Data.Type<null> = {
      id: Data.TypesID.Null,

      getBodyLength: () => 0,

      writeBody: () => {},
      readBody: () => null
    }

    // The Undefined Type
    export const UndefinedType: Data.Type<undefined> = {
      id: Data.TypesID.Undefined,

      getBodyLength: () => 0,

      writeBody: () => {},
      readBody: () => undefined
    }

    // The Boolean Type
    export const BooleanType: Data.Type<boolean> = {
      id: Data.TypesID.Boolean,

      getBodyLength: () => 1,

      writeBody: (bytes, offset, data) => bytes[offset] = (data) ? 1 : 0,
      readBody: (bytes, offset) => bytes[offset] === 1
    }

    // The Integer Type
    export const IntegerType: Data.Type<number> = {
      id: Data.TypesID.Integer,

      getBodyLength: (data) => Integer.getIntegerByteLength((data < 0) ? -data : data, data < 0),

      writeBody: (bytes, offset, data, bodyLength) => Integer.writeInteger(bytes, offset, data, bodyLength),
      readBody: (bytes, offset, end) => Integer.readInteger(bytes, offset, end - offset)
    }

    // The String Type
    export const StringType: Data.Type<string> = {
      id: Data.TypesID.String,

      getBodyLength: (data) => String.getStringByteLength(data),

      writeBody: (bytes, offset, data) => String.writeString(bytes, offset, data),
      readBody: (bytes, offset, end) => String.readString(bytes, offset, end)
    }
    
    // The Array Type
    export const ArrayType: Data.Type<any[]> = {
      id: Data.TypesID.Array,

      getBodyLength: (data) => {
        let bodyLength = 0

        for (let i = 0; i < data.length; i++) bodyLength += Fragment.getFragmentLength(data[i])

        return bodyLength
      },

      writeBody: (bytes, offset, data) => data.forEach((item) => offset = Fragment.writeFragment(bytes, offset, item)),
      readBody: (bytes, offset, end) => {
        let array = new Array<any>()

        while (offset < end) {
          const result = Fragment.readFragment(bytes, offset)

          array.push(result.data)

          offset = result.offset
        }

        return array 
      }
    }

    // The Uint8Array Type
    export const Uint8ArrayType: Data.Type<Uint8Array> = {
      id: Data.TypesID.Uint8Array,

      getBodyLength: (data) => data.length,

      writeBody: (bytes, offset, data) => bytes.set(data, offset),
      readBody: (bytes, offset, end) => bytes.subarray(offset, end)
    }

    // The Uint16Array Type
    export const Uint16ArrayType: Data.Type<Uint16Array> = {
      id: Data.TypesID.Uint16Array,

      getBodyLength: (data) => data.length * 2,

      writeBody: (bytes, offset, data) => {
        for (let i = 0; i < data.length; i++) {
          Integer.writeInteger(bytes, offset, data[i], 2)

          offset += 2
        }
      },
      readBody: (bytes, offset, end) => {
        const array = new Uint16Array((end - offset) / 2)

        for (let i = 0; i < array.length; i++) {
          array[i] = Integer.readInteger(bytes, offset, 2)

          offset += 2
        }

        return array 
      }
    }

    // The Uint32Array Type
    export const Uint32ArrayType: Data.Type<Uint32Array> = {
      id: Data.TypesID.Uint32Array,

      getBodyLength: (data) => data.length * 4,

      writeBody: (bytes, offset, data) => {
        for (let i = 0; i < data.length; i++) {
          Integer.writeInteger(bytes, offset, data[i],42)

          offset += 2
        }
      },
      readBody: (bytes, offset, end) => {
        const array = new Uint32Array((end - offset) / 4)

        for (let i = 0; i < array.length; i++) {
          array[i] = Integer.readInteger(bytes, offset, 4)

          offset += 2
        }

        return array 
      }
    }

    // The Object Type
    export const ObjectType: Data.Type<Object> = {
      id: Data.TypesID.Object,

      getBodyLength: (data) => {
        let bodyLength = 0

        for (let key of Object.keys(data)) bodyLength += Fragment.getFragmentLength(key) + Fragment.getFragmentLength(data[key])

        return bodyLength
      },

      writeBody: (bytes, offset, data) => {
        for (let key of Object.keys(data)) {
          offset = Fragment.writeFragment(bytes, offset, key)
          offset = Fragment.writeFragment(bytes, offset, data[key])
        }
      },
      readBody: (bytes, offset, end) => {
        const object = {}

        while (offset < end) {
          const result = Fragment.readFragment(bytes, offset)

          offset = result.offset

          const result2 = Fragment.readFragment(bytes, offset)

          offset = result2.offset

          object[result.data] = result2.data
        }

        return object
      }
    }
  } 

  // Get Data Type ID
  export function getDataTypeID (data: any): Data.TypesID {
    if (data === null) return Data.TypesID.Null
    if (data === undefined) return Data.TypesID.Undefined
    if (typeof data === 'boolean') return Data.TypesID.Boolean
    if (typeof data === 'number') {
      if (!Number.isNaN(data)) {
        if (Number.isInteger(data)) return Data.TypesID.Integer
        else return Data.TypesID.Float
      } 
    }
    if (typeof data === 'string') return Data.TypesID.String
    if (Array.isArray(data)) return Data.TypesID.Array
    if (data instanceof Uint8Array) return Data.TypesID.Uint8Array
    if (data instanceof Uint16Array) return Data.TypesID.Uint16Array
    if (data instanceof Object) return Data.TypesID.Object

    throw new Error(`Unsupported Data Type: <${typeof data}> (\x1B[34m${util.inspect(data)}\x1B[0m)`)
  }

  // Get The Data Type
  export function getDataType (id: number): Data.Type<any> {
    for (let name in Data.Types) {
      if (Data.Types[name].id === id) return Data.Types[name]
    }

    throw new Error(`Data Type Not Found: ${id}`)
  }
}

export default Data

import Integer from './Tools/Integer'
import String from './Tools/String'

import Fragment from './Fragment'
