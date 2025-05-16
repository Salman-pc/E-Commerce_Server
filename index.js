require('dotenv').config()
const express = require('express');
const cors = require('cors');
const router = require('./Router/router')
require('./Db/dbconnection')

const app = express();
app.use(cors());
app.use(express.json());
app.use(router)
app.use('/uploads',express.static('./uploads'))

app.get('/',(req,res)=>{
    res.status(200).send("the server is running")
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});