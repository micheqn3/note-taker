const express = require('express'); // Setting up express server
const app = express();
const fs = require('fs'); // File system module
const uniqid = require('uniqid'); // Generates random ID number for notes
const port =  process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true })); // Sets up data parsing
app.use(express.json());
app.use(express.static('public')) // Serves static files in public folder
app.use(express.static('db')) 

app.get('/', (req, res) => { // Route to index.html
    res.sendFile(__dirname + '/public' + '/index.html')
})
app.get('/notes', (req, res) => { // Route to notes.html
    res.sendFile(__dirname + '/public' + '/notes.html')
})

app.get('/api/notes', (req, res) => { // Db of notes
   res.sendFile(__dirname + '/db' + '/db.json');
})

app.post('/api/notes', (req, res) => { // Handles post request for notes
    let obj = req.body;
    obj.id = uniqid(); // Generate random ID
    fs.readFile(__dirname + '/db' +'/db.json', 'utf-8', (error, data) => {
        if(error) {
            throw error;
        } else {
            let d = JSON.parse(data);
           d.push(obj);
           fs.writeFile(__dirname + '/db' + '/db.json', JSON.stringify(d), (error) => { // Update the database with the note
            if(error) {
                throw error;
            } else {
                console.log("Saved to database.")
            }
        })  
        }
    })
})

app.delete('/api/notes/:id', (req, res) => { // Handles deleting notes
    let id = req.params.id;

    fs.readFile(__dirname + '/db' + '/db.json', 'utf-8' , (error, data) => {
        if(error) {
            console.log("Something went wrong.")
        } else {
            let parsedData = JSON.parse(data);
            for (let i = 0 ; i < parsedData.length ; i++) { // Remove the array with the matching ID
                if(parsedData[i].id === id) {
                    parsedData.splice(i, 1);
                }
                console.log(data);
                fs.writeFile(__dirname + '/db' + '/db.json', JSON.stringify(parsedData), (error) => { // Write new array to database
                    if(error) {
                        throw error;
                    } else {
                        console.log("Deleted item.");
                    }
                })
            }
        }
    })
})
    
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})