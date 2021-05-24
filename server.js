const express = require('express'); // Setting up express server
const app = express();
const port =  process.env.port || 3000;
app.use(express.urlencoded({ extended: true })); // Sets up data parsing
app.use(express.json());

app.use(express.static('public')) // Serves static style sheets

app.get('/', (req, res) => { // Route to index.html
    res.sendFile(__dirname + '/public' + '/index.html')
})
app.get('/notes', (req, res) => { // Route to notes.html
    res.sendFile(__dirname + '/public' + '/notes.html')
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})