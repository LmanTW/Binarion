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
        inspectChildren: (Reader: Data.Reader) => Inspect.FragmentInfo[];
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
    interface FragmentInfo {
        dataFormatID: DataFormat.ID;
        headerAttachment: number;
        name: string;
        fragmentLength: number;
        index: number;
        children: Inspect.FragmentInfo[];
    }
    class Result {
        private _fragmentInfo;
        constructor(fragmentInfo: Inspect.FragmentInfo);
        get fragmentInfo(): FragmentInfo;
        format(): string;
    }
    function formatFragment(fragmentInfo: Inspect.FragmentInfo, layer: number): string;
}

declare namespace Binarion {
    function save(data: any): Uint8Array;
    function load(bytes: Uint8Array): any;
    function inspect(bytes: Uint8Array): Inspect.Result;
}

export { Binarion as default };
