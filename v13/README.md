# BikeTour
[live demo](https://glacial-journey-12477.herokuapp.com)

##Introduction

I love riding my bicycle. Better yet, I love riding my bicycle long distances and connecting with random strangers who host long distance cyclists like me. In the spring of 2015, I rode from Los Angeles to Brooklyn over the course of 2.5 months. Along the 4,000 mile journey I stayed with some really interesting people.

BikeTour is a place for bicycle tourists to post a review of the hostground they stayed at and share their stories from the road.

##Technologies Used
Front End: 

- HTML5
- CSS3/Bootstrap
- Javascript

Back End:

- Node.js
- Express
- REST
- MongoDB
- Mongoose
- one to many relational data
- isLoggedIn Middleware
- Passport
- Google Maps API

##How It Works
First create an account (handled by passport-local). If you do not create an account, you cannot post hostground reviews or comments.

1. Add new hostground - include name, description, coordinates.
2. Edit hostgrounds
2. Leave comments on other people's hostgrounds.

##Desired Improvements
There are many things I'd like to improve on. This list is largely to keep track of my own thoughts, but if you have suggestions please let me know: [math.milliken@gmail.com](mailto:math.milliken@gmail.com)

1. Create "Stories" so users can upload their trip as opposed to one hostground.