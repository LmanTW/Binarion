// Nibble
export default class {
  // Write A Nibble
  public static writeNibble (Writer: Data.Writer, integer1: number, integer2: number): void {
    Writer.writeByte((integer1 << 4) | integer2)
  }

  // Read A Nibble
  public static readNibble (Reader: Data.Reader): [number, number] {
    const byte = Reader.readByte()

    return [(byte >> 4) & 0b00001111, byte & 0b00001111] 
  }
}

import Data from '../Data'
