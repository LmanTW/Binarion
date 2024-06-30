// String
export default class {
  // Get The Byte Length Of A String 
  public static getStringByteLength (value: string): number {
    // Get the size of a string, because some character may have larger char code there for they need large number to store them.

    let byteLength = 0

    let oldCharCodeByteLength = 0

    for (let i = 0; i < value.length; i++) {
      const charCodeByteLength = Integer.getIntegerByteLength(value.charCodeAt(i), false)

      if (charCodeByteLength !== oldCharCodeByteLength) {
        oldCharCodeByteLength = charCodeByteLength

        byteLength++
        // A Byte to set the char code byte length behind it.
      }

      byteLength += charCodeByteLength
      // Add the byte length of the char code.
    }

    return byteLength
  }

  // Write A String
  public static writeString (bytes: Uint8Array, offset: number, value: string): void {
    let currentCharCodeByteLength = 0

    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i)
      const charCodeByteLength = Integer.getIntegerByteLength(charCode, false)

      if (charCodeByteLength !== currentCharCodeByteLength) {
        currentCharCodeByteLength = charCodeByteLength

        Integer.writeInteger(bytes, offset, -charCodeByteLength, 1)
        // Use a negative number to set the char code byte length.

        offset++
      }

      Integer.writeInteger(bytes, offset, charCode, currentCharCodeByteLength)

      offset += currentCharCodeByteLength 
    }
  }

  // Read A String
  public static readString (bytes: Uint8Array, offset: number, end: number): string {
    let value = ''

    let currentCharCodeByteLength = 0

    while (offset < end) {
      const byte = Integer.readInteger(bytes, offset, 1)

      if (byte < 0) {
        // Set the char code byte length if the byte is negative.

        currentCharCodeByteLength = -byte

        offset++
      } else {
        value += String.fromCharCode(Integer.readInteger(bytes, offset, currentCharCodeByteLength))

        offset += currentCharCodeByteLength
      }
    } 

    return value
  }

  // String To Bytes
  public static stringToBytes (value: string, byteLength: number): Uint8Array {
    const bytes = new Uint8Array(byteLength)

    let oldCharCodeByteLength = 0

    let offset = 0

    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i)
      const charCodeByteLength = Integer.getIntegerByteLength(charCode, false)

      if (charCodeByteLength !== oldCharCodeByteLength) {
        oldCharCodeByteLength = charCodeByteLength

        Integer.writeInteger(bytes, offset, charCodeByteLength, 1)

        offset++
      }

      Integer.writeInteger(bytes, offset, charCode, oldCharCodeByteLength)

      offset += oldCharCodeByteLength
    }

    return bytes
  }
}

import Integer from './Integer'
