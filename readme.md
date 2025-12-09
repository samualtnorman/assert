# Samual's Assertion Library
Requires Node.js 20.10+, 22.0+, 24.0+, or above.

## Example
```js
import { assert, expect } from "@samual/assert"

// Throws if `someValue` is falsy
assert(someValue)

// `expect()` throws if `someOtherValue` is nullish or just returns the value
doSomething(expect(someOtherValue))
// This is like doing `doSomething(someOtherValue!)` in TypeScript but enforced
// in JavaScript
```

---
This package is available on [JSR](jsr) and [NPM](npm).

[npm]: https://www.npmjs.com/package/@samual
[jsr]: https://jsr.io/@sn
