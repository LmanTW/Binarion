import DataFormat from '../../Types/DataFormat'

// The Map Data Format
const DataFormat_Map: DataFormat.Template<Map<any, any>, { bodyLength: number }> = {
  id: DataFormat.ID.Map,

  getHeaderAttachemnt: () => 0,
  getBodyInfo: (data) => {
    let bodyLength = 0

    const iterator = data.keys()

    while (true) {
      const result = iterator.next()

      if (result.value !== undefined) {
        bodyLength += String.getStringByteLength(result.value)
        bodyLength += Fragment.getFragmentByteLength(data.get(result.value))
      }

      if (result.done) break
    }

    return { bodyLength: Integer.getIntegerByteLength(data.size) + bodyLength }
  },

  writeBody: (Writer, data) => {
    Integer.writeInteger(Writer, data.size, Integer.getIntegerByteLength(data.size))

    const iterator = data.keys()

    while (true) {
      const result = iterator.next()

      if (result.value !== undefined) {
        String.writeString(Writer, result.value)
        Fragment.writeFragment(Writer, data.get(result.value))
      }

      if (result.done) break
    }
  },
  readBody(Reader) {
    const map = new Map()

    const mapSize = Integer.readInteger(Reader)

    for (let i = 0; i < mapSize; i++) map.set(String.readString(Reader), Fragment.readFragment(Reader))

    return map
  }
}

export default DataFormat_Map

import Integer from '../DataTypes/Integer'
import String from '../DataTypes/String'
import Fragment from '../Fragment'
