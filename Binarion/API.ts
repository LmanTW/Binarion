// Binarion
export default {
  // Save A JavaScript Object
  save: (data: any): Uint8Array => {
    const bytes = new Uint8Array(Fragment.getFragmentLength(data))

    Fragment.writeFragment(bytes, 0, data)

    return bytes
  },

  // Load A JavaScript Object
  load: (bytes: Uint8Array): any => {
    return Fragment.readFragment(bytes, 0).data
  }
}

import Fragment from './Modules/Fragment'
