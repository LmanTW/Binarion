import DataFormat from '../../Types/DataFormat'

// The String Data Format
const DataFormat_String: DataFormat.Template<string, { bodyLength: number }> = {
  id: DataFormat.ID.String,

  getHeaderAttachemnt: () => 0,
  getBodyInfo: (Cache, data) => {
    return { bodyLength: String.getStringByteLength(Cache, data) }
  },

  writeBody: (Writer, data) => String.writeString(Writer, data),
  readBody: (Reader) => String.readString(Reader),

  inspectName: () => 'String',
  inspectChildren: (Reader) => {
    String.readString(Reader)

    return []
  }
}

export default DataFormat_String

import String from '../DataTypes/String'
