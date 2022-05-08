const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');
// const res = require('express/lib/response');
require('dotenv').config()
const port = process.env.PORT || 4000
const app= express()

//middlewre

app.use(cors())
app.use(express.json())

 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s8nvw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
 await client.connect()
 const carCollection = client.db("carwarehouse").collection("carcollection");

 //AUTH




app.get('/carcollection',async(req,res)=>{
    const query ={}
    const cursor = carCollection.find(query)
    const result = await cursor.toArray();
    res.send(result)
})
  



app.delete('/carcollection/:id',async(req,res)=>{
    const id=req.params.id
    const query={_id:ObjectId(id)}
    
    const result = await carCollection.deleteOne(query)
    res.send(result)
})
app.get("/carcollection/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await carCollection.findOne(query);
  res.send(result);
});
app.post("/carcollection", async (req, res) => {
  const newUser = req.body; 
  const result = await carCollection.insertOne(newUser);
  res.send(result);
});
 

app.put("/carcollection/:id", async (req, res) => {
  const id = req.params.id;
  const updateUser = req.body;
  const filter = { _id: ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      quantity: updateUser.quantity, 
    },
  };
  const result = await carCollection.updateOne(filter, updateDoc, options);

  res.send(result);
});

  
}
finally{

}
 
}
run().catch(console.dir)


app.get('/',(req,res)=>{
res.send('auto mobail running')
})

app.listen(port,()=>{
    console.log('Auto Mobail running');
})