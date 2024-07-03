import DataFormat from '../../Types/DataFormat'

// The Undefined Data Format
const DataFormat_Boolean: DataFormat.Template<boolean, { bodyLength: number }> = {
  id: DataFormat.ID.Boolean,

  getHeaderAttachemnt: (data) => (data) ? 1 : 0,
  getBodyInfo: () => {
    return { bodyLength: 0 }
  },

  writeBody: () => {},
  readBody: (_, headerAttachment) => headerAttachment === 1
}

export default DataFormat_Boolean
