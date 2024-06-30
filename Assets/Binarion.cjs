"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// Binarion/API.ts
var API_exports = {};
__export(API_exports, {
  default: () => API_default
});
module.exports = __toCommonJS(API_exports);

// Binarion/Modules/Tools/Integer.ts
var Integer = class {
  // Get Max integer
  static getMaxIntegerValue(byteLength) {
    let max = 0;
    for (let i = 0; i < byteLength * 8 - 1; i++) max += max == 0 ? 2 : max;
    return max;
  }
  // Get The Byte Length Of A Integer 
  static getIntegerByteLength(integer, negative) {
    if (integer <= MaxInteger_1Byte) return 1;
    if (integer <= MaxInteger_2Byte) return 2;
    if (integer <= MaxInteger_3Byte) return 3;
    if (integer <= MaxInteger_4Byte) return 4;
    if (integer <= MaxInteger_5Byte) return 5;
    if (integer <= MaxInteger_6Byte) return 6;
    if (integer <= MaxInteger_7Byte) return 7;
    if (integer <= MaxInteger_8Byte) return 8;
    throw new Error(`Integer Out Of Range: ${negative ? `-${integer}` : integer}`);
  }
  // Write An Integer
  static writeInteger(bytes, offset, integer, byteLength) {
    let negative = false;
    if (integer < 0) {
      integer = -integer;
      negative = true;
    }
    for (let i = 0; i < byteLength; i++) {
      bytes[offset] = integer >> i * 8 & 255;
      offset++;
    }
    if (negative) bytes[offset - 1] |= 128;
  }
  // Read An Integer
  static readInteger(bytes, offset, byteLength) {
    let integer = 0;
    for (let i = 0; i < byteLength; i++) {
      if (i === byteLength - 1 && (bytes[offset] & 128) >> 7 === 1) {
        bytes[offset] &= 127;
        integer |= bytes[offset] << i * 8;
        integer = -integer;
      } else integer |= bytes[offset] << i * 8;
      offset++;
    }
    return integer;
  }
  // Integers To Byte
  static integersToByte(integer1, integer2) {
    return integer1 << 4 | integer2;
  }
  // Byte To Integers
  static byteToIntegers(byte) {
    return [byte >> 4 & 15, byte & 15];
  }
};
var Integer_default = Integer;
var MaxInteger_1Byte = Integer.getMaxIntegerValue(1);
var MaxInteger_2Byte = Integer.getMaxIntegerValue(2);
var MaxInteger_3Byte = Integer.getMaxIntegerValue(3);
var MaxInteger_4Byte = Integer.getMaxIntegerValue(4);
var MaxInteger_5Byte = Integer.getMaxIntegerValue(5);
var MaxInteger_6Byte = Integer.getMaxIntegerValue(6);
var MaxInteger_7Byte = Integer.getMaxIntegerValue(7);
var MaxInteger_8Byte = Integer.getMaxIntegerValue(8);

// Binarion/Modules/Data.ts
var import_util = __toESM(require("util"));

// Binarion/Modules/Tools/String.ts
var String_default = class {
  // Get The Byte Length Of A String 
  static getStringByteLength(value) {
    let byteLength = 0;
    let oldCharCodeByteLength = 0;
    for (let i = 0; i < value.length; i++) {
      const charCodeByteLength = Integer_default.getIntegerByteLength(value.charCodeAt(i), false);
      if (charCodeByteLength !== oldCharCodeByteLength) {
        oldCharCodeByteLength = charCodeByteLength;
        byteLength++;
      }
      byteLength += charCodeByteLength;
    }
    return byteLength;
  }
  // Write A String
  static writeString(bytes, offset, value) {
    let currentCharCodeByteLength = 0;
    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i);
      const charCodeByteLength = Integer_default.getIntegerByteLength(charCode, false);
      if (charCodeByteLength !== currentCharCodeByteLength) {
        currentCharCodeByteLength = charCodeByteLength;
        Integer_default.writeInteger(bytes, offset, -charCodeByteLength, 1);
        offset++;
      }
      Integer_default.writeInteger(bytes, offset, charCode, currentCharCodeByteLength);
      offset += currentCharCodeByteLength;
    }
  }
  // Read A String
  static readString(bytes, offset, end) {
    let value = "";
    let currentCharCodeByteLength = 0;
    while (offset < end) {
      const byte = Integer_default.readInteger(bytes, offset, 1);
      if (byte < 0) {
        currentCharCodeByteLength = -byte;
        offset++;
      } else {
        value += String.fromCharCode(Integer_default.readInteger(bytes, offset, currentCharCodeByteLength));
        offset += currentCharCodeByteLength;
      }
    }
    return value;
  }
  // String To Bytes
  static stringToBytes(value, byteLength) {
    const bytes = new Uint8Array(byteLength);
    let oldCharCodeByteLength = 0;
    let offset = 0;
    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i);
      const charCodeByteLength = Integer_default.getIntegerByteLength(charCode, false);
      if (charCodeByteLength !== oldCharCodeByteLength) {
        oldCharCodeByteLength = charCodeByteLength;
        Integer_default.writeInteger(bytes, offset, charCodeByteLength, 1);
        offset++;
      }
      Integer_default.writeInteger(bytes, offset, charCode, oldCharCodeByteLength);
      offset += oldCharCodeByteLength;
    }
    return bytes;
  }
};

// Binarion/Modules/Data.ts
var Data;
((Data2) => {
  let TypesID;
  ((TypesID2) => {
    TypesID2[TypesID2["Null"] = 0] = "Null";
    TypesID2[TypesID2["Undefined"] = 1] = "Undefined";
    TypesID2[TypesID2["Boolean"] = 2] = "Boolean";
    TypesID2[TypesID2["Integer"] = 3] = "Integer";
    TypesID2[TypesID2["Float"] = 4] = "Float";
    TypesID2[TypesID2["String"] = 5] = "String";
    TypesID2[TypesID2["Array"] = 6] = "Array";
    TypesID2[TypesID2["Uint8Array"] = 7] = "Uint8Array";
    TypesID2[TypesID2["Uint16Array"] = 8] = "Uint16Array";
    TypesID2[TypesID2["Uint32Array"] = 9] = "Uint32Array";
    TypesID2[TypesID2["Object"] = 11] = "Object";
    TypesID2[TypesID2["Map"] = 12] = "Map";
    TypesID2[TypesID2["Set"] = 13] = "Set";
    TypesID2[TypesID2["Function"] = 14] = "Function";
  })(TypesID = Data2.TypesID || (Data2.TypesID = {}));
  let Types;
  ((Types2) => {
    Types2.NullType = {
      id: 0 /* Null */,
      getBodyLength: () => 0,
      writeBody: () => {
      },
      readBody: () => null
    };
    Types2.UndefinedType = {
      id: 1 /* Undefined */,
      getBodyLength: () => 0,
      writeBody: () => {
      },
      readBody: () => void 0
    };
    Types2.BooleanType = {
      id: 2 /* Boolean */,
      getBodyLength: () => 1,
      writeBody: (bytes, offset, data) => bytes[offset] = data ? 1 : 0,
      readBody: (bytes, offset) => bytes[offset] === 1
    };
    Types2.IntegerType = {
      id: 3 /* Integer */,
      getBodyLength: (data) => Integer_default.getIntegerByteLength(data < 0 ? -data : data, data < 0),
      writeBody: (bytes, offset, data, bodyLength) => Integer_default.writeInteger(bytes, offset, data, bodyLength),
      readBody: (bytes, offset, end) => Integer_default.readInteger(bytes, offset, end - offset)
    };
    Types2.StringType = {
      id: 5 /* String */,
      getBodyLength: (data) => String_default.getStringByteLength(data),
      writeBody: (bytes, offset, data) => String_default.writeString(bytes, offset, data),
      readBody: (bytes, offset, end) => String_default.readString(bytes, offset, end)
    };
    Types2.ArrayType = {
      id: 6 /* Array */,
      getBodyLength: (data) => {
        let bodyLength = 0;
        for (let i = 0; i < data.length; i++) bodyLength += Fragment_default.getFragmentLength(data[i]);
        return bodyLength;
      },
      writeBody: (bytes, offset, data) => data.forEach((item) => offset = Fragment_default.writeFragment(bytes, offset, item)),
      readBody: (bytes, offset, end) => {
        let array = new Array();
        while (offset < end) {
          const result = Fragment_default.readFragment(bytes, offset);
          array.push(result.data);
          offset = result.offset;
        }
        return array;
      }
    };
    Types2.Uint8ArrayType = {
      id: 7 /* Uint8Array */,
      getBodyLength: (data) => data.length,
      writeBody: (bytes, offset, data) => bytes.set(data, offset),
      readBody: (bytes, offset, end) => bytes.subarray(offset, end)
    };
    Types2.Uint16ArrayType = {
      id: 8 /* Uint16Array */,
      getBodyLength: (data) => data.length * 2,
      writeBody: (bytes, offset, data) => {
        for (let i = 0; i < data.length; i++) {
          Integer_default.writeInteger(bytes, offset, data[i], 2);
          offset += 2;
        }
      },
      readBody: (bytes, offset, end) => {
        const array = new Uint16Array((end - offset) / 2);
        for (let i = 0; i < array.length; i++) {
          array[i] = Integer_default.readInteger(bytes, offset, 2);
          offset += 2;
        }
        return array;
      }
    };
    Types2.Uint32ArrayType = {
      id: 9 /* Uint32Array */,
      getBodyLength: (data) => data.length * 4,
      writeBody: (bytes, offset, data) => {
        for (let i = 0; i < data.length; i++) {
          Integer_default.writeInteger(bytes, offset, data[i], 42);
          offset += 2;
        }
      },
      readBody: (bytes, offset, end) => {
        const array = new Uint32Array((end - offset) / 4);
        for (let i = 0; i < array.length; i++) {
          array[i] = Integer_default.readInteger(bytes, offset, 4);
          offset += 2;
        }
        return array;
      }
    };
    Types2.ObjectType = {
      id: 11 /* Object */,
      getBodyLength: (data) => {
        let bodyLength = 0;
        for (let key of Object.keys(data)) bodyLength += Fragment_default.getFragmentLength(key) + Fragment_default.getFragmentLength(data[key]);
        return bodyLength;
      },
      writeBody: (bytes, offset, data) => {
        for (let key of Object.keys(data)) {
          offset = Fragment_default.writeFragment(bytes, offset, key);
          offset = Fragment_default.writeFragment(bytes, offset, data[key]);
        }
      },
      readBody: (bytes, offset, end) => {
        const object = {};
        while (offset < end) {
          const result = Fragment_default.readFragment(bytes, offset);
          offset = result.offset;
          const result2 = Fragment_default.readFragment(bytes, offset);
          offset = result2.offset;
          object[result.data] = result2.data;
        }
        return object;
      }
    };
  })(Types = Data2.Types || (Data2.Types = {}));
  function getDataTypeID(data) {
    if (data === null) return 0 /* Null */;
    if (data === void 0) return 1 /* Undefined */;
    if (typeof data === "boolean") return 2 /* Boolean */;
    if (typeof data === "number") {
      if (!Number.isNaN(data)) {
        if (Number.isInteger(data)) return 3 /* Integer */;
        else return 4 /* Float */;
      }
    }
    if (typeof data === "string") return 5 /* String */;
    if (Array.isArray(data)) return 6 /* Array */;
    if (data instanceof Uint8Array) return 7 /* Uint8Array */;
    if (data instanceof Uint16Array) return 8 /* Uint16Array */;
    if (data instanceof Object) return 11 /* Object */;
    throw new Error(`Unsupported Data Type: <${typeof data}> (\x1B[34m${import_util.default.inspect(data)}\x1B[0m)`);
  }
  Data2.getDataTypeID = getDataTypeID;
  function getDataType(id) {
    for (let name in Data2.Types) {
      if (Data2.Types[name].id === id) return Data2.Types[name];
    }
    throw new Error(`Data Type Not Found: ${id}`);
  }
  Data2.getDataType = getDataType;
})(Data || (Data = {}));
var Data_default = Data;

// Binarion/Modules/Fragment.ts
var Fragment_default = class {
  // Get The Length Of A Fragment
  static getFragmentLength(data) {
    const dataTypeID = Data_default.getDataTypeID(data);
    const bodyLength = Data_default.getDataType(dataTypeID).getBodyLength(data);
    return this.getHeaderLength(bodyLength) + bodyLength;
  }
  // Get The Length Of A Header
  static getHeaderLength(bodyLength) {
    return 1 + Integer_default.getIntegerByteLength(bodyLength, false);
  }
  // Write A Fragment
  static writeFragment(bytes, offset, data) {
    const dataTypeID = Data_default.getDataTypeID(data);
    const dataType = Data_default.getDataType(dataTypeID);
    const bodyLength = dataType.getBodyLength(data);
    offset = this.writeHeader(bytes, offset, { dataTypeID, bodyLength });
    dataType.writeBody(
      bytes,
      offset,
      data,
      bodyLength
    );
    return offset + bodyLength;
  }
  // Write A Header
  static writeHeader(bytes, offset, header) {
    const byteLength = Integer_default.getIntegerByteLength(header.bodyLength, false);
    bytes[offset] = Integer_default.integersToByte(header.dataTypeID, byteLength);
    Integer_default.writeInteger(bytes, offset + 1, header.bodyLength, byteLength);
    return offset + (1 + byteLength);
  }
  // Read A Fragment
  static readFragment(bytes, offset) {
    const [dataTypeID, bodyLengthIntegerByteLength] = Integer_default.byteToIntegers(bytes[offset]);
    const bodyLength = Integer_default.readInteger(bytes, offset + 1, bodyLengthIntegerByteLength);
    offset += 1 + bodyLengthIntegerByteLength;
    return { offset: offset + bodyLength, data: Data_default.getDataType(dataTypeID).readBody(bytes, offset, offset + bodyLength) };
  }
};

// Binarion/API.ts
var API_default = {
  // Save A JavaScript Object
  save: (data) => {
    const bytes = new Uint8Array(Fragment_default.getFragmentLength(data));
    Fragment_default.writeFragment(bytes, 0, data);
    return bytes;
  },
  // Load A JavaScript Object
  load: (bytes) => {
    return Fragment_default.readFragment(bytes, 0).data;
  }
};
