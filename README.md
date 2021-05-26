[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Note Taker

The application uses an Express.js back-end to store and retrieve notes in a JSON file.
Saved notes will be retrieved from the database and appended to the side nav for the user to view or delete.

### Link to deployed application

https://note-taker-micheqn3.herokuapp.com/

### Installing locally

1. Make sure you have Node.js to run the application
2. Clone this repo
> HTTPS: `https://github.com/micheqn3/note-taker.git` <br>
> SSH: `git@github.com:micheqn3/note-taker.git`
3. Install the NPM packages
> npm install
4. Start up the server in the command line 
> node server.js
5. Open the application in your browser as it is hosted locally
> http://localhost:3000

### This repository contains: 
- server.js - This file sets up get, post, and delete requests using Express and updates the database accordingly.
- public/Assets/js/index.js - This file handles AJAX requests from the client side and renders saved notes to the side nav.
- db/db.json - This JSON file will keep track of saved notes.
- public/Assets/css/ styles. css - Style sheet.


### Technologies/Languages used: 

  - JavaScript
  - Node.js 
  - Express
  - Nodemon
  - Uniqid

### Screenshot of pages

Home page
:-------------------------:
![Home page](/Assets/home-page-screenshot.png)

Notes page
:-------------------------:
![Notes page](/Assets/notes-page-screenshot.png)

### License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MIT 
