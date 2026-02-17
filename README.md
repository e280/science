
![](https://i.imgur.com/T8obUfO.png)

![](https://i.imgur.com/am5SBsi.png)



<br/>

# 🧪 @e280/science

- **minimalist ts/js testing framework**
- deadass simple, no cli actually
- no funky instrumentation horseshit
- zero dependencies
- *an https://e280.org/ project*



<br/>

## ⚗️ easy setup
- install science
  ```sh
  npm install --save-dev @e280/science
  ```
- create your `tests.test.js`
  ```ts
  import {Science, suite, test, expect} from "@e280/science"

  await Science.run({
    "addition works": test(async() => {
      expect(2 + 2).is(4)
    }),
  })
  ```
- run your tests in node
  ```sh
  node tests.test.js
  ```
- watch mode (run-on-save!)
  ```sh
  node --watch tests.test.js
  ```
- run the debugger
  ```sh
  node inspect tests.test.js
  ```
- stick it in your package.json
  ```json
  "scripts": {
    "test": "node tests.test.js",
    "test-watch": "node --watch tests.test.js"
  },
  ```



<br/>

## ⚗️ learn by example

### happy tests
```ts
// example test case
"addition works": test(async() => {
  expect(2 + 2).is(4)
}),
```

### skipping tests
```ts
  //            skip this test
  //                   👇
"addition works": test.skip(async() => {
  expect(2 + 2).is(4)
}),
```

### only running some tests
```ts
  //            only run this test
  //                   👇
"addition works": test.only(async() => {
  expect(2 + 2).is(4)
}),
```

### failing tests
```ts
"addition works": test(async() => {

  // fail by expectation
  expect(2 + 2).is(5)

  // fail by returning false
  return false

  // fail by throwing a string or error
  throw "universe is broken"
}),
```

### arbitrary nesting of test suites
```ts
await Science.run({
  "nesting": suite({
    "deeper nesting": suite({
      "addition works": test(async() => {
        expect(2 + 2).is(4)
      }),
    }),
  }),
})
```
- `suite.skip` works
- `suite.only` works

### passing in options
- the options object passed in via javascript gets top priority
  ```ts
  await Science.run(myTestSuite, {

    // print all test cases
    verbose: true,

    // disable colors and emojis
    theme: Science.themes.plain,
  })
  ```
- the next fallback are cli arguments
  ```sh
  node tests.test.js --verbose --theme=seaside
  ```
- ***(best practice)*** the next fallback are environment vars
  ```sh
  SCIENCE_VERBOSE=1 SCIENCE_THEME=seaside node tests.test.js
  ```
  - using environment variables is preferable to hard-coding anything
  - this allows developers to choose their own preference
  - they can simply run `export SCIENCE_VERBOSE=1` or `export SCIENCE_THEME=seaside` in their terminal before starting a science watch routine

### available themes
- `redgreen` (default) errors are red, happy tests are green
- `seaside` better for color blindness, errors are red, happy tests are blue
- `plain` no colors, no emojis



<br/>

## ⚗️ the key to happiness is realistic expectations

see all the expectations in [expectations.ts](./s/parts/expectation/expectations.ts)

```ts
const x = 2 + 2

expect(x).is(4)

// custom fail note
expect(x, "universe is broken").is(2)

// custom fail note (alt syntax)
expect(x)
  .note("universe is broken")
  .is(2)

expect(x).isnt(4)
expect(x).gt(3)
expect(x).lt(5)
expect(x).gte(4)
expect(x).lte(4)

expect(x).happy() // not undefined or null
expect(x).sad() // undefined or null

expect(() => {throw "lol"}).throws()
await expect(async() => {throw "lol"}).throwsAsync()

// you can ".not" anything
expect(x).not.is(5)
expect(x).not.isnt(4) // lol
expect(() => {throw "lol"}).not.throws()
```



## ⚗️ run your tests in browser
  - ok, you have to bundle the test script yourself
  - then you can just load your bundle as a script
    ```html
    <script type=module src="tests.test.bundle.min.js"></script>
    ```
  - by default, it will emit results to the console by default
  - but if you want to make fancier output, you can do it yourself like this:
    ```ts
    import {execute, summarize} from "@e280/science"
    import mySuite from "./my-suite.test.js"

    const report = await execute(mySuite)
    const summary = summarize(report)

    for (const output in summary.output) {
      if (output instanceof Stderr)
        console.error(output.line)
      else
        console.log(output.line)
    }
    ```



<br/>

## 💖 made with open source love
build with us at https://e280.org/ but only if you're cool

