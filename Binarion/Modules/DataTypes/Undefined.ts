import Data from '../Data'

// The Undefined Type
const UndefinedType: Data.Type<undefined> = {
  id: Data.TypesID.Undefined,

  getBodyLength: () => 0,

  writeBody: () => {},
  readBody: () => undefined
}

export default UndefinedType
