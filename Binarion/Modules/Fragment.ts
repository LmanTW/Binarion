// Fragment
export default class {
  // Get The Length Of The Fragment
  public static getFragmentByteLength (data: DataFormat.Supported): number {
    const dataFormatID = Data.getDataFormatID(data)

    const bodyInfo = Data.getDataFormat(dataFormatID).getBodyInfo(data)

    return 1 + bodyInfo.bodyLength
  }

  // Write A Fragment
  public static writeFragment (Writer: Data.Writer, data: DataFormat.Supported): void {
    const dataFormatID = Data.getDataFormatID(data)
    const dataFormat = Data.getDataFormat(dataFormatID)

    const bodyInfo = dataFormat.getBodyInfo(data)

    this.writeHeader(Writer, { dataFormatID, attachment: dataFormat.getHeaderAttachemnt(data) })

    dataFormat.writeBody(Writer, data, bodyInfo)
  }

  // Write A Header
  public static writeHeader (Writer: Data.Writer, header: { dataFormatID: number, attachment: number }): void {
    Nibble.writeNibble(Writer, header.dataFormatID, header.attachment)
  }

  // Read A Fragment
  public static readFragment (Reader: Data.Reader): DataFormat.Supported {
    const [dataFormatID, headerAttachment] = Nibble.readNibble(Reader)

    return Data.getDataFormat(dataFormatID).readBody(Reader, headerAttachment)
  }

  // Inspect A Fragment
  public static inspectFragment (Reader: Data.Reader, options: Inspect.Options, layer: number): Inspect.Result {
    const index = Reader.index

    const [dataFormatID, headerAttachment] = Nibble.readNibble(Reader)
    
    const dataFormat = Data.getDataFormat(dataFormatID)

    const children = Data.getDataFormat(dataFormatID).inspectChildren(Reader, headerAttachment, options, layer)

    return {
      dataFormatID,
      headerAttachment,

      name: dataFormat.inspectName(headerAttachment),

      fragmentByteLength: Reader.index - index,
      index,

      children
    }
  }
}

import DataFormat from '../Types/DataFormat'
import Inspect from '../Types/Inspect'

import Nibble from './DataTypes/Nibble'
import Data from './Data'
