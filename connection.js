// const { MongoClient } = require('mongodb');

// const dotenv = require("dotenv");

// dotenv.config();
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
// const url = process.env.MONGODB_URL;
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'myProject';

// async function postDataToMongo() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection('todos');

//     const filter = {
//         "title": "first task"
//     };

//     // let dataFromMongo = await collection.findOne(filter);

//     // console.log(dataFromMongo);

//     let dataFromMongo = await collection.find().toArray();

//     console.log(dataFromMongo);

//     // let sendDataToMongo = await collection.insertOne({
//     //     "title": "third task",
//     //     "status": "not done"
//     // });

//     // console.log(sendDataToMongo);

//     // the following code examples can be pasted here...

//     return 'done.';
// }

// postDataToMongo()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then((db) => {
    console.log('Connected MONGODB');
}).catch((error) => console.log('Not Connected', error));

const Todo = require("./models/users_model");