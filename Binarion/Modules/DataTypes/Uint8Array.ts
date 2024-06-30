import Data from '../Data'

// The Uint8Array Type
export const Uint8ArrayType: Data.Type<Uint8Array> = {
  id: Data.TypesID.Uint8Array,

  getBodyLength: (data) => data.length,

  writeBody: (bytes, offset, data) => bytes.set(data, offset),
  readBody: (bytes, offset, end) => bytes.subarray(offset, end)
}

export default Uint8ArrayType
