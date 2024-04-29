### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript? -syntax, readability

- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing. - .get('c', 'not found')/ .setdefault('c', 'not found')

- What is a unit test? -a test of an individual function

- What is an integration test? -a test of how/if parts of the whole work together

- What is the role of web application framework, like Flask? Flask and other frameworks help organize a web application into routes while also allowing us to start a server and accept GET\POST requests.



- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?
  you might choose one over the other based on data needs. do you want something to run predefined code or do you want to pass information from the page to the server
- How do you collect data from a URL placeholder parameter using Flask?
request.args
- How do you collect data from the query string using Flask?
request.url
- How do you collect data from the body of the request using Flask?
request.get_data
- What is a cookie and what kinds of things are they commonly used for?
a cookie is a small piece of information that is passed between the server and browser to remember things. one thing they might be used for is influencing what data is passed back based on what boxes were checked during and earlier form
- What is the session object in Flask?
a session is like a cookie but it has state where the cookie does not
- What does Flask's `jsonify()` do?
it takes a response you want to send and turns it into JSON