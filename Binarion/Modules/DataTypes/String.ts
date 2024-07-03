// String
export default class {
  // Get String Byte Length
  public static getStringByteLength (string: string): number {
    let byteLength: number = 0

    for (let i = 0; i < string.length; i++) byteLength += Integer.getIntegerByteLength(string.charCodeAt(i))

    return Integer.getIntegerByteLength(string.length) + byteLength
  }

  // Write A String
  public static writeString (Writer: Data.Writer, string: string): void {
    const stringLength = string.length
    
    Integer.writeInteger(Writer, stringLength, Integer.getIntegerByteLength(stringLength))

    for (let i = 0; i < string.length; i++) {
      const charCode = string.charCodeAt(i)

      Integer.writeInteger(Writer, charCode, Integer.getIntegerByteLength(charCode))
    }
  }

  // Read A String
  public static readString (Reader: Data.Reader): string {
    let string: string = ''

    const stringLength = Integer.readInteger(Reader)

    for (let i = 0; i < stringLength; i++) string += String.fromCharCode(Number(Integer.readInteger(Reader)))

    return string
  }
}

import Integer from './Integer'
import Data from '../Data'
