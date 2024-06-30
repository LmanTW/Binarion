import Data from '../Data'

// The Array Type
export const ArrayType: Data.Type<any[]> = {
  id: Data.TypesID.Array,

  getBodyLength: (data) => {
    let bodyLength = 0

    for (let i = 0; i < data.length; i++) bodyLength += Fragment.getFragmentLength(data[i])

    return bodyLength
  },

  writeBody: (bytes, offset, data) => data.forEach((item) => offset = Fragment.writeFragment(bytes, offset, item)),
  readBody: (bytes, offset, end) => {
    let array = new Array<any>()

    while (offset < end) {
      const result = Fragment.readFragment(bytes, offset)

      array.push(result.data)

      offset = result.offset
    }

    return array 
  }
}

export default ArrayType

import Fragment from '../Fragment'
