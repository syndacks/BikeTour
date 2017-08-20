# BikeTour
[live demo](https://glacial-journey-12477.herokuapp.com)

## Introduction

I love riding my bicycle. Better yet, I love riding my bicycle long distances and connecting with random strangers who host long distance cyclists like me. In the spring of 2015, I rode from Los Angeles to Brooklyn. Along the 4,000 mile journey I stayed with some really interesting people.

BikeTour is a place for bicycle tourists to post a review of the hostground they stayed at and share their stories from the road.

## Technologies Used
### Front-End:

- HTML5
- CSS3/Bootstrap
- JavaScript

### Back-End:

- Node
- Express
- REST
- MongoDB
- Mongoose
  - one to many relational data between comments and users
- isLoggedIn Middleware
- Passport user authentication
- Google Maps API
- Deployment: Heroku

## Directory structure
##### app.js
- The main entry point for the Application: npm modules, db init, various app settings.
##### middleware/
- An exported middlewareObj with various functions, such as ensuring user privileges to edit a hostground.
For more on Express middleware, see: http://expressjs.com/en/guide/using-middleware.html
##### models/
- Database models for comments, hostrgrounds, and users. The comment model is where the "one to many" data association is made between comments and users.
##### public/
- Images, CSS, and one Js function :)
##### routes/
- RESTful routes for CRUD API.
- REpresentationalStateTransfer routes for CreateReadUpdateDestroy ApplicationProgrammingInterface :))
##### views/
- Rendered HTML views using EJS template engine.


## How It Works
First create an account (handled by Passport). If you do not create an account, you cannot post hostground reviews or comments, but you can still browse Hostgrounds.

1. Add new Hostground - include name, description, coordinates.
2. Edit Hostgrounds
2. Leave comments on other people's Hostgrounds.

## Desired Improvements
There are many things I'd like to improve on. This list is largely to keep track of my own thoughts, but if you have suggestions please let me know.

1. Fix the blip at the beginning of the website load. This could be fixed immediately by using lower res photos...
2. Create "Stories" so users can upload their trip as opposed to one hostground.
