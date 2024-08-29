### Conceptual Exercise

////////////////////////////////
Answer the following questions below:

- What is React? When and why would you use it?
  it is a powerful front-end framework. You would use it when you want to make a modular application with HTML
- What is Babel?
  it is a compiler that converts modern javascript into versions that are compatible wiht older browsers
- What is JSX?
  a syntax extension for javascript that essentially embeds html into js
- How is a Component created in React?

- What are some difference between state and props?
  State hold a variable, data structure or a primitive in a constant state through rerenders of components. props or properties are variables or functions passed to components to eb used in the rendering or data
- What does "downward data flow" refer to in React?
  that all data must flow down form the parent component. it can not flow back up
- What is a controlled component?
  it is a form element that is controlled by React state
- What is an uncontrolled component?
  a form element that manages its own state internally
- What is the purpose of the `key` prop when rendering a list of components? to give a unique id to each component rendered so that react can keep track of them

- Why is using an array index a poor choice for a `key` prop when rendering a list of components? it can cause performance problems or bugs

- Describe useEffect. What use cases is it used for in React components?
  it is a built in hook for "side effects". it allows you to control when certain codes runs dependent on what is re-rendering. some use cases are fetching data, timers, manually changing the DOM
- What does useRef do? Does a change to a ref value cause a rerender of a component? it allows objects to persist through renders. mutating the object does not trigger a re-render

- When would you use a ref? When wouldn't you use one?
  When manipulation the state of a DOM element or setting/clearing timers. you wouldnt want to use one to make changes to the DOM
- What is a custom hook in React? When would you want to write one?
  it is a hook you write yourself in a seperate file. you would want to write one when you have a lot of reused logic in your app
