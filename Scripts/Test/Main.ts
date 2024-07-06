import { Binarion, Inspector } from '../../Binarion/API'

const data = 'abc'

const bytes = Binarion.save(data)

console.log('Binarion', bytes.length)
// console.log('JSON', Buffer.from(JSON.stringify(data)).length)

bytes.forEach((byte) => console.log(byte.toString(2).padStart(8, '0')))

console.log(bytes)

console.log()

const inspector = new Inspector(bytes)

console.log(inspector.format())
