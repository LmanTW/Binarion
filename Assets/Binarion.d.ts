declare namespace Binarion {
    function save(data: any): Uint8Array;
    function load(bytes: Uint8Array): any;
}

export { Binarion as default };
