import DataFormat from '../../Types/DataFormat'

// The None Data Format
const DataFormat_None: DataFormat.Template<null | undefined, { bodyLength: number }> = {
  id: DataFormat.ID.None,

  getHeaderAttachemnt: (data) => {
    if (data === null) return 0
    
    return 1
  },
  getBodyInfo: () => {
    return { bodyLength: 0 }
  },

  writeBody: () => {},
  readBody: (_, headerAttachment) => {
    if (headerAttachment === 0) return null
    
    return undefined
  },

  inspectName: (headerAttachment) => {
    if (headerAttachment === 0) return 'None (Null)'

    return 'None (Undefined)'
  },
  inspectChildren: () => []
}

export default DataFormat_None
