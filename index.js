const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object

// Create a Model object

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const URL = req.body.myuri
  // "mongodb+srv://user1:user1@cluster0.jw9cuev.mongodb.net/Summer24"
  // connect to the database and log the connection
  mongoose.connect( URL, {useNewUrlParser: true, useUnifiedTopology: true,})
        .then(()=>{
            console.log('connected to MongoDB')
            app.listen(port,()=>{
                console.log('server is running out of port '+port)
            });
        })
        .catch((err)=>{
            console.log(err)
        });

  // add the data to the database
  const mySchema = new mongoose.Schema({
    myName: {type:String, required: true},
    mySID: {type:String, required: true},
  });

  const Student = mongoose.model("s24students", mySchema);
  const name ="Jessica"
  const sid = "300365380"
  const newStudent = new Student({
    name,sid,
  });


  newStudent.save()
            .then(()=>{res.json("Student added")})
            .catch((err)=>{res.status(400).json('error:'+err)})

  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
