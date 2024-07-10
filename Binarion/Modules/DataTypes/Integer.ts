// Integer
class Integer {
  // Get Max integer
  public static getMaxIntegerValue (byteLength: number): number {
    if (byteLength === 0) return 0

    let max: number = 0

    for (let i = 0; i < byteLength * 7; i++) max += (max === 0) ? 2 : max
    // A byte is 7-bits. (The actual integer data)
    // 
    // 00000000       10000000
    // |              |
    // The end sign.  |
    // (0 = continue) The end sign. (1 = end)

    return max
  }

  // Get Integer Byte Length
  public static getIntegerByteLength (integer: number): number {
    const value = (integer < 0) ? -integer : integer

    for (let i = 0; i < 8; i++) {
      if (value < integerByteLengths[i]) return i
    }

    throw new Error(`Integer Out Of Range: ${integer}`)
  }

  // Write An Integer
  public static writeInteger (Writer: Data.Writer, integer: number, byteLength: number): void {
    for (let i = 0; i < byteLength; i++) {
      let byte = (BigInt(integer) >> BigInt(i * 7)) & 0b01111111n

      if (i === byteLength - 1) byte |= 0b10000000n

      Writer.writeByte(Number(byte)) 
    }
  }

  // Read An Integer
  public static readInteger (Reader: Data.Reader): number {
    let value: bigint = 0n
    let offset: number = 0

    while (Reader.index < Reader.bytes.length) {
      const byte = Reader.readByte() 

      if (byte >> 7 === 1) {
        value |= (BigInt(byte) & 0b01111111n) << BigInt(offset)

        break
      } else value |= BigInt(byte) << BigInt(offset)

      offset += 7
    }

    return Number(value)
  }
}

const integerByteLengths: number[] = []

for (let i = 0; i < 8; i++) integerByteLengths.push(Integer.getMaxIntegerValue(i))

export default Integer

import Data from '../Data'
