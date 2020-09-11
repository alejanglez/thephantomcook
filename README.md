# Project Name

The Foodie Phantom

# Description - MVP

Eat well close to your door.

## User Stories

404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
homepage - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
USER
sign up - As a user I want to sign up on the webpage so that I can see all the menus that I could order
login - As a user I want to be able to log in on the webpage so that I can get back to my account and orders
logout - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
PHAMTOM COOK
sign up - As a cook I want to sign up on the webpage so that I can see all the menus and orders that I could attend
login - As a user I want to be able to log in on the webpage so that I can get back to my account
logout - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

menu list - As a user I want to see all the events available so that I can choose which ones I want to attend
menu create - As a user I want to create an event so that I can invite others to attend
menu detail - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend
menu confirm - As a user I want to be able to attend to event so that the organizers can count me in

User profile:
see my profile
upload my profile picture
list of Orders confirmed
list of Orders created by the user

Cook profile:
see my profile
upload my profile picture
list of Orders confirmed
list of Menus created by the cook

# Backlog

Delivery, Payment,rating and comments
Geo Location:
add geolocation to cooks when creating
show cooks & menus in a map in event detail page

# ROUTES - STRUCTURE

1 Bin
├── bin - www
2 Models
├── user
├── cooks
├── menu
├── orders
3 Configs
├── db.config.js
├── session.config.js
├── cloudinary.config.js
4 -Routes
├── auth.routes.js
├── index.js
├── menu.js
├── orders.js
├── confirmed.order.js

5 views
├── userAuth
│ ├── userLogin.hbs
│ └── userSignup.hbs
├── cookAuth
│ ├── cookLogin.hbs
│ └── cookSignup.hbs
├── error.hbs
├── index.hbs
├── layout.hbs
├── not-found.hbs
└── users
└── userProfile.hbs
└── (menu display)main.hbs
└── (confirmed order) private1.hbs

└── cooks
└── cookProfile.hbs
└── (menu post) main.hbs
└── (confirmed order) private2.hbs

5 .env
6 .gitingnore
7 app.js
8 pacage.json
9 readme.md

# models

User model
new Schema ({
\_id: ,
username: String, required: true,
email: String, required: true,
password: String, minlength: 6, maxlength: 12,
fullName: String, required: true, maxlength: 20,
birthday: Date,
zipcode: Number, required: true, maxlength: 30,
address: String, required: true, maxlength: 30,
phone: String, required: true, minlength: 9, maxlength: 9,
})

Cook model
new Schema ({
\_id: ,
username: String, required: true,
email: String, required: true,
password: String, minlength: 6, maxlength: 12,
fullName: String, required: true, maxlength: 20,
birthday: Date,
zipcode: Number, required: true, maxlength: 30,
address: String, required: true, maxlength: 30,
phone: String, required: true, minlength: 9, maxlength: 9,
motivation: String, required: true,
professional certification{ yes, no}
foodhHandlingNumber: Number, required: true, minlength: 9, maxlength: 9,
kitchenNumber: Number, required: true, minlength: 9, maxlength: 9,
Status:option{ green, red}
})

Menu model
new Schema ({
\_id: ,
menuOwnerRef: [{ type: Schema.Types.ObjectId, ref: "Cook" }],
menuOwnerRef: cook.\_id,
title: String, required: true,
Desciption: String, required: true,
Image: String Url, required: true,
price: Number, required: true,
})

order model
new Schema ({
\_id: ,
menuOwnerRef: cook.\_id,
menuRef: menu.\_id,
userRef: user.\_id,
dayOrdered: Number, required: true,
Quantity: Number, required: true,
})

## Links

[Trello Link](https://trello.com/b/Hu1J0K0k/foodie-phantom)

### Git

[Repository Link](https://github.com/alejanglez)

[Deploy Link]()

### Slides

[Google Slides Link]()

### Frames

[Repository Link](https://marvelapp.com/prototype/4f55igj)
