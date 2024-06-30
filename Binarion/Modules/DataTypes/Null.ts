import Data from '../Data'

// The Null Type
const NullType: Data.Type<null> = {
  id: Data.TypesID.Null,

  getBodyLength: () => 0,

  writeBody: () => {},
  readBody: () => null
}

export default NullType
