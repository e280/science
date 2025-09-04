
# @e280/science changelog
- 🟥 breaking change
- 🔶 deprecation or possible breaking change
- 🍏 harmless addition, fix, or enhancement

<br/>

## v0.1

### v0.1.2
- 🔶 `Science.run` behavior change
  - old behavior: when done, it would explicitly exit the process, with process.exit or Deno.exit
  - new behavior: when done, it merely schedules the exitCode by setting process.exitCode or Deno.exitCode
    - this means the process can exit naturally when it wants to
    - the upside: now uncaught promise rejections actually get handled and reported, big win
    - the downside: you could have rogue bullshit in the event loop that prevents your suite from exiting -- but maybe it's for the best that you'll probably eventually discover it in tests..

### v0.1.1
- 🍏 add `expect(x).happy()` alias for "available"
- 🍏 add `expect(x).sad()` alias for "nullish"

### v0.1.0
- 🍏 moving to version range that allows non-breaking patches

## v0.0

### v0.0.7
- 🍏 update dependencies

### v0.0.6
- 🍏 update dev dependencies
- 🍏 add formal package exports

### v0.0.5
- 🍏 add `spy(fn)` for making spy functions that track calls and returns and such
- 🍏 fix expect error message value truncations

### v0.0.1
- 🍏 add `expect(x).ok()`
- 🍏 add `expect(x).nullish()`
- 🍏 add `expect(x).available()`

### v0.0.0
- 🍏 initial version

