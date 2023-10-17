const express=require("express");
 const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port= process.env.PORT || 5000;

app.use (cors());
app.use (express.json())

// mnur57750
// U2ThuSldCCzTSDo8



const uri = "mongodb+srv://mnur57750:U2ThuSldCCzTSDo8@cluster0.xtmekud.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

   const userCollaction=client.db('usersDB').collection("users")
   
    app.get('/users',async(req,res)=>{
      const cursor=userCollaction.find();
      const result=await cursor.toArray();
      res.send(result);
    })

    app.post('/users',async(req,res)=>{
        const user=req.body;
        console.log('new user',user)
       const result=await userCollaction.insertOne(user);
       res.send(result);
    })

    app.delete('/users/:id',async(req,res)=>{
      const id=req.params.id;
      const query= {_id: new ObjectId(id)};
      const result =await userCollaction.deleteOne(query)
      res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get ('/',(req,res)=>{
    res.send('simple curd server')
})

app.listen(port,()=>{
    console.log(`Simple curd is runing pot ,${port}`)
})