
# 🧪 Science

> *an [e280.org](https://e280.org/) project*

<br/>

## Typescript/javascript testing framework

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

### Happy tests
![](https://i.imgur.com/pRqFpAU.png)
- run your tests in node
  ```sh
  node tests.test.js
  ```
- setup a watch routine for your tests
  ```sh
  node --watch tests.test.js
  ```

### Skipping tests
![](https://i.imgur.com/nbMGDcx.png)
- ```ts
    //                    👇
  "addition works": test.skip(async() => {
    expect(2 + 2).is(4)
  }),
  ```

### Only running some tests
![](https://i.imgur.com/EhULDb2.png)
- ```ts
    //                    👇
  "addition works": test.only(async() => {
    expect(2 + 2).is(4)
  }),
  ```

### Failing tests
![](https://i.imgur.com/uDjRSXX.png)
- ```ts
  "addition works": test(async() => {

    // fail by expectation
    expect(2 + 999).is(4)

    // fail by returning false
    return false

    // fail by throwing a string or error
    throw "universe is broken"
  }),
  ```

### Arbitrary nesting of test suites
- ```ts
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

<br/>

## Realistic expectations
- simple expectation
  ```ts
  "addition works": test(async() => {

     // "is" to check === equality
     //          👇
    expect(2 + 2).is(4)
  }),
  ```
- expectation with a custom message
  ```ts
  expect(2 + 2, "universe is broken").is(2)
  ```
- greater than, less than
  ```ts
  expect(2 + 2).gt(3)
  expect(2 + 2).lt(5)
  expect(2 + 2).gte(4)
  expect(2 + 2).lte(4)
  ```
- other handy stuff
  ```ts
  expect(2 + 2).isnt(5)
  ```
- expecting a function will throw
  ```ts
  expect(() => {throw "lol"}).throws()
  ```
- expecting an async function will throw
  ```ts
  await expect(async() => {throw "lol"}).throwsAsync()
  ```

### You can use `.not` on all expectations
- not is
  ```ts
  expect(2 + 2).not.is(5)
  ```
- not isnt (you're a psycho)
  ```ts
  expect(2 + 2).not.isnt(4)
  ```
- not throws
  ```ts
  expect(() => {throw "lol"}).not.throws()
  ```
- i think you get the idea

