import { Inspector } from '../../../Assets/Binarion'
import DataFormat from '../../Types/DataFormat'

// The UintArray Data Format
const DataFormat_UintArray: DataFormat.Template<Uint8Array | Uint16Array | Uint32Array, { bodyLength: number, integerByteLength: number, elementByteLength: number }> = {
  id: DataFormat.ID.UintArray,

  getHeaderAttachemnt: (data) => {
    if (data instanceof Uint16Array) return 2
    if (data instanceof Uint32Array) return 4

    return 1
  },
  getBodyInfo: (data) => {
    const integerByteLength = Integer.getIntegerByteLength(data.length)

    let elementByteLength = 1

    if (data instanceof Uint16Array) elementByteLength = 2
    if (data instanceof Uint32Array) elementByteLength = 4

    return { bodyLength: integerByteLength + (data.length * elementByteLength), integerByteLength, elementByteLength }
  },

  writeBody: (Writer, data, bodyInfo) => {
    Integer.writeInteger(Writer, data.length, bodyInfo.integerByteLength)

    if (data instanceof Uint8Array) Writer.writeBytes(data)
    else {
      for (let i = 0; i < data.length; i++) {
        for (let offset = (bodyInfo.elementByteLength - 1) * 8; offset >= 0; offset -= 8) Writer.writeByte((data[i] >> offset) & 0b11111111)
      }
    }
  },
  readBody: (Reader, headerAttachment) => {
    const arrayLength = Integer.readInteger(Reader)

    if (headerAttachment === 1) return Reader.readBytes(arrayLength)
    else {
      let array!: Uint16Array | Uint32Array

      if (headerAttachment <= 2) array = new Uint16Array(arrayLength)
      else if (headerAttachment <= 4) array = new Uint32Array(arrayLength)
      else throw new Error(`Element Byte Length Out Of Range: ${headerAttachment}`)

      for (let i = 0; i < arrayLength; i++) {
        for (let offset = (headerAttachment - 1) * 8; offset >= 0; offset -= 8) {
          array[i] |= (Reader.readByte() << offset)
        }
      }

      return array
    }
  },

  inspectName: (headerAttachment) => {
    if (headerAttachment === 1) return 'UintArray(8)'
    if (headerAttachment <= 2) return 'UintArray(16)' 

    return 'UintArray(32)'
  },
  inspectChildren: (Reader, headerAttachment) => {
    const arrayLength = Integer.readInteger(Reader)

    if (headerAttachment === 1) Reader.readBytes(arrayLength)
    else {
      let array!: Uint16Array | Uint32Array

      if (headerAttachment <= 2) array = new Uint16Array(arrayLength)
      else if (headerAttachment <= 4) array = new Uint32Array(arrayLength)
      else throw new Error(`Element Byte Length Out Of Range: ${headerAttachment}`)

      for (let i = 0; i < arrayLength; i++) {
        for (let offset = (headerAttachment - 1) * 8; offset >= 0; offset -= 8) Reader.readByte()
      }
    }

    return []
  }
}

export default DataFormat_UintArray

import Integer from '../DataTypes/Integer'
