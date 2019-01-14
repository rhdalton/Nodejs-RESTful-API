# Nodejs RESTful API Example

This is a RESTful API created with Node.js to demonstrate various techniques and coding practices.
App that catalogs movies and people with access by registered users.

Features Include:
- Express web application framework
- MongoDB backend
- Handle standard HTTP GET, POST, PUT, DELETE requests
- User authentication and authorization for access to certain endpoints (POST, PUT, DELETE)
- Error logging, Uncaught Exception and Promise handling and logging
- Unit and Integration Testing for endpoints

Route Endpoints:
- /api/movies 
  - get, create, edit, delete movies in a collection
- /api/people 
  - db of actors, directors, writers ect associated with movies collection
- /api/users
  - users with various permissions to access, create, delete movies/people collections
- /api/genres
  - movie genres db associated with movies collection
- /api/auth
  - user login authentication endpoints
