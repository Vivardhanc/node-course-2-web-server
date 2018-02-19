const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
      if(err){
        console.log('Unable to append to server.log.');
      }
    });
  next();
});

// app.use((req,res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('getLoggedInUser', () => {
  return "Vivardhan Coorapati";
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//http route handlers setting up
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Viv',
  //   likes: [
  //     'Volley Ball',
  //     'Exercise'
  //   ]
  // })
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: `Welcome to Viv's Home Page to view the organization details`,
    loggedInUser: 'Viv Coorapati'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    loggedInUser: 'Viv Coorapati'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
      errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000, use http://localhost:3000');
});
