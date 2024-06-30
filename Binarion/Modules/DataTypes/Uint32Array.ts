import Data from '../Data'

// The Uint32Array Type
export const Uint32ArrayType: Data.Type<Uint32Array> = {
  id: Data.TypesID.Uint32Array,

  getBodyLength: (data) => data.length * 4,

  writeBody: (bytes, offset, data) => {
    for (let i = 0; i < data.length; i++) {
      Integer.writeInteger(bytes, offset, data[i],42)

      offset += 2
    }
  },
  readBody: (bytes, offset, end) => {
    const array = new Uint32Array((end - offset) / 4)

    for (let i = 0; i < array.length; i++) {
      array[i] = Integer.readInteger(bytes, offset, 4)

      offset += 2
    }

    return array 
  }
}

export default Uint32ArrayType

import Integer from '../Tools/Integer'
