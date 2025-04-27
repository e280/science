
# 🧪 Science

> *an [e280.org](https://e280.org/) project*

### Happy tests
![](https://i.imgur.com/xjX1oMd.png)

### Failing tests
![](https://i.imgur.com/hjpDIW0.png)

### Skipping tests
![](https://i.imgur.com/PZZE30W.png)

### Only running some tests
![](https://i.imgur.com/jyyjvA9.png)

<br/>

## Typescript/javascript testing framework

```sh
npm install --save-dev @e280/science
```

### Create your `tests.test.js`

```ts
import {Science, suite, test, expect} from "@e280/science"

await Science.run({
  "addition works": test(async() => {
    expect(1 + 1).is(2)
  }),

  "subtraction works": test(async() => {
    expect(2 - 1).gt(0)
  }),

  "more tests": suite({
    "string tests": test(async() => {
      expect("hello" + " world").is("hello world")
    }),

    "array tests": test(async() => {
      const items = [1, 2, 3]
      items.pop()
      expect(items.length).not.is(3)
    }),
  }),
})
```

### Run your test suite in node

```sh
node tests.test.js
```

### Setup a watch routine for your test suite

And also run your test suite in watch mode
```sh
node --watch tests.test.js
```

<br/>

## More about Science

### Tests or suites with `.skip` will not be executed
- `test.skip`
  ```ts
  await Science.run({

	  //           skipping this test
	  //                    👇
	  "addition works": test.skip(async() => {
		  expect(1 + 1).is(2)
	  }),
  })
  ```
- `suite.skip`
  ```ts
  "more tests": suite.skip({
  ```

### Tests or suites with `.only` will prioritized
- if *any* tests or suites are encountered with `.only`, then no other tests will be executed
- `test.only`
  ```ts
	"addition works": test.only(async() => {
  ```
- `suite.only`
  ```ts
  "more tests": suite.only({
  ```

### Plain syntax is permitted
- suites can actually be plain objects and async functions, like this:
  ```ts
  await Science.run({

    // plain async fn
    // 👇
    async "addition works"() {
      expect(1 + 1).is(2)
    },

    async "subtraction works"() {
      expect(2 - 1).gt(0)
    },

    // plain old javascript object
    //           👇
    "more tests": {
      async "string tests"() {
        expect("hello" + " " + "world").is("hello world")
      },

      async "array tests"() {
        const items = [1, 2, 3]
        items.pop()
        expect(items.length).not.is(3)
      },
    },
  })
  ```
- but then, the downside is that you can't easily attach `.skip` or `.only`
- so that's the only reason we like to wrap the fns with `test(fn)` and the objects with `suite(obj)`, just as an ergonomic handle for slapping on those `.skip` and `.only` calls

<br/>

## Assertions and expectations

### Basic ways to fail a test case

- return false
  ```ts
  "addition works": test(async() => {
    return false
  }),
  ```
- throw a string
  ```ts
  "addition works": test(async() => {
    throw "universe is broken"
  }),
  ```
- throw an error
  ```ts
  "addition works": test(async() => {
    throw new Error("universe is broken")
  }),
  ```

### Expectations

#### Basic expectations
- simple expectation
  ```ts
  "addition works": test(async() => {

     // "is" to check === equality
     //          👇
    expect(1 + 1).is(2)
  }),
  ```
- expectation with a custom message
  ```ts
  expect(1 + 1, "universe is broken").is(2)
  ```
- greater than, less than
  ```ts
  expect(1 + 1).gt(1)
  expect(1 + 1).lt(3)
  expect(1 + 1).gte(2)
  expect(1 + 1).lte(2)
  ```
- other handy stuff
  ```ts
  expect(1 + 1).isnt(3)
  ```
- expecting a function will throw
  ```ts
  expect(() => {throw "lol"}).throws()
  ```
- expecting an async function will throw
  ```ts
  await expect(async() => {throw "lol"}).throwsAsync()
  ```

#### You can use `.not` on all expectations
- not is
  ```ts
  expect(1 + 1).not.is(3)
  ```
- not isnt (you're a psycho)
  ```ts
  expect(1 + 1).not.isnt(2)
  ```
- not throws
  ```ts
  expect(() => {throw "lol"}).not.throws()
  ```
- i think you get the idea

