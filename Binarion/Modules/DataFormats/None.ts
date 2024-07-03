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
    console.log(headerAttachment)

    if (headerAttachment === 0) return null
    
    return undefined
  } 
}

export default DataFormat_None
