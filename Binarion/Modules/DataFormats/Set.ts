import DataFormat from '../../Types/DataFormat'

// The Set Data Format
const DataFormat_Set: DataFormat.Template<Set<any>, { bodyLength: number }> = {
  id: DataFormat.ID.Set,

  getHeaderAttachemnt: () => 0,
  getBodyInfo: (data) => {
    let bodyLength = 0

    const iterator = data.keys()

    while (true) {
      const result = iterator.next()

      bodyLength += Fragment.getFragmentByteLength(result.value)

      if (result.done) break
    }

    return { bodyLength: Integer.getIntegerByteLength(data.size) + bodyLength } 
  },

  writeBody: (Writer, data) => {
    Integer.writeInteger(Writer, data.size, Integer.getIntegerByteLength(data.size))

    const iterator = data.keys()

    while (true) {
      const result = iterator.next()

      Fragment.writeFragment(Writer, result.value)

      if (result.done) break
    }
  },
  readBody: (Reader) => {
    const set = new Set()

    const setSize = Integer.readInteger(Reader)

    for (let i = 0; i < setSize; i++) set.add(Fragment.readFragment(Reader))

    return set
  },

  inspectName: () => 'Set',
  inspectChildren: (Reader, options, depth) => {
    const fragmentsInfo: Inspect.FragmentInfo[] = []

    const setSize = Integer.readInteger(Reader)

    for (let i = 0; i < setSize; i++) fragmentsInfo.push(Fragment.inspectFragment(Reader, options, depth + 1))

    return (depth < options.depth) ? fragmentsInfo : []
  }
}

export default DataFormat_Set

import Inspect from '../../Types/Inspect'

import Integer from '../DataTypes/Integer'
import Fragment from '../Fragment'
