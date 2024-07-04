// Data Format
namespace DataFormat {
  // A Data Format
  export interface Template <Type, BodyInfo extends { bodyLength: number }> {
    id: DataFormat.ID,

    getHeaderAttachemnt: (data: Type) => number,
    // The attachment needs to stay within 4-bit.
    getBodyInfo: (data: Type) => BodyInfo,
    
    writeBody: (Writer: Data.Writer, data: Type, bodyInfo: BodyInfo) => void,
    readBody: (Reader: Data.Reader, headerAttachment: number) => Type,

    inspectName: (headerAttachment: number) => string,
    inspectChildren: (Reader: Data.Reader, options: Inspect.Options, depth: number) => Inspect.Result[]
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
}

export default DataFormat

import Inspect from '../Types/Inspect'

import Data from '../Modules/Data'
