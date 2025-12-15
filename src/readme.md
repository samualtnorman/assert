<%
if (!process.env.FULL_ERROR) {
  process.on(`uncaughtException`, error => {
    console.error(error.message)
    process.exit(1)
  })
}

const { readFileSync } = await import("fs")
const { expectTruthy } = await import(`@sn/assert`)
const { TARGET, JSR_NAME } = process.env
const packageJson = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }))
const PackageName = TARGET == `jsr` ? expectTruthy(JSR_NAME, `Missing JSR_NAME`) : packageJson.name
%>
# Samual's Assertion Library
Requires Node.js 20.10+, 22.0+, 24.0+, or above.

## Example
```js
import { assert, expect } from "<%= PackageName %>"

// Throws if `someValue` is falsy
assert(someValue)

// `expect()` throws if `someOtherValue` is nullish or just returns the value
doSomething(expect(someOtherValue))
// This is like doing `doSomething(someOtherValue!)` in TypeScript but enforced
// in JavaScript
```

---
<% if (TARGET == `git`) { %>
This package is available on [JSR][jsr] and [NPM][npm].
<% } else if (TARGET == `jsr`) { %>
This package is also [available on NPM][npm].
<% } else if (TARGET == `npm`) { %>
This package is also [available on JSR][jsr].
<% } else throw Error(`Invalid or missing TARGET.`) %>

[npm]: https://www.npmjs.com/package/@samual/assert
[jsr]: https://jsr.io/@sn/assert
