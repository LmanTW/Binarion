import { Binarion } from '../../Binarion/API'

// Start The Performace Test
function start (): void {
  const dataSet1: { [key: string]: { [key: string]: string }} = {}

  const letters = 'abcdefghijklmnopqrstuvwxyz'

  for (let i = 0; i < letters.length; i++) {
    dataSet1[letters[i]] = {}

    for (let i2 = 0; i2 < letters.length; i2++) dataSet1[letters[i]][letters[i2]] = letters
  }

  console.log(' ⏱ Testing Data Set 1')

  test(dataSet1, 100)

  const dataSet2 = {
    a: true,
    b: 123,
    c: new Uint8Array(2048),
    d: new Uint32Array(2048)
  }

  console.log(' ⏱ Testing Data Set 1')

  test(dataSet2, 100)
}

// Test 
function test (data: any, amount: number): void {
  const binarionSaveTime: number[] = []

  for (let i = 0; i < amount; i++) {
    const start = performance.now()

    Binarion.save(data)

    binarionSaveTime.push(performance.now() - start)
  }

  console.log(` ⏱ Binarion: Total ${binarionSaveTime.reduce((a, b) => a + b).toFixed(2)}ms - Average ${(binarionSaveTime.reduce((a, b) => a + b) / binarionSaveTime.length).toFixed(2)}ms (Size: ${Binarion.save(data).length} Bytes)`)

  const jsonSaveTime: number[] = []

  for (let i = 0; i < amount; i++) {
    const start = performance.now()

    JSON.stringify(data)

    jsonSaveTime.push(performance.now() - start)
  }

  console.log(` ⏱ JSON: Total ${jsonSaveTime.reduce((a, b) => a + b).toFixed(2)}ms - Average ${(jsonSaveTime.reduce((a, b) => a + b) / jsonSaveTime.length).toFixed(2)}ms (Size: ${Buffer.from(JSON.stringify(data)).length} Bytes)\n`)
}

start()
