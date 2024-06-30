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
    Float64Array = 10,

    Object = 11,
    Map = 12,
    Set = 13,

    Function = 14
  }

  // All The Data Types Supported By Binarion
  export const Types: { [key: string]: Data.Type<any> } = {
    DataType_Null,
    DataType_Undefined,
    DataType_Boolean,
    DataType_Integer,
    DataType_String,

    DataType_Array,
    DataType_Uint8Array,
    DataType_Uint16Array,
    DataType_Uint32Array
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

import DataType_Uint16Array from './DataTypes/Uint16Array'
import DataType_Uint32Array from './DataTypes/Uint32Array'
import DataType_Uint8Array from './DataTypes/Uint8Array'
import DataType_Undefined from './DataTypes/Undefined'
import DataType_Boolean from './DataTypes/Boolean'
import DataType_Integer from './DataTypes/Integer'
import DataType_String from './DataTypes/String'
import DataType_Array from './DataTypes/Array'
import DataType_Null from './DataTypes/Null'
