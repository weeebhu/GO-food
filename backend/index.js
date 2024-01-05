const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000
const mongoDB = require("./db")
const { mongo } = require('mongoose')

mongoDB()

app.use((req, res, next)=>{    
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept"    
    );
    next();
})


/*
    CORS (Cross-Origin Resource Sharing) issue. 
    Browsers enforce CORS as a security measure to prevent cross-origin requests that could be potentially harmful. 
    This issue arises when your frontend application running at http://localhost:3000 tries to access an API hosted on http://localhost:5000 and 
    the server doesn't allow this request due to missing or inadequate CORS headers.
*/
// Enable all CORS requests 
app.use(cors());

// Or specify options for CORS
// Replace 'http://localhost:3000' with our frontend url
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}));

app.use(express.json())
app.use('/api/', require("./Routes/CreateUser"));
app.use('/api/', require("./Routes/DisplayData"));
app.use('/api/', require("./Routes/OrderData"));
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`app is listing on port ${port}`)
}) 

