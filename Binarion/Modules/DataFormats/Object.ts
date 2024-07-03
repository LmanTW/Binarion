import DataFormat from '../../Types/DataFormat'

// The Object Data Format
const DataFormat_Object: DataFormat.Template<{ [key: string]: any }, { bodyLength: number }> = {
  id: DataFormat.ID.Object,

  getHeaderAttachemnt: () => 0,
  getBodyInfo: (data) => {
    let bodyLength = 0

    const keys = Object.keys(data)

    for (let key of keys) {
      bodyLength += String.getStringByteLength(key)
      bodyLength += Fragment.getFragmentByteLength(data[key])
    }

    return { bodyLength: Integer.getIntegerByteLength(keys.length) + bodyLength }
  },

  writeBody: (Writer, data) => {
    const keys = Object.keys(data)

    Integer.writeInteger(Writer, keys.length, Integer.getIntegerByteLength(keys.length))

    for (let key of keys) {
      String.writeString(Writer, key)
      Fragment.writeFragment(Writer, data[key])
    }
  },
  readBody: (Reader) => {
    const object: { [key: string]: any } = {}

    const objectSize = Integer.readInteger(Reader) 

    for (let i = 0; i < objectSize; i++) {
      object[String.readString(Reader)] = Fragment.readFragment(Reader)
    }

    return object
  } 
}

export default DataFormat_Object

import Integer from '../DataTypes/Integer'
import String from '../DataTypes/String'
import Fragment from '../Fragment'