
![](https://i.imgur.com/T8obUfO.png)

# 🧪 @e280/science

> *an https://e280.org/ project*

- zero dependencies
- deadass simple, no cli actually
- no funky instrumentation horseshit
- customizable, modular, built goodly

<br/>

## Typescript/javascript testing library

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
  node tests.test.js --verbose
  ```
- watch mode (run-on-save!)
  ```sh
  node --watch tests.test.js --verbose
  ```
- stick it in your package.json
  ```json
  "scripts": {
    "test": "node tests.test.js --verbose",
    "test-watch": "node --watch tests.test.js --verbose"
  },
  ```

### Happy tests
![](https://i.imgur.com/sv056Zz.png)
```ts
// example test case
"addition works": test(async() => {
  expect(2 + 2).is(4)
}),
```

### Skipping tests
![](https://i.imgur.com/NwEZPMt.png)
```ts
  //            skip this test
  //                   👇
"addition works": test.skip(async() => {
  expect(2 + 2).is(4)
}),
```

### Only running some tests
![](https://i.imgur.com/z7g2j8Z.png)
```ts
  //            only run this test
  //                   👇
"addition works": test.only(async() => {
  expect(2 + 2).is(4)
}),
```

### Failing tests
![](https://i.imgur.com/WRLXiSW.png)
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
- the next fallback are environment vars
  ```sh
  SCIENCE_VERBOSE=1 SCIENCE_THEME=seaside node tests.test.js
  ```
  - it's a cool pattern if you leave the theme config to the env variable
  - that way each developer can set their own SCIENCE_THEME var on their system

### Available themes
- `redgreen` (default) errors are red, happy tests are green
- `seaside` better for color blindness, errors are red, happy tests are blue
- `plain` no colors, no emojis

<br/>

## The key to happiness is realistic expectations
```ts
expect(2 + 2).is(4)

// custom fail note
expect(2 + 2, "universe is broken").is(2)

// custom fail note (alt syntax)
expect(2 + 2)
  .note("universe is broken")
  .is(2)

expect(2 + 2).isnt(4)
expect(2 + 2).gt(3)
expect(2 + 2).lt(5)
expect(2 + 2).gte(4)
expect(2 + 2).lte(4)

expect(() => {throw "lol"}).throws()
await expect(async() => {throw "lol"}).throwsAsync()

// you can ".not" anything
expect(2 + 2).not.is(5)
expect(2 + 2).not.isnt(4) // lol
expect(() => {throw "lol"}).not.throws()
```

<br/>

## 💖 Made with open source love
build with us at https://e280.org/ but only if you're cool

