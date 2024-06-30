// Integer
class Integer {
  // Get Max integer
  public static getMaxIntegerValue (byteLength: number): number {
    let max = 0

    for (let i = 0; i < (byteLength * 8) - 1; i++) max += (max == 0) ? 2 : max
    // A byte is 7-bites because we need to keep the hightest bit in every bytes as a sign.

    return max
  }

  // Get The Byte Length Of A Integer 
  public static getIntegerByteLength (integer: number, negative: boolean): number {
    if (integer <= MaxInteger_1Byte) return 1
    if (integer <= MaxInteger_2Byte) return 2
    if (integer <= MaxInteger_3Byte) return 3
    if (integer <= MaxInteger_4Byte) return 4
    if (integer <= MaxInteger_5Byte) return 5
    if (integer <= MaxInteger_6Byte) return 6
    if (integer <= MaxInteger_7Byte) return 7
    if (integer <= MaxInteger_8Byte) return 8

    throw new Error(`Integer Out Of Range: ${(negative) ? `-${integer}` : integer}`)
  }

  // Write An Integer
  public static writeInteger (bytes: Uint8Array, offset: number, integer: number, byteLength: number): void {
    let negative = false

    if (integer < 0) {
      integer = -integer

      negative = true
    }

    for (let i = 0; i < byteLength; i++) {
      bytes[offset] = (integer >> (i * 8)) & 0xFF

      offset++
    }

    if (negative) bytes[offset - 1] |= 0b10000000
    // If the integer is negative, set the highest bit in the last byte to 1.
  }

  // Read An Integer
  public static readInteger (bytes: Uint8Array, offset: number, byteLength: number): number {
    let integer = 0

    for (let i = 0; i < byteLength; i++) {
      if (i === byteLength - 1 && ((bytes[offset] & 0b10000000) >> 7) === 1) {
        // Check if the highest bit in the last byte is 1.

        bytes[offset] &= 0b01111111 
        // Set the highest bit in the last byte to 0.

        integer |= bytes[offset] << (i * 8) 

        integer = -integer
      } else integer |= bytes[offset] << (i * 8) 

      offset++
    } 

    return integer
  }

  // Integers To Byte
  public static integersToByte (integer1: number, integer2: number): number {
    // Combine two 4 bit numbers into one byte.

    return (integer1 << 4) | integer2
  }

  // Byte To Integers
  public static byteToIntegers (byte: number): [number, number] {
     // Seperate two 4 bit nubmers from one byte.

    return [(byte >> 4) & 0xF, byte & 0xF]
  }
}

export default Integer

const MaxInteger_1Byte = Integer.getMaxIntegerValue(1)
const MaxInteger_2Byte = Integer.getMaxIntegerValue(2)
const MaxInteger_3Byte = Integer.getMaxIntegerValue(3)
const MaxInteger_4Byte = Integer.getMaxIntegerValue(4)
const MaxInteger_5Byte = Integer.getMaxIntegerValue(5)
const MaxInteger_6Byte = Integer.getMaxIntegerValue(6)
const MaxInteger_7Byte = Integer.getMaxIntegerValue(7)
const MaxInteger_8Byte = Integer.getMaxIntegerValue(8)
