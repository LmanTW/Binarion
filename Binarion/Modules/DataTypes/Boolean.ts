import Data from '../Data'

// The Boolean Type
export const BooleanType: Data.Type<boolean> = {
  id: Data.TypesID.Boolean,

  getBodyLength: () => 1,

  writeBody: (bytes, offset, data) => bytes[offset] = (data) ? 1 : 0,
  readBody: (bytes, offset) => bytes[offset] === 1
}

export default BooleanType 
