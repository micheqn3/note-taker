const express = require('express'); // Setting up express server
const app = express();
const fs = require('fs'); // File system module
const db = require('./db/db.json') // Importing database
const uniqid = require('uniqid'); // Generates random ID number for notes
const port =  process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true })); // Sets up data parsing
app.use(express.json());
app.use(express.static('public')) // Serves static files in public folder

app.get('/', (req, res) => { // Route to index.html
    res.sendFile(__dirname + '/public' + '/index.html')
})
app.get('/notes', (req, res) => { // Route to notes.html
    res.sendFile(__dirname + '/public' + '/notes.html')
})

app.get('/api/notes', (req, res) => { // Array of objects of notes
    //res.send(allNotes);
    // res.send([{"title": "hello", "text": "here is my text", "id": 322}]); // testing this right now
    /*
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        if (error) {
            console.log("Something went wrong.")
        } else {
            res.send(data); // send JSON file data
        }
    })
    */
   res.sendFile(__dirname + '/db' + '/db.json');
})

app.post('/api/notes', (req, res) => { // Handles post request for notes
    let obj = req.body;
    obj.id = uniqid(); 
    db.push(obj); 
    fs.writeFile('./db/db.json', JSON.stringify(db), (error) => { // Update the database with the note
        if(error) {
            throw error;
        } else {
            console.log("Saved to database.")
        }
    })    
})

app.delete('/api/notes/:id', (req, res) => { // Handles deleting notes
    let id = req.params.id;
    fs.readFile('./db/db.json', 'utf-8' , (error, data) => {
        if(error) {
            console.log("Something went wrong.")
        } else {
            let parsedData = JSON.parse(data);
            let newArray = [];
            for (let i = 0 ; i < parsedData.length ; i++) { // If the object's id is not equal to the parameter requested, save to new array
                if(parsedData[i].id !== id) { 
                    newArray.push(parsedData[i]);
                }
            }
            fs.writeFile('./db/db.json', JSON.stringify(newArray), (error, data) => { // Write new array to database
                if(error) {
                    throw error;
                } else {
                    console.log("Deleted item.")
                }
            })
        }
    })
})
    
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})