const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/pages/index.html`);
});

app.listen(3000, () => console.log('app listening on port 3000'));