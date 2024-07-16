import { Binarion } from '../../Binarion/API'

// Test
export default (name: string, testData: any, amount: number): TestResult => {
  console.log(` ⏱  Testing: ${name} (x${amount})`)

  const saveTime_binarion: number[] = []
  const loadTime_binarion: number[] = []

  console.log('    - Testing \x1b[34mBinarion\x1b[0m')

  for (let i = 0; i < amount; i++) {
    const saveStart = performance.now()

    const data = Binarion.save(testData)

    saveTime_binarion.push(performance.now() - saveStart)

    const loadStart = performance.now()

    Binarion.load(data)

    loadTime_binarion.push(performance.now() - loadStart)
  }

  const saveTime_json: number[] = []
  const loadTime_json: number[] = []

  console.log('    - Testing \x1b[34mJSON\x1b[0m')

  for (let i = 0; i < amount; i++) {
    const saveStart = performance.now()

    const data = JSON.stringify(testData)

    saveTime_json.push(performance.now() - saveStart)

    const loadStart = performance.now()

    JSON.parse(data)

    loadTime_json.push(performance.now() - loadStart)
  }

  console.log(' ⏱  \x1b[32mSuccessfully Tested\x1b[0m')

  const averageSaveTime_binarion = saveTime_binarion.reduce((a, b) => a + b) / amount
  const averageLoadTime_binarion = loadTime_binarion.reduce((a, b) => a + b) / amount

  const averageSaveTime_json = saveTime_json.reduce((a, b) => a + b) / amount
  const averageLoadTime_json = loadTime_json.reduce((a, b) => a + b) / amount

  console.log(`    - Binarion (${Binarion.save(testData).length} Bytes)`)
  console.log(`      - Average Save Time: \x1b[34m${averageSaveTime_binarion.toFixed(1)}ms\x1b[0m`)
  console.log(`      - Average Load Time: \x1b[34m${averageLoadTime_binarion.toFixed(1)}ms\x1b[0m`)

  console.log(`    - JSON (${Buffer.from(JSON.stringify(testData)).length} Bytes)`)
  console.log(`      - Average Save Time: \x1b[34m${averageSaveTime_json.toFixed(1)}ms (${compareTime(averageSaveTime_json, averageSaveTime_binarion)})\x1b[0m`)
  console.log(`      - Average Load Time: \x1b[34m${averageLoadTime_json.toFixed(1)}ms (${compareTime(averageLoadTime_json, averageLoadTime_binarion)})\x1b[0m\n`)
}

// Compare The Time
function compareTime (time1: number, time2: number): string {
  if (time1 > time2) return `x${Math.round(time1 / time2)} Slower`
  else return `x${Math.round(time2 / time1)} Faster`
}

// Test Result
interface TestResult {
  binarion: {
    averageSaveTime: number
    averageLoadTime: number
  },

  json: {
    averageSaveTime: number
    averageLoadTime: number
  }
}
