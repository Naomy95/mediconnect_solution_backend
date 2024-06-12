const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId; 
const bcrypt = require('bcrypt');           

const uri = `mongodb+srv://Hospital_Project:EuqASExlGld6YoTd@cluster0.kvzsn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();


const database = client.db('hospital_project');
const adminList = database.collection('admin');

exports.login= async(req,res)=>{
    const { username, password } = req.body;
    console.log(req.body)

  try {
    // Connect to MongoDB
    // Find admin by username
    const admin = await adminList.findOne({ username });
    console.log(admin)

    // If admin not found, respond with error
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    // If password doesn't match, respond with error
    if (!passwordMatch) {
      return res.status(401).json({ message: 'doesnt match' });
    }

    // If username and password are correct, respond with success message
    res.json({ message: 'Login successful' });

    // Close the connection
    client.close();
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error');
  }
}
