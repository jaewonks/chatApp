const express = require('express')
const app = express()
const bodyPaser = require('body-parser')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config/key')

app.use(bodyPaser.urlencoded({extended: true}))
app.use(bodyPaser.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Landing Page')
})
//DB연결
mongoose.connect(
    config.mongoURI,{
        useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
    }).then(() => {console.log('connect to MongoDB')})
      .catch(err => console.log(err))

app.use(cors())


app.use('/api/users', require('./routes/users'));

/* //use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
} */

app.listen(port,() => {
    console.log(`Listening on port ${port}`)
})