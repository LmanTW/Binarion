import DataFormat from '../../Types/DataFormat'

// The Undefined Data Format
const DataFormat_Integer: DataFormat.Template<number, { bodyLength: number }> = {
  id: DataFormat.ID.Integer,

  getHeaderAttachemnt: (data) => (data < 0) ? 1 : 0,
  getBodyInfo: (data) => {
    return { bodyLength: Integer.getIntegerByteLength(data) }
  },

  writeBody: (Writer, data, bodyInfo) => Integer.writeInteger(Writer, (data < 0) ? -data : data, bodyInfo.bodyLength),
  readBody: (Reader, headerAttachment) => {
    const integer = Integer.readInteger(Reader)

    return (headerAttachment === 1) ? -integer : integer
  } 
}

export default DataFormat_Integer

import Integer from '../DataTypes/Integer'
