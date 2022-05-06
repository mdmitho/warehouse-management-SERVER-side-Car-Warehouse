const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const res = require('express/lib/response');
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

app.get('/carcollection',async(req,res)=>{
    const query ={}
    const cursor = carCollection.find(query)
    const car = await cursor.toArray();
    res.send(car)
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