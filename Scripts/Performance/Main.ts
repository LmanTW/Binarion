import test from './Test'

const testData1: { [key: number]: { [key: number]: number }} = {}

for (let i = 0; i < 128; i++) {
  testData1[i] = {}

  for (let i2 = 0; i2 < 128; i2++) testData1[i][i2] = i2
}

test('Complex Object', testData1, 32)

const testData2 = { a: true, b: 12345, c: new Uint8Array(8192) }

for (let i = 0; i < testData2.c.length; i++) testData2.c[i] = i % 255

test('Simple Object With Large Uint8Array', testData2, 64)

const testData3 = { a: true, b: 12345, c: new Uint16Array(8192) }

for (let i = 0; i < testData3.c.length; i++) testData2.c[i] = i % 255

test('Simple Object With Large Uint16Array', testData3, 64)
