import inspector from 'inspector'
import path from 'path'
import fs from 'fs'

import { Binarion } from '../../Binarion/API'

const session = new inspector.Session()

session.connect()

session.post('Profiler.enable', () => {
  session.post('Profiler.start', () => {
    const data: { [key: number]: { [key: number]: number }} = {}

    for (let i = 0; i < 100; i++) {
      data[i] = {}

      for (let i2 = 0; i2 < 100; i2++) data[i][i2] = i2
    }

    const start = performance.now()

    Binarion.load(Binarion.save(data)) 

    console.log(Math.round(performance.now() - start))

    session.post('Profiler.stop', (_, { profile }) => {
      fs.writeFileSync(path.join(__dirname, 'Result.profile'), JSON.stringify(profile))
    })
  })
})
