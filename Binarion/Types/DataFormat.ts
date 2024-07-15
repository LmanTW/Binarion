// Data Format
namespace DataFormat {
  // A Data Format
  export interface Template <Type, BodyInfo extends { bodyLength: number }> {
    id: DataFormat.ID,

    getHeaderAttachemnt: (data: Type) => number,
    // The attachment needs to stay within 4-bit.
    getBodyInfo: (Cache: CacheManager, data: Type) => BodyInfo,
    
    writeBody: (Writer: Data.Writer, data: Type, bodyInfo: BodyInfo) => void,
    readBody: (Reader: Data.Reader, headerAttachment: number) => Type,

    inspectName: (headerAttachment: number) => string,
    inspectChildren: (Reader: Data.Reader, headerAttachment: number, options: Inspect.Options, depth: number) => Inspect.Result[]
  }

  // IDs Of All Data Formats Supported By Binarion
  export enum ID {
    // The ID needs to stay within 4-bit.

    None = 0,
    Boolean = 1,
    Integer = 2,
    Float = 3,
    String = 4,
 
    Array = 5,
    // BoolArray
    UintArray = 7,
    // FloatArray = 8,

    Object = 11,
    Map = 12,
    Set = 13,

    Function = 14
  }
  
  // Supported Data Foramts
  export type Supported = null | undefined | boolean | number | string | Array<DataFormat.Supported> | Uint8Array | Uint16Array | Uint32Array | { [key: number | string | symbol]: DataFormat.Supported } | Map<number | string | symbol, DataFormat.Supported> | Set<DataFormat.Supported> | ((...args: any) => any)
}

export default DataFormat

import Inspect from '../Types/Inspect'

import CacheManager from '../Modules/CacheManager'
import Data from '../Modules/Data'
