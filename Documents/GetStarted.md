# Get Started
Get started with Binarion.

##  Install Binarion

```
npm install binarion
```

## Import Binarion

```ts
import Binarion from 'binarion' // For ECMAScript or TypeScript.

const Binarion = require('binarion') // For CommonJS.
```

> [!TIP]
> You can also download Binarion straight into your project, check out [API Documentation](https://github.com/LmanTW/Binarion/blob/main/Documents/API.md#installation)

## Use Binarion

```ts
// Let's save a JavaScript object and save it into a file.

import Binarion from 'binarion'
import path from 'path'
import fs from 'fs'

const filePath = path.join(__dirname, 'Data')

const data = Binarion.save({
    a: true,
    b: 123,
    c: '123',
    d: [1, 2, 3, 4],
    e: Uint8Array.from([1, 2, 3, 4, 5])
})

fs.writeFileSync(filePath, data)

// And load it back.

console.log(Binarion.load(fs.readFileSync(filePath)))
```

> [!NOTE]
> Check out the [API Documentation](https://github.com/LmanTW/Binarion/blob/main/Documents/API.md).
