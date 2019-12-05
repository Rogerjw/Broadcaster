[![Build Status](https://travis-ci.org/Rogerjw/Broadcaster.svg?branch=develop)](https://travis-ci.org/Rogerjw/Broadcaster)
[![Coverage Status](https://coveralls.io/repos/github/Rogerjw/Broadcaster/badge.svg?branch=develop)](https://coveralls.io/github/Rogerjw/Broadcaster?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/463e688211ef7beba673/maintainability)](https://codeclimate.com/github/Rogerjw/Broadcaster/maintainability)
# Broadcaster
Corruption is a huge bane to Africa’s development. African countries must develop novel and localized solutions that will curb this menace, hence the birth of Broadcaster. Broadcaster enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that need government intervention

### User Interface information

#### Frontend links

Home page
>[https://rogerjw.github.io/Broadcaster/ui/](https://rogerjw.github.io/Broadcaster/ui/)


Sign up page
>[https://rogerjw.github.io/Broadcaster/ui/html/signuppage.html](https://rogerjw.github.io/Broadcaster/ui/html/signuppage.html)


Sign in page
>[https://rogerjw.github.io/Broadcaster/ui/html/loginpage.html](https://rogerjw.github.io/Broadcaster/ui/html/loginpage.html)

Services page
>[https://rogerjw.github.io/Broadcaster/ui/html/servicespage.html?thelist=citizen&theinput=citizen](https://rogerjw.github.io/Broadcaster/ui/html/servicespage.html?thelist=citizen&theinput=citizen)


Admin page
>[https://rogerjw.github.io/Broadcaster/ui/html/adminPage.html?thelist=admin&theinput=admin](https://rogerjw.github.io/Broadcaster/ui/html/adminPage.html?thelist=admin&theinput=admin)


User page
>[https://rogerjw.github.io/Broadcaster/ui/html/userPage.html](https://rogerjw.github.io/Broadcaster/ui/html/userPage.html)

News page
>[https://rogerjw.github.io/Broadcaster/ui/html/newspage.html](https://rogerjw.github.io/Broadcaster/ui/html/newspage.html)

#### Frontend tools
- HTML
- CSS
- Javascript

### Broadcaster Available endpoints
|     URL     |     HTTP Methods     |     Description     |
| ----------- | -------------------- | ------------------- |
|/api/v1/auth/signup | POST | Create a user account |
|/api/v1/auth/signin |POST  | Login a user |
|/api/v1/redflags|POST| Create a redflag|
|/api/v1/redflags/:id/comment|PATCH|Update a redflag comment)|
|/api/v1/redflags/:id/location|PATCH|Update a specific red-flag location|
|/api/v1/redflags/:id|DELETE|Delete a specific red-flag |
|/api/v1/redflags|GET|Get all Redflags|
|/api/v1/redflags/:id|GET|View a specific Redflag|




### Backend Tools used
 - Server side Framework: [Node/Express](https://expressjs.com/)
 - Linting Library: [ESLint](https://eslint.org/)
 - Style Guide: [Airbnb](https://github.com/airbnb/javascript)
 - Testing Framework: [Mocha](https://mochajs.org/)

#### Host online
 - Github pages [here](https://rogerjw.github.io/Broadcaster/ui/)
 - Heroku [here](https://broadcaster-rogerjw.herokuapp.com/)
 - PivotalTracker project [here](https://www.pivotaltracker.com/n/projects/2408936)


## Getting started with Application
Broadcaster is a public repository, you can clone it anywhere on your local machines to get started. Use vscode to run the project.

### Prequesite for project
- Text Editor [Microsoft Visual studio code](https://code.visualstudio.com/)
- Nodejs [environment](https://nodejs.org/en/)
- Postman API [development](https://www.getpostman.com/)
- Github bash [terminal](https://git-scm.com/downloads) 

### Installation
- visit the repository on [github](https://github.com/Rogerjw/Broadcaster)
- clone the repository in terminal

### Start Application
update packages by installing dependencies
 >npm install or npm i

start local server of application on `PORT 5000`
>npm run dev

### API URL
Now, to run your app locally and access resources, we will have to use the  endpoint URL below as an illustration.
` Example http://localhost:5000/api/v1/auth/signup `
> http://localhost:5000/api/v1/ 
or
https://broadcaster-rogerjw.herokuapp.com/api/v1/auth/signup
### Test App
The app is designed with Test Driven Development(TDD). To see how it works, run the command below in your terminal.
>npm test

### API Documentation
download postman, and paste in the API URL and the endpoints as you want.
or hit this link to get a static snapshot of my API collection.
https://www.getpostman.com/collections/a340a3bf653bdad8825c

### Feedback
- Any found issue, raise it on [github](https://github.com/Rogerjw/Broadcaster/issues)

### Version
- The Broadcaster is `v1`

### License
- issued by **Muhire Roger**
- free open source
