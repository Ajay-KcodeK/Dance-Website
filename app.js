const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;

//Define mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
});

const Contact = mongoose.model('Contact', contactSchema);


// app.use(express.static('static', options))
//Express Specific stuff
app.use('/static',express.static('static')) //For serving static files
app.use(express.urlencoded())

// Pug specific stuff
app.set('view engine', 'pug') //Set the templete engine as pug
app.set('views',path.join(__dirname, 'views')) //Set the views directory

//Endpoints
app.get('/', (req,res)=>{
  const params = {};
  res.status(200).render('home.pug',params);
});

app.get('/contact', (req,res)=>{
  const params = {};
  res.status(200).render('contact.pug',params);
});

app.post('/contact', (req,res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.send("This item has been save to database")
  }).catch(()=>{
    res.status(400).send("Item was not saved to the datdabase")
  });
  // res.status(200).render('contact.pug');
});

// Start the server
app.listen(port, ()=>{
  console.log(`The applicsation successfully on port ${port}`);
})