const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;            

const uri = `mongodb+srv://Hospital_Project:EuqASExlGld6YoTd@cluster0.kvzsn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();


const database = client.db('hospital_project');
const nursesCollection = database.collection('nurses_list');


exports.read = async (req, res) => { 
    const cursor = nursesCollection.find({});
    const users = await cursor.toArray();
    res.setHeader('Access-Control-Allow-Origin','*')
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);
    res.send(users);
}

exports.create = async (req, res) => { 
    try {
        const doctor = req.body;
        const result = await nursesCollection.insertOne(doctor);
        res.json(result);
    } catch(err){
        console.log(err)
        res.status(400).json({
            err:err.message
        })
    }
};

exports.update= async (req, res) => {
    const user = req.body;
    const userId = user.nurse_id
    console.log(user)
   
    try {
        const result = await nursesCollection.findOneAndUpdate(
            { nurse_id: userId },  // Match the document with the doctor_id
            { $set: user },    // Set the new data
            { returnOriginal: false } // Return the updated document
        );
        res.json(result)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }


    console.log(user)
}

exports.remove= async (req, res) => {
    const user = req.params.nurseId;
    const filter={_id: new ObjectId(user)}
    console.log(filter)
   
    try {
        const result = await nursesCollection.deleteOne(filter);
        res.json(result)
        // console.log(result)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }


    // console.log(user)
}
