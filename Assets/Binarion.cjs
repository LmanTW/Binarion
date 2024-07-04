"use strict";var __create=Object.create,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty,__export=(t,e)=>{for(var r in e)__defProp(t,r,{get:e[r],enumerable:!0})},__copyProps=(t,e,r,a)=>{if(e&&"object"==typeof e||"function"==typeof e)for(let n of __getOwnPropNames(e))__hasOwnProp.call(t,n)||n===r||__defProp(t,n,{get:()=>e[n],enumerable:!(a=__getOwnPropDesc(e,n))||a.enumerable});return t},__toESM=(t,e,r)=>(r=null!=t?__create(__getProtoOf(t)):{},__copyProps(!e&&t&&t.__esModule?r:__defProp(r,"default",{value:t,enumerable:!0}),t)),__toCommonJS=t=>__copyProps(__defProp({},"__esModule",{value:!0}),t),API_exports={};__export(API_exports,{Binarion:()=>Binarion,Inspector:()=>Inspector_default}),module.exports=__toCommonJS(API_exports);var DataFormat,DefaultValue_default=(t,e)=>void 0===t?e:t,Nibble_default=class{static writeNibble(t,e,r){t.writeByte(e<<4|r)}static readNibble(t){const e=t.readByte();return[e>>4&15,15&e]}},import_util=__toESM(require("util"));(t=>{let e;var r;(r=e=t.ID||(t.ID={}))[r.None=0]="None",r[r.Boolean=1]="Boolean",r[r.Integer=2]="Integer",r[r.Float=3]="Float",r[r.String=4]="String",r[r.Array=5]="Array",r[r.UintArray=7]="UintArray",r[r.Object=11]="Object",r[r.Map=12]="Map",r[r.Set=13]="Set",r[r.Function=14]="Function"})(DataFormat||(DataFormat={}));var Data,DataFormat_default=DataFormat,Integer=class t{static getMaxIntegerValue(t){if(0===t)return 0;let e=0;for(let r=0;r<7*t;r++)e+=0===e?2:e;return e}static getIntegerByteLength(e){const r=e<0?-e:e;for(let e=0;e<16;e++)if(r<t.getMaxIntegerValue(e))return e;throw new Error(`Integer Out Of Range: ${e}`)}static writeInteger(t,e,r){for(let a=0;a<r;a++){let n=BigInt(e)>>BigInt(7*a)&0b01111111n;a===r-1&&(n|=0b10000000n),t.writeByte(Number(n))}}static readInteger(t){let e=0n,r=0;for(;;){let a=t.readByte();if(a>>7==1){e|=(0b01111111n&BigInt(a))<<BigInt(r);break}e|=BigInt(a)<<BigInt(r),r+=7}return Number(e)}},Integer_default=Integer,DataFormat_UintArray={id:DataFormat_default.ID.UintArray,getHeaderAttachemnt:t=>t instanceof Uint16Array?2:t instanceof Uint32Array?4:t instanceof BigUint64Array?8:1,getBodyInfo:t=>{let e=Integer_default.getIntegerByteLength(t.length),r=1;return t instanceof Uint16Array&&(r=2),t instanceof Uint32Array&&(r=4),t instanceof BigUint64Array&&(r=8),{bodyLength:e+t.length*r,integerByteLength:e,elementByteLength:r}},writeBody:(t,e,r)=>{if(Integer_default.writeInteger(t,e.length,r.integerByteLength),e instanceof Uint8Array)t.writeBytes(e);else for(let a=0;a<e.length;a++)for(let n=8*(r.elementByteLength-1);n>=0;n-=8)t.writeByte(e[a]>>n&255)},readBody:(t,e)=>{const r=Integer_default.readInteger(t);if(1===e)return t.readBytes(r);{let a;if(e<=2)a=new Uint16Array(r);else{if(!(e<=4))throw new Error(`Element Byte Length Out Of Range: ${e}`);a=new Uint32Array(r)}for(let n=0;n<r;n++)for(let r=8*(e-1);r>=0;r-=8)a[n]|=t.readByte()<<r;return a}},inspectName:t=>1===t?"UintArray (8)":t<=2?"UintArray (16)":"UintArray (32)",inspectChildren:()=>[]},UintArray_default=DataFormat_UintArray,DataFormat_Boolean={id:DataFormat_default.ID.Boolean,getHeaderAttachemnt:t=>t?1:0,getBodyInfo:()=>({bodyLength:0}),writeBody:()=>{},readBody:(t,e)=>1===e,inspectName:()=>"Boolean",inspectChildren:()=>[]},Boolean_default=DataFormat_Boolean,DataFormat_Integer={id:DataFormat_default.ID.Integer,getHeaderAttachemnt:t=>t<0?1:0,getBodyInfo:t=>({bodyLength:Integer_default.getIntegerByteLength(t)}),writeBody:(t,e,r)=>Integer_default.writeInteger(t,e<0?-e:e,r.bodyLength),readBody:(t,e)=>{const r=Integer_default.readInteger(t);return 1===e?-r:r},inspectName:()=>"Integer",inspectChildren:t=>(Integer_default.readInteger(t),[])},Integer_default2=DataFormat_Integer,String_default=class{static getStringByteLength(t){let e=0;for(let r=0;r<t.length;r++)e+=Integer_default.getIntegerByteLength(t.charCodeAt(r));return Integer_default.getIntegerByteLength(t.length)+e}static writeString(t,e){const r=e.length;Integer_default.writeInteger(t,r,Integer_default.getIntegerByteLength(r));for(let r=0;r<e.length;r++){const a=e.charCodeAt(r);Integer_default.writeInteger(t,a,Integer_default.getIntegerByteLength(a))}}static readString(t){let e="";const r=Integer_default.readInteger(t);for(let a=0;a<r;a++)e+=String.fromCharCode(Number(Integer_default.readInteger(t)));return e}},DataFormat_String={id:DataFormat_default.ID.String,getHeaderAttachemnt:()=>0,getBodyInfo:t=>({bodyLength:String_default.getStringByteLength(t)}),writeBody:(t,e)=>String_default.writeString(t,e),readBody:t=>String_default.readString(t),inspectName:()=>"String",inspectChildren:()=>[]},String_default2=DataFormat_String,DataFormat_Object={id:DataFormat_default.ID.Object,getHeaderAttachemnt:()=>0,getBodyInfo:t=>{let e=0;const r=Object.keys(t);for(let a of r)e+=String_default.getStringByteLength(a),e+=Fragment_default.getFragmentByteLength(t[a]);return{bodyLength:Integer_default.getIntegerByteLength(r.length)+e}},writeBody:(t,e)=>{const r=Object.keys(e);Integer_default.writeInteger(t,r.length,Integer_default.getIntegerByteLength(r.length));for(let a of r)String_default.writeString(t,a),Fragment_default.writeFragment(t,e[a])},readBody:t=>{const e={},r=Integer_default.readInteger(t);for(let a=0;a<r;a++)e[String_default.readString(t)]=Fragment_default.readFragment(t);return e},inspectName:()=>"Object",inspectChildren:(t,e,r)=>{const a=[],n=Integer_default.readInteger(t);for(let o=0;o<n;o++)String_default.readString(t),a.push(Fragment_default.inspectFragment(t,e,r+1));return r<e.depth?a:[]}},Object_default=DataFormat_Object,DataFormat_Array={id:DataFormat_default.ID.Array,getHeaderAttachemnt:()=>0,getBodyInfo:t=>{let e=0;for(let r of t)e+=Fragment_default.getFragmentByteLength(r);const r=Integer_default.getIntegerByteLength(t.length);return{bodyLength:r+e,integerByteLength:r}},writeBody:(t,e,r)=>{Integer_default.writeInteger(t,e.length,r.integerByteLength);for(let r of e)Fragment_default.writeFragment(t,r)},readBody:t=>{const e=[],r=Integer_default.readInteger(t);for(let a=0;a<r;a++)e.push(Fragment_default.readFragment(t));return e},inspectName:()=>"Array",inspectChildren:(t,e,r)=>{const a=[],n=Integer_default.readInteger(t);for(let o=0;o<n;o++)a.push(Fragment_default.inspectFragment(t,e,r+1));return r<e.depth?a:[]}},Array_default=DataFormat_Array,DataFormat_None={id:DataFormat_default.ID.None,getHeaderAttachemnt:t=>null===t?0:1,getBodyInfo:()=>({bodyLength:0}),writeBody:()=>{},readBody:(t,e)=>{if(0===e)return null},inspectName:t=>0===t?"None (Null)":"None (Undefined)",inspectChildren:()=>[]},None_default=DataFormat_None,DataFormat_Set={id:DataFormat_default.ID.Set,getHeaderAttachemnt:()=>0,getBodyInfo:t=>{let e=0;const r=t.keys();for(;;){const t=r.next();if(e+=Fragment_default.getFragmentByteLength(t.value),t.done)break}return{bodyLength:Integer_default.getIntegerByteLength(t.size)+e}},writeBody:(t,e)=>{Integer_default.writeInteger(t,e.size,Integer_default.getIntegerByteLength(e.size));const r=e.keys();for(;;){const e=r.next();if(Fragment_default.writeFragment(t,e.value),e.done)break}},readBody:t=>{const e=new Set,r=Integer_default.readInteger(t);for(let a=0;a<r;a++)e.add(Fragment_default.readFragment(t));return e},inspectName:()=>"Set",inspectChildren:(t,e,r)=>{const a=[],n=Integer_default.readInteger(t);for(let o=0;o<n;o++)a.push(Fragment_default.inspectFragment(t,e,r+1));return r<e.depth?a:[]}},Set_default=DataFormat_Set,DataFormat_Map={id:DataFormat_default.ID.Map,getHeaderAttachemnt:()=>0,getBodyInfo:t=>{let e=0;const r=t.keys();for(;;){const a=r.next();if(void 0!==a.value&&(e+=String_default.getStringByteLength(a.value),e+=Fragment_default.getFragmentByteLength(t.get(a.value))),a.done)break}return{bodyLength:Integer_default.getIntegerByteLength(t.size)+e}},writeBody:(t,e)=>{Integer_default.writeInteger(t,e.size,Integer_default.getIntegerByteLength(e.size));const r=e.keys();for(;;){const a=r.next();if(void 0!==a.value&&(String_default.writeString(t,a.value),Fragment_default.writeFragment(t,e.get(a.value))),a.done)break}},readBody(t){const e=new Map,r=Integer_default.readInteger(t);for(let a=0;a<r;a++)e.set(String_default.readString(t),Fragment_default.readFragment(t));return e},inspectName:()=>"Map",inspectChildren:(t,e,r)=>{const a=[],n=Integer_default.readInteger(t);for(let o=0;o<n;o++)a.push(Fragment_default.inspectFragment(t,e,r+1));return r<e.depth?a:[]}},Map_default=DataFormat_Map;(t=>{t.Writer=class{_index=0;_bytes;constructor(t){this._bytes=t,this._bytes.set}get index(){return this._index}get bytes(){return this._bytes}writeByte(t){this._bytes[this._index]=t,this._index++}writeBytes(t){this._bytes.set(t,this._index),this._index+=t.length}};t.Reader=class{_index=0;_bytes;constructor(t){this._bytes=t,this._bytes.set}get index(){return this._index}get bytes(){return this._bytes}readByte(){const t=this._bytes[this._index];return this._index++,t}readBytes(t){const e=this._bytes.subarray(this._index,this._index+t);return this._index+=t,e}},t.Formats=[UintArray_default,Boolean_default,Integer_default2,String_default2,Object_default,Array_default,None_default,Set_default,Map_default],t.getDataFormatID=function(t){if(null==t)return DataFormat_default.ID.None;if("boolean"==typeof t)return DataFormat_default.ID.Boolean;if("number"==typeof t&&!Number.isNaN(t))return Number.isInteger(t)?DataFormat_default.ID.Integer:DataFormat_default.ID.Float;if("string"==typeof t)return DataFormat_default.ID.String;if(Array.isArray(t))return DataFormat_default.ID.Array;if(t instanceof Uint8Array||t instanceof Uint16Array||t instanceof Uint32Array||t instanceof BigUint64Array)return DataFormat_default.ID.UintArray;if(t instanceof Set)return DataFormat_default.ID.Set;if(t instanceof Map)return DataFormat_default.ID.Map;if(t instanceof Object)return DataFormat_default.ID.Object;throw new Error(`Unsupported Data Format: <${typeof t}> ([34m${import_util.default.inspect(t)}[0m)`)},t.getDataFormat=function(e){for(let r of t.Formats)if(r.id===e)return r;throw new Error(`Data Format Not Found: "${e}"`)}})(Data||(Data={}));var Binarion,Data_default=Data,Fragment_default=class{static getFragmentByteLength(t){const e=Data_default.getDataFormatID(t);return 1+Data_default.getDataFormat(e).getBodyInfo(t).bodyLength}static writeFragment(t,e){const r=Data_default.getDataFormatID(e),a=Data_default.getDataFormat(r),n=a.getBodyInfo(e);this.writeHeader(t,{dataFormatID:r,attachment:a.getHeaderAttachemnt(e)}),a.writeBody(t,e,n)}static writeHeader(t,e){Nibble_default.writeNibble(t,e.dataFormatID,e.attachment)}static readFragment(t){const[e,r]=Nibble_default.readNibble(t);return Data_default.getDataFormat(e).readBody(t,r)}static inspectFragment(t,e,r){const a=t.index,[n,o]=Nibble_default.readNibble(t),g=Data_default.getDataFormat(n),i=Data_default.getDataFormat(n).inspectChildren(t,e,r);return{dataFormatID:n,headerAttachment:o,name:g.inspectName(o),fragmentByteLength:t.index-a,index:a,children:i}}},Inspector_default=class{_options;_inspectResult;constructor(t,e){void 0===e&&(e={}),this._options={depth:DefaultValue_default(e.depth,1/0)},this._inspectResult=Fragment_default.inspectFragment(new Data_default.Reader(t),this._options,0)}get fragmentInfo(){return this._inspectResult}format(){return this._formatFragmentInfo(this._inspectResult,0)}_formatFragmentInfo(t,e){let r="";r+="  ".repeat(e)+`- ${t.name} [${t.fragmentByteLength} Bytes]`;for(let a of t.children)r+=`\n${this._formatFragmentInfo(a,e+1)}`;return r}};(t=>{t.save=function(t){const e=new Uint8Array(Fragment_default.getFragmentByteLength(t)),r=new Data_default.Writer(e);return Fragment_default.writeFragment(r,t),e},t.load=function(t){return Fragment_default.readFragment(new Data_default.Reader(t))}})(Binarion||(Binarion={}));