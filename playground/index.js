const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors({ origin: '*' }));
const secret = 'this-is-totally-production-ready';

app.post('/login', (req, res) => {
    const access_token = jwt.sign({}, secret);
    console.log({message: 'user is logging in', username: req.body.username, password: req.body.password});
    res.status(200).json({ access_token });
});

app.all('/', (req, res) => {
    const { method, headers, query, body } = req;
    console.log("=".repeat(80));
    console.log("GOT A REQUEST");
    console.log("-".repeat(80));
    console.log(JSON.stringify({ method, headers, query, body }, null, 2));
    res.json({
        method: req.method,
        headers: req.headers,
        query: req.query,
        body: req.body,
    });
});

const PORT = 3099;
app.listen(PORT, () => {
    console.log(`I'm a little server that echoes back requests.
ECHO ECHO echo echo .... cho ... cho ... ooo

Simply send requests to "http://localhost:${PORT}".`);
});
