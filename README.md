
![](https://i.imgur.com/T8obUfO.png)

# 🧪 @e280/science

- **minimalist ts/js testing framework**
- deadass simple, no cli actually
- no funky instrumentation horseshit
- zero dependencies
- *an https://e280.org/ project*

<br/>

## Easy setup
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

## Learn by example

### Happy tests
```ts
// example test case
"addition works": test(async() => {
  expect(2 + 2).is(4)
}),
```
![](https://i.imgur.com/sv056Zz.png)

<br/>

### Skipping tests
```ts
  //            skip this test
  //                   👇
"addition works": test.skip(async() => {
  expect(2 + 2).is(4)
}),
```
![](https://i.imgur.com/NwEZPMt.png)

<br/>

### Only running some tests
```ts
  //            only run this test
  //                   👇
"addition works": test.only(async() => {
  expect(2 + 2).is(4)
}),
```
![](https://i.imgur.com/z7g2j8Z.png)

<br/>

### Failing tests
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
![](https://i.imgur.com/WRLXiSW.png)

<br/>

### Arbitrary nesting of test suites
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

<br/>

### Passing in options
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

<br/>

### Available themes
- `redgreen` (default) errors are red, happy tests are green
- `seaside` better for color blindness, errors are red, happy tests are blue
- `plain` no colors, no emojis

<br/>
<br/>

## The key to happiness is realistic expectations

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

<br/>

## 💖 Made with open source love
build with us at https://e280.org/ but only if you're cool

