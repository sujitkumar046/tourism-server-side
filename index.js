const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const ObjectID = require('mongodb').ObjectId


const app = express();

//Middleware

app.use (cors ())
app.use (express.json())

const port = process.env.PORT || 5000



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.63xhb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/* using async await */

async function run() {
    try {
      await client.connect();
      const tourPackages = client.db("tourpackages");
      const serviceCollection = tourPackages.collection("services");

 //Get all the services
      app.get ('/services', async (req,res) => {
          const coursor = serviceCollection.find({})
          const query = await coursor.toArray();
          res.send(query)
          console.log ('getting the data from server')

      }),

      //Get a single data
      app.get ('/services/:id', async (req,res) => {
            const id = req.params.id
            console.log ('getting ID')
            const query = {_id: ObjectID (id)}
            const result = await serviceCollection.findOne(query)
            res.json(result)
      })

    
      //Post a data upon submit

      app.post ('/services', async (req,res) => {
          const cursor = req.body 
          const result = await serviceCollection.insertOne(cursor);
          res.json (result)
      })



    
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get ('/', (req,res)=> {
    res.send ('server is creates successfully')
})

app.listen (port, () => {
    console.log ('running in port', port)
})
