# Project-Grouper

install node.js on your machine

run 'npm install' before working on the project, this installs all the needed dependencies in package.json

server folder contains the file 'app.js' this where we take care of http requests coming from the user.

(home,student,teacher) folders where the page is designed ,feel free to make separate HTML,CSS,JS folders

This project contains the following npm packages:

- express: which is the server that receives http requests https://expressjs.com/
- mongoose: mongodb object modeling for node.js https://mongoosejs.com/
- ejs: Embedded JavaScript Templating, Enables integrating javascript into html https://ejs.co/
- ejs-mate: For layouts and partials, reduces code duplication https://www.npmjs.com/package/ejs-mate
- method-override: Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it https://www.npmjs.com/package/method-override
- Joi: Data validator for JavaScript, Works well with mongo https://www.npmjs.com/package/joi

all can be installed by "npm i 'package-name' "

node_modules is a folder for npm "Do Not Touch".

.ejs files behave exactly like .html files
