import Binarion from '../../Binarion/API'

const data = {
  a: true,
  b: 123,
  c: [1, 2, 3]
} 

const bytes = Binarion.save(data)

console.log('Binarion', bytes.length)
console.log('JSON', Buffer.from(JSON.stringify(data)).length)

// bytes.forEach((byte) => console.log(byte.toString(2).padStart(8, '0')))

// console.log(bytes)

console.log(Binarion.inspect(bytes).format())
