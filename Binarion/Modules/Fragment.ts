// Fragment
export default class {
  // Get The Length Of A Fragment
  public static getFragmentLength (data: any): number {
    const dataTypeID = Data.getDataTypeID(data)

    const bodyLength = Data.getDataType(dataTypeID).getBodyLength(data)

    return this.getHeaderLength(bodyLength) + bodyLength
  }

  // Get The Length Of A Header
  public static getHeaderLength (bodyLength: number) {
    return 1 + Integer.getIntegerByteLength(bodyLength, false)
  }

  // Write A Fragment
  public static writeFragment (bytes: Uint8Array, offset: number, data: any): number {
    const dataTypeID = Data.getDataTypeID(data)
    const dataType = Data.getDataType(dataTypeID)

    const bodyLength = dataType.getBodyLength(data)

    offset = this.writeHeader(bytes, offset, { dataTypeID, bodyLength })

    dataType.writeBody(
      bytes,
      offset,

      data,
      bodyLength 
    )

    return offset + bodyLength
  } 

  // Write A Header
  public static writeHeader (bytes: Uint8Array, offset: number, header: { dataTypeID: number, bodyLength: number }): number {
    const byteLength = Integer.getIntegerByteLength(header.bodyLength, false)

    bytes[offset] = Integer.integersToByte(header.dataTypeID, byteLength)
    Integer.writeInteger(bytes, offset + 1, header.bodyLength, byteLength)

    return offset + (1 + byteLength)
  }

  // Read A Fragment
  public static readFragment (bytes: Uint8Array, offset: number): { offset: number, data: any } {
    const [dataTypeID, bodyLengthIntegerByteLength] = Integer.byteToIntegers(bytes[offset]) 

    const bodyLength = Integer.readInteger(bytes, offset + 1, bodyLengthIntegerByteLength)
    
    offset += 1 + bodyLengthIntegerByteLength

    return { offset: offset + bodyLength, data: Data.getDataType(dataTypeID).readBody(bytes, offset, offset + bodyLength) }
  }
}

import Integer from './Tools/Integer'

import Data from './Data'
