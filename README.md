# Nodejs RESTful API Example

This is a RESTful API created with Node.js to demonstrate various coding techniques and practices.

This is an app that catalogs movies and people accessible by registered users with defined permissions.

**Features Include:**
- Express application framework
- MongoDB backend
- Handle standard HTTP GET, POST, PUT, DELETE requests
- User authentication and authorization for access to certain endpoints (POST, PUT, DELETE)
- Error logging, Uncaught Exception and Promise handling and logging
- Unit and Integration Testing for endpoints

**Route Endpoints:**
- /api/movies 
  - get, create, edit, delete movies in a collection
- /api/people 
  - collection of actors, directors, writers and others associated with movies
- /api/users
  - register new users with set permissions to access, create, delete movies/people collections
- /api/genres
  - movie genres collections associated with movies
- /api/auth
  - user login authentication endpoints
