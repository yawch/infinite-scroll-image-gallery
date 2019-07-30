const express = require('express');
const config = require('config');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();

const { logError } = require('./utils');

app.use(express.static('public'));
app.use(bodyParser.json());

(async () => {
    let client;
    try {
        client = await MongoClient.connect(config.get('MongoURI'), { useNewUrlParser: true });
    } catch (err) {
        logError('Error connecting to MongoDB Altas Database', err);
        return;
    }
    const db = client.db('images');
    const urls = db.collection('urls');

    app.get('/api/getRandomImageUrl', async (req, res) => {
        try {
            const url = await urls.aggregate([ { $sample: { size: 1 } } ]).toArray();
            res.status(200).json({ success: true, url: url[0].url });
        } catch (err) {
            logError('Error retrieving document from MongoDB Atlas Database', err);
            res.status(500).json({ success: false, reason: 'MongoDB Connect Fail' });
        }
    });

    app.post('/api/addImageUrl', async (req, res) => {
        if (!req.body.url) {
            res.status(400).json({ success: false, reason: 'Missing Request Information' });
            return;
        }
        try {
            await urls.insertOne({
                url: req.body.url
            });
            res.status(200).json({ success: true });
        } catch (err) {
            logError('Error inserting document into MongoDB Atlas Database', err);
            res.status(500).json({ success: false, reason: 'MongoDB Connect Fail' });
        }
    });

    app.listen(3000, () => console.log('app listening on port 3000'));
})();
