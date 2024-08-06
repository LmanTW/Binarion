import path from 'path'
import fs from 'fs'

import { Binarion, Inspector } from '../../Binarion/API'

const bytes = Binarion.save({ a: true, b: 12345, c: [1, 2, 3] })

console.log(bytes)
