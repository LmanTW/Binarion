import Data from '../Data'

// The Integer Type
const IntegerType: Data.Type<number> = {
  id: Data.TypesID.Integer,

  getBodyLength: (data) => Integer.getIntegerByteLength((data < 0) ? -data : data, data < 0),

  writeBody: (bytes, offset, data, bodyLength) => Integer.writeInteger(bytes, offset, data, bodyLength),
  readBody: (bytes, offset, end) => Integer.readInteger(bytes, offset, end - offset)
}

export default IntegerType

import Integer from '../Tools/Integer'
