import DataFormat from '../../Types/DataFormat'

// The String Data Format
const DataFormat_String: DataFormat.Template<string, { bodyLength: number }> = {
  id: DataFormat.ID.String,

  getHeaderAttachemnt: () => 0,
  getBodyInfo: (data) => {
    return { bodyLength: String.getStringByteLength(data) }
  },

  writeBody: (Writer, data) => String.writeString(Writer, data),
  readBody: (Reader) => String.readString(Reader),

  inspectName: () => 'String',
  inspectChildren: () => []
}

export default DataFormat_String

import String from '../DataTypes/String'
