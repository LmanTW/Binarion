import Binarion from '../../Binarion/API'

const data = 1234567890

const bytes = Binarion.save(data)

console.log('Binarion', bytes.length)
console.log('JSON', Buffer.from(JSON.stringify(data)).length)

// bytes.forEach((byte) => console.log(byte.toString(2).padStart(8, '0')))

// console.log(bytes)

console.log(Binarion.load(bytes))
