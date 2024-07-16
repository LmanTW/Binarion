import { Binarion, Inspector } from '../../Binarion/API'

bytes.forEach((byte) => console.log(byte.toString(2).padStart(8, '0')))

console.log(bytes)

console.log()

const inspector = new Inspector(bytes)

console.log(inspector.format())
