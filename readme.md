
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
  node tests.test.js
  ```
- watch mode (run-on-save!)
  ```sh
  node --watch tests.test.js
  ```
- stick it in your package.json
  ```json
  "scripts": {
    "test": "node tests.test.js",
    "test-watch": "node --watch tests.test.js"
  },
  ```

### Happy tests
![](https://i.imgur.com/pRqFpAU.png)
```ts
// example test case
"addition works": test(async() => {
  expect(2 + 2).is(4)
}),
```

### Skipping tests
![](https://i.imgur.com/nbMGDcx.png)
```ts
  //            skip this test
  //                   👇
"addition works": test.skip(async() => {
  expect(2 + 2).is(4)
}),
```

### Only running some tests
![](https://i.imgur.com/EhULDb2.png)
```ts
  //            only run this test
  //                   👇
"addition works": test.only(async() => {
  expect(2 + 2).is(4)
}),
```

### Failing tests
![](https://i.imgur.com/uDjRSXX.png)
```ts
"addition works": test(async() => {

  // fail by expectation
  expect(2 + 999).is(4)

  // fail by returning false
  return false

  // fail by throwing a string or error
  throw "universe is broken"
}),
```

### Verbose mode (print all tests)
![](https://i.imgur.com/4J1IOJr.png)
```sh
node tests.test.js --verbose
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
```ts
await Science.run(myTestSuite, {

	// disable coloring
	theme: Science.themes.blank,

	// disable emojis
	glyphs: Science.glyphs.simple,
})
```

<br/>

## The key to happiness is realistic expectations
```ts
expect(2 + 2).is(4)

// custom fail note
expect(2 + 2, "universe is broken").is(2)

// custom fail note alt syntax
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

