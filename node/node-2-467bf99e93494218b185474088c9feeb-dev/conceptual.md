### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
a JSON web token is a security measure that is cookie like and encoded with a secret key or "signature"
- What is the signature portion of the JWT?  What does it do?
the signature is a combination of the header,payload and secret key that is used to validate the token
- If a JWT is intercepted, can the attacker see what's inside the payload?
yes they can which is why it is important, not to store any sensitive information in a jwt
- How can you implement authentication with a JWT?  Describe how it works at a high level. once a user registers or logs in they will be sent given a token that verifies who they are through the data in the payload and signature validation. then with every subsequent request the token will be required to be given access.

- Compare and contrast unit, integration and end-to-end tests.
unit tests are for tesing single functions or methods. integration tests are better for testing how all the code and functions/methods work together, they can also test the database in connection with everything else. end to end tests are useful for testing from the perspective of a user.
- What is a mock? What are some things you would mock?
a mock is when you essentially "fake" a function by recreating it in a test enviroment. things you might mock
- What is continuous integration?
CI is a practice of continuously updating a central repository with new code changes. they must pass automated tests before being allowed into the repository
- What is an environment variable and what are they used for?
theyre user defined variable that are similar to flasks global. they can be used to store app secrets and configuration data
- What is TDD? What are some benefits and drawbacks?
Test Driven Development is the practice of writing test code before writing your code. your tests will fail, you then write the code to get it to pass and refactor it. it can be a method which increase the speed of whic you code because you already have an idea of what your code will be from the tests
- What is the value of using JSONSchema for validation?
its an extra layer of error handling with its error.stacks. it also allows you to control the data sent to your app more effectively
- What are some ways to decide which code to test?
security and necessity
- What does `RETURNING` do in SQL? When would you use it?
you would use a RETURNING in post put patch update and delete routes so that you get some information back when making a database query 
- What are some differences between Web Sockets and HTTP?
HTTP is a larger protocol that passes information back and forth. while a websocket is smaller and has a continuous connection, even after the data has been sent. so you can get constant updates without refreshing
- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?
I like them both so far but feel like I've done better code on the js/express side of things. but then again, I dont think anyone really reads this stuff. this course has made me feel let down and left behind.