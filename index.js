const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');

var serviceAccount = require("./jobshop-button-firebase-adminsdk-fbsvc-5efa19629f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://console.firebase.google.com/project/jobshop-button/firestore/databases/-default-/data"
});

const db = admin.firestore();

const app = express();
app.use(bodyParser.json());

app.post('/', async (req, res) => {

    try {

        const _data = req.body;

        if (!_data || Object.keys(_data).length == 0)
            return res.status(400).send( { message: "No data provided" } );

        const data = {

            time: new Date()
        };
        console.log(data);

        const docRef = await db.collection('PAX-JS').doc(`${_data['test']}`.padStart(4, '0')).set(data);
        res.status(200).send( { message: "Data stored successfully", id: docRef.id } );
    }
    
    catch (error) {

        console.error("Error storing data:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`)
});
