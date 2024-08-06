# Performance
The performance of Binarion.

> [!NOTE]
> You can check out the [Performance Test Script](https://github.com/LmanTW/Binarion/blob/main/Scripts/Performance) to run it yourself.

## Complex Object
* Binarion
  * Save Time: `132.3ms`
  * Load Time: `25.4ms`
* JSON
  * Save Time: `3.0ms` (x44 Faster)
  * Load Time: `1.2ms` (x21 Faster)

## Simple Object With Large Uint8Array
* Binarion
  * Save Time: `0.1ms`
  * Load Time: `0.0ms`
* JSON
  * save Time: `1.5ms` (x17 Slower)
  * load Time: `0.6ms` (x35 Slower)

## Simple Object With Large Uint16Array
* Binarion
  * Load Time: `0.4ms`
  * Save Time: `0.3ms`
* JSON
  * Load Time: `1.4ms` (x4 Slower)
  * Save Time: `0.6ms` (x2 Slower)
