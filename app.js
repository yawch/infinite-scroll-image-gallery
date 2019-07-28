const express = require('express');
const config = require('config');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

(async () => {
    const client = await MongoClient.connect(config.get('MongoURI'), { useNewUrlParser: true });
    const db = client.db('images');
    const urls = db.collection('urls');

    //const res = await fetch(`https://api.unsplash.com/photos/?client_id=${config.get('unsplash_client_id')}`)
    //const data = await res.json()
    //urls.insertMany(data.map((item) => ({ url: item.urls.small })));

    app.get('/', (req, res) => {
        res.sendFile(`${__dirname}/pages/index.html`);
    });

    app.get('/api/getRandomImageUrl', async (req, res) => {
        try {
            const url = await urls.aggregate([ { $sample: { size: 1 } } ]).toArray();
            res.status(200).json({ success: true, url: url[0].url });
        } catch (err) {
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
            res.status(500).json({ success: false, reason: 'MongoDB Connect Fail', err });
        }
    });

    app.listen(3000, () => console.log('app listening on port 3000'));
})();
