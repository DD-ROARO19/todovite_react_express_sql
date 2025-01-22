const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config(); 

const app = express() 

// Middleware 
app.use(cors()); 
app.use(express.json()); 

//rutes 
const userRoutes = require('./routes/userRoutes'); 
app.use('/api/users', userRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Servidor Corriende en el puerto ${PORT}`)
});