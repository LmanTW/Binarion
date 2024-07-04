declare namespace Data {
    class Writer {
        private _index;
        private _bytes;
        constructor(bytes: Uint8Array);
        get index(): number;
        get bytes(): Uint8Array;
        writeByte(byte: number): void;
        writeBytes(bytes: Uint8Array): void;
    }
    class Reader {
        private _index;
        private _bytes;
        constructor(bytes: Uint8Array);
        get index(): number;
        get bytes(): Uint8Array;
        readByte(): number;
        readBytes(length: number): Uint8Array;
    }
    const Formats: DataFormat.Template<any, any>[];
    function getDataFormatID(data: any): DataFormat.ID;
    function getDataFormat(id: DataFormat.ID): DataFormat.Template<any, any>;
}

declare namespace DataFormat {
    interface Template<Type, BodyInfo extends {
        bodyLength: number;
    }> {
        id: DataFormat.ID;
        getHeaderAttachemnt: (data: Type) => number;
        getBodyInfo: (data: Type) => BodyInfo;
        writeBody: (Writer: Data.Writer, data: Type, bodyInfo: BodyInfo) => void;
        readBody: (Reader: Data.Reader, headerAttachment: number) => Type;
        inspectName: (headerAttachment: number) => string;
        inspectChildren: (Reader: Data.Reader, options: Inspect.Options, depth: number) => Inspect.Result[];
    }
    enum ID {
        None = 0,
        Boolean = 1,
        Integer = 2,
        Float = 3,
        String = 4,
        Array = 5,
        UintArray = 7,
        Object = 11,
        Map = 12,
        Set = 13,
        Function = 14
    }
}

declare namespace Inspect {
    interface Options {
        depth: number;
    }
    interface Options_Optional {
        depth?: number;
    }
    interface Result {
        dataFormatID: DataFormat.ID;
        headerAttachment: number;
        name: string;
        fragmentByteLength: number;
        index: number;
        children: Inspect.Result[];
    }
}

declare class export_default{
    private _options;
    private _inspectResult;
    constructor(bytes: Uint8Array, options?: Inspect.Options_Optional);
    get fragmentInfo(): Inspect.Result;
    format(): string;
    private _formatFragmentInfo;
}

declare namespace Binarion {
    function save(data: any): Uint8Array;
    function load(bytes: Uint8Array): any;
}

export { Binarion, export_default as Inspector };
