import { Binarion, Inspector } from '../../Binarion/API'

const data = { a: true, b: 123, c: new Uint16Array([100000, 200000, 300000, 400000, 500000]) } 

const bytes = Binarion.save(data)

bytes.forEach((byte) => console.log(byte.toString(2).padStart(8, '0')))

console.log(bytes)

console.log()

const inspector = new Inspector(bytes)

console.log(inspector.format())
