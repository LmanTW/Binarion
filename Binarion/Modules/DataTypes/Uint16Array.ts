import Data from '../Data'

// The Uint16Array Type
export const Uint16ArrayType: Data.Type<Uint16Array> = {
  id: Data.TypesID.Uint16Array,

  getBodyLength: (data) => data.length * 2,

  writeBody: (bytes, offset, data) => {
    for (let i = 0; i < data.length; i++) {
      Integer.writeInteger(bytes, offset, data[i], 2)

      offset += 2
    }
  },
  readBody: (bytes, offset, end) => {
    const array = new Uint16Array((end - offset) / 2)

    for (let i = 0; i < array.length; i++) {
      array[i] = Integer.readInteger(bytes, offset, 2)

      offset += 2
    }

    return array 
  }
}

export default Uint16ArrayTypeType

import Integer from '../Tools/Integer'
