import Data from '../Data'

// The String Type
const StringType: Data.Type<string> = {
  id: Data.TypesID.String,

  getBodyLength: (data) => String.getStringByteLength(data),

  writeBody: (bytes, offset, data) => String.writeString(bytes, offset, data),
  readBody: (bytes, offset, end) => String.readString(bytes, offset, end)
}

export default StringType

import String from '../Tools/String'
