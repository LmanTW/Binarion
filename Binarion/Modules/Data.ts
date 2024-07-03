import util from 'util'

// Data
namespace Data {
  // Writer
  export class Writer {
    private _index: number = 0
    private _bytes!: Uint8Array

    constructor (bytes: Uint8Array) {
      this._bytes = bytes

      this._bytes.set
    }

    public get index () {return this._index}
    public get bytes () {return this._bytes}

    // Write A Byte
    public writeByte (byte: number): void {
      this._bytes[this._index] = byte

      this._index++
    }

    // Write Bytes
    public writeBytes (bytes: Uint8Array): void {
      this._bytes.set(bytes, this._index)

      this._index += bytes.length
    }
  }

  // Reader
  export class Reader {
    private _index: number = 0
    private _bytes!: Uint8Array

    constructor (bytes: Uint8Array) {
      this._bytes = bytes

      this._bytes.set
    }

    public get index () {return this._index}
    public get bytes () {return this._bytes}

    // Read A Byte
    public readByte (): number {
      const byte = this._bytes[this._index]

      this._index++

      return byte
    }

    // Read Bytes
    public readBytes (length: number): Uint8Array {
      const bytes = this._bytes.subarray(this._index, this._index + length)

      this._index += length

      return bytes
    }
  }

  // All Data Formats Supported By Binarion
  export const Formats: DataFormat.Template<any, any>[] = [
    DataFormat_UintArray,
    DataFormat_Boolean,
    DataFormat_Integer,
    DataFormat_String,
    DataFormat_Object,
    DataFormat_Array,
    DataFormat_None,
    DataFormat_Set,
    DataFormat_Map
  ]

  // Get The Data Format ID
  export function getDataFormatID (data: any): DataFormat.ID {
    if (data === null || data === undefined) return DataFormat.ID.None
    if (typeof data === 'boolean') return DataFormat.ID.Boolean
    if (typeof data === 'number') {
      if (!Number.isNaN(data)) {
        if (Number.isInteger(data)) return DataFormat.ID.Integer
        else return DataFormat.ID.Float
      } 
    }
    if (typeof data === 'string') return DataFormat.ID.String
    if (Array.isArray(data)) return DataFormat.ID.Array
    if (data instanceof Uint8Array || data instanceof Uint16Array || data instanceof Uint32Array || data instanceof BigUint64Array) return DataFormat.ID.UintArray
    if (data instanceof Set) return DataFormat.ID.Set
    if (data instanceof Map) return DataFormat.ID.Map
    if (data instanceof Object) return DataFormat.ID.Object

    throw new Error(`Unsupported Data Format: <${typeof data}> (\x1B[34m${util.inspect(data)}\x1B[0m)`)
  }

  // Get The Data Format
  export function getDataFormat (id: DataFormat.ID): DataFormat.Template<any, any> {
    for (let format of Data.Formats) {
      if (format.id === id) return format
    }

    throw new Error(`Data Format Not Found: "${id}"`)
  }
}

export default Data

import DataFormat from '../Types/DataFormat'

import DataFormat_UintArray from './DataFormats/UintArray'
import DataFormat_Boolean from './DataFormats/Boolean'
import DataFormat_Integer from './DataFormats/Integer'
import DataFormat_String from './DataFormats/String'
import DataFormat_Object from './DataFormats/Object'
import DataFormat_Array from './DataFormats/Array'
import DataFormat_None from './DataFormats/None'
import DataFormat_Set from './DataFormats/Set'
import DataFormat_Map from './DataFormats/Map'
