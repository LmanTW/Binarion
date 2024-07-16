# Performance
The performance of Binarion.

> [!NOTE]
> You can check out the [Performance Test Script](https://github.com/LmanTW/Binarion/blob/main/Scripts/Performance) to run it yourself.

## Complex Object
* Binarion
  * Load Time: `109.3ms`
  * Save Time: `27.7ms`
* JSON
  * Load Time: `2.1ms` (x52 Faster)
  * Save Time: `0.8ms` (x33 Faster)

## Simple Object With Large Uint8Array
* Binarion
  * Load Time: `0.1ms`
  * Save Time: `0.0ms`
* JSON
  * Load Time: `1.1ms` (x19 Slower)
  * Save Time: `0.5ms` (x31 Slower)

## Simple Object With Large Uint16Array
* Binarion
  * Load Time: `0.2ms`
  * Save Time: `0.2ms`
* JSON
  * Load Time: `1.0ms` (x4 Slower)
  * Save Time: `0.4ms` (x2 Slower)
