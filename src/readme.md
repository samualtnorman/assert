<%
const { readFileSync } = await import("fs")
const packageJson = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }))
const JsrPackageName = `@sn/assert`
const PackageName = process.env.JSR ? JsrPackageName : packageJson.name
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
