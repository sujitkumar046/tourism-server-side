const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express();

//Middleware

app.use (cors ())
app.use (express.json())

const port = process.env.PORT || 5000

app.get ('/', (req,res)=> {
    res.send ('server is creates successfully')
})

app.listen (port, () => {
    console.log ('running in port', port)
})
