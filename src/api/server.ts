import express from 'express';
import dotenv from 'dotenv';



let app = express();

app.get('/', (req, res) => {
    
    res.json("Hello World!");
    
});



dotenv.config({ path: './.env' });

app.listen(process.env.PORT, () => {
    console.log('The application is listening on port '+process.env.PORT+'!');
});
