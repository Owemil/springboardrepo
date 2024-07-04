### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  by chaining callbacks or using a promise
- What is a Promise?
  a prosmise is a one-time guarantee of a future value that can be in one of three states. pending, resolved, rejected
- What are the differences between an async function and a regular function?
  async functions always return a promise and can run alongside regular functions
- What is the difference between Node.js and Express.js?
  node is ther server enviroment and express is a framework built on-top of node
- What is the error-first callback pattern?
  when a callback function has a first argument of an err
- What is middleware?
  It is code that runs in the middle of the request / response cycle
- What does the `next` function do?
  it sends you to the next function regardless of what the current function is doing
- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
  you could change the three seperate get requests into one iterable of an array that is grabbed/made or passed in as an argument. You could use promise.all/allsettled to get all promises back at the same time. It could be made more dynamic by adding template literals.

```js
async function getUsers() {
  const elie = await $.getJSON("https://api.github.com/users/elie");
  const joel = await $.getJSON("https://api.github.com/users/joelburton");
  const matt = await $.getJSON("https://api.github.com/users/mmmaaatttttt");

  return [elie, matt, joel];
}
```
