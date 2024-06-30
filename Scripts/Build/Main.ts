import { build } from 'tsup'
import path from 'path'
import fs from 'fs'

// Start The Build Process
async function start (): Promise<void> {
  if (!fs.existsSync(path.join(__dirname, 'Cache'))) fs.mkdirSync(path.join(__dirname, 'Cache'))

  console.log(` 📦 Building Binarion`)

  console.log(`    - Bundling \x1b[34mBinarion.cjs\x1b[0m`)

  await build({
    silent: true,

    entry: [path.resolve(__dirname, '../../Binarion/API.ts')],
    outDir: path.join(__dirname, 'Cache'),

    format: 'cjs',
    minify: true,

    skipNodeModulesBundle: true
  })

  console.log(`    - Bundling \x1b[34mBinarion.mjs\x1b[0m`)

  await build({
    silent: true,

    entry: [path.resolve(__dirname, '../../Binarion/API.ts')],
    outDir: path.join(__dirname, 'Cache'),

    format: 'esm',
    minify: 'terser',

    skipNodeModulesBundle: true
  })

  console.log(`    - Generating \x1b[34mBinarion.d.ts\x1b[0m`)

  await build({
    silent: true,

    entry: [path.resolve(__dirname, '../../Binarion/API.ts')],
    outDir: path.join(__dirname, 'Cache'),

    dts: true
  })

  console.log(` \x1b[32m📦 Successfully Built Binarion\x1b[0m\n`)
  
  fs.renameSync(path.join(__dirname, 'Cache', 'API.js'), path.resolve(__dirname, '../../Assets/Binarion.cjs'))
  fs.renameSync(path.join(__dirname, 'Cache', 'API.mjs'), path.resolve(__dirname, '../../Assets/Binarion.mjs'))
  fs.renameSync(path.join(__dirname, 'Cache', 'API.d.ts'), path.resolve(__dirname, '../../Assets/Binarion.d.ts'))

  fs.rmSync(path.join(__dirname, 'Cache'), { recursive: true })
}

start()
