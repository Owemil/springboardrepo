- BUG #1: bankly/middleware/auth.js authUser doesnt verify token but simply decodes them, opening up security risks. updated method and made test
  
- BUG #2: bankly/routes/users.js router.patch takes middleware requireAdmin which stops user from updating self by sending unauthorized error. made new middleware and updated route/tests
  
- BUG #3:by fixing BUG #2, BUG #3 showed up in the form of allowing users to update unallowed fields. Big security issue in being able to update admin to true. adding schema to rectify/ updating test
  
- BUG #4: bcrypt work factor and secret key were moved to a .env file so they stay hidden/secret when-ever/where-ever it is pushed to a repo.

- BUG #5: in ther User model the register method had a query with a returning statement that included the password but not passing it to anything. removed password from it incase its somehow accessed by the wrong person

- BUG #6: register route returning slightly-wrong information. updated route and fixed tests