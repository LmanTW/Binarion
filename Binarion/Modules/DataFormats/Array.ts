import DataFormat from '../../Types/DataFormat'

// The Array Data Format
const DataFormat_Array: DataFormat.Template<Array<DataFormat.Supported>, { bodyLength: number, integerByteLength: number }> = {
  id: DataFormat.ID.Array,

  getHeaderAttachemnt: () => 0,
  getBodyInfo: (data) => {
    let bodyLength = 0

    for (const element of data) bodyLength += Fragment.getFragmentByteLength(element)

    const integerByteLength = Integer.getIntegerByteLength(data.length)

    return { bodyLength: integerByteLength + bodyLength, integerByteLength }
  },

  writeBody: (Writer, data, bodyInfo) => {
    Integer.writeInteger(Writer, data.length, bodyInfo.integerByteLength)

    for (const element of data) Fragment.writeFragment(Writer, element)
  },
  readBody: (Reader) => {
    const array: DataFormat.Supported[] = []

    const arrayLength = Integer.readInteger(Reader)

    for (let i = 0; i < arrayLength; i++) array.push(Fragment.readFragment(Reader))

    return array
  },

  inspectName: () => 'Array',
  inspectChildren: (Reader, _, options, depth) => {
    const fragmentsInfo: Inspect.Result[] = []

    const arrayLength = Integer.readInteger(Reader)

    for (let i = 0; i < arrayLength; i++) fragmentsInfo.push(Fragment.inspectFragment(Reader, options, depth + 1))

    return (depth < options.depth) ? fragmentsInfo : []
  }
}

export default DataFormat_Array

import Inspect from '../../Types/Inspect'

import Integer from '../DataTypes/Integer'
import Fragment from '../Fragment'
