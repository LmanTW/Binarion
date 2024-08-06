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

    for (let i = 0; i < integerByteLengths.length; i++) {
      if (value < integerByteLengths[i]) return i
    }

    throw new Error(`Integer Out Of Range: ${integer}`)
  }

   // Get Integer Body
  public static getIntegerBody (Cache: CacheManager, integer: number, byteLength: number): Uint8Array {
    if (!Cache.hasGroup('integerBody')) Cache.createGroup('integerBody')

    let bytes = Cache.getCache<Uint8Array>('integerBody', integer)

    if (bytes === undefined) {
      bytes = new Uint8Array(byteLength)

      for (let i = 0; i < byteLength; i++) {
        let byte = (integer >> i * 7) & 0b01111111

        if (i === byteLength - 1) byte |= 0b10000000

        bytes[i] = byte
      }

      Cache.setCache('integerBody', integer, bytes)
    }

    return bytes
  }

  // Write An Integer
  public static writeInteger (Writer: Data.Writer, integer: number, byteLength: number): void {
    if (!Writer.Cache.hasGroup('integerBody')) Writer.Cache.createGroup('integerBody')

    let bytes = Writer.Cache.getCache<Uint8Array>('integerBody', integer)

    if (bytes === undefined) {
      bytes = this.getIntegerBody(Writer.Cache, integer, byteLength)

      Writer.Cache.setCache('integerBody', integer, bytes)
    }

    Writer.writeBytes(bytes)
  } 

  // Read An Integer
  public static readInteger (Reader: Data.Reader): number {
    let value: number = 0
    let offset: number = 0

    while (Reader.index < Reader.bytes.length) {
      const byte = Reader.readByte()

      if (byte >> 7 === 1) {
        value |= (byte & 0b01111111) << offset

        break
      } else value |= byte << offset

      offset += 7
    }

    return Number(value)
  }
}

const integerByteLengths: number[] = []

for (let i = 0; i < 4; i++) integerByteLengths.push(Integer.getMaxIntegerValue(i))

export default Integer

import CacheManager from '../CacheManager'
import Data from '../Data'
