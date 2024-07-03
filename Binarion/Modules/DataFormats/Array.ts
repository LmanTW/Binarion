import DataFormat from '../../Types/DataFormat'

// The Array Data Format
const DataFormat_Array: DataFormat.Template<Array<any>, { bodyLength: number, integerByteLength: number }> = {
  id: DataFormat.ID.Array,

  getHeaderAttachemnt: () => 0,
  getBodyInfo: (data) => {
    let bodyLength = 0

    for (let element of data) bodyLength += Fragment.getFragmentByteLength(element)

    const integerByteLength = Integer.getIntegerByteLength(data.length)

    return { bodyLength: integerByteLength + bodyLength, integerByteLength }
  },

  writeBody: (Writer, data, bodyInfo) => {
    Integer.writeInteger(Writer, data.length, bodyInfo.integerByteLength)

    for (let element of data) Fragment.writeFragment(Writer, element)
  },
  readBody: (Reader) => {
    const arrayLength = Integer.readInteger(Reader)

    const array: any[] = []

    for (let i = 0; i < arrayLength; i++) array.push(Fragment.readFragment(Reader))

    return array
  } 
}

export default DataFormat_Array

import Integer from '../DataTypes/Integer'
import Fragment from '../Fragment'
