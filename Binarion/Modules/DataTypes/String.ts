// String
export default class {
  // Get String Byte Length
  public static getStringByteLength (Cache: Cache, string: string): number {
    if (!Cache.hasGroup('stringByteLength')) Cache.createGroup('stringByteLength')

    let byteLength = Cache.getCache<number>('stringByteLength', string)

    if (byteLength === undefined) {
      byteLength = 0

      for (let i = 0; i < string.length; i++) byteLength += Integer.getIntegerByteLength(string.charCodeAt(i))

      Cache.setCache('stringByteLength', string, byteLength)
    }

    return Integer.getIntegerByteLength(string.length) + byteLength
  }

  // Write A String
  public static writeString (Writer: Data.Writer, string: string): void {
    if (!Writer.Cache.hasGroup('stringBody')) Writer.Cache.createGroup('stringBody')

    let bytes = Writer.Cache.getCache<Uint8Array>('stringBody', string)

    if (bytes === undefined) {
      bytes = new Uint8Array(this.getStringByteLength(Writer.Cache, string))

      const stringLengthIntegerByteLength = Integer.getIntegerByteLength(string.length)

      bytes.set(Integer.getIntegerBody(Writer.Cache, string.length, stringLengthIntegerByteLength), 0)

      let offset = stringLengthIntegerByteLength

      for (let i = 0; i < string.length; i++) {
        const charCode = string.charCodeAt(i)

        const integerBody = Integer.getIntegerBody(Writer.Cache, charCode, Integer.getIntegerByteLength(charCode))

        bytes.set(integerBody, offset)

        offset += integerBody.length
      }
    }

    Writer.writeBytes(bytes)
  }

  // Read A String
  public static readString (Reader: Data.Reader): string {
    let string: string = ''

    const stringLength = Integer.readInteger(Reader)

    for (let i = 0; i < stringLength; i++) string += String.fromCharCode(Number(Integer.readInteger(Reader)))

    return string
  }
}

import Cache from '../CacheManager'
import Integer from './Integer'
import Data from '../Data'
