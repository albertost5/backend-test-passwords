import express from 'express';
import dotenv from 'dotenv';
import { PasswordItemDTO } from './api/clients/PasswordCheck/model/passwordItemDTO';
import { PasswordErrorsDTO } from './api/clients/PasswordCheck/model/passwordErrorsDTO';
const config = require('config');


let app = express();

app.use(express.json());

app.post('/passwords', (req, res) => {

    let passwordItem = new PasswordItemDTO();
    passwordItem.password = req.body.password;

    let errorDTO = new PasswordErrorsDTO();
    errorDTO.errors = [];

    let arrRegEx = config.get('regex');
    
    for (let i = 0; i < arrRegEx.length; i++) {
        let element = arrRegEx[i];
        let regExObj = new RegExp(element.pattern);

        if (element.name != config.get('regex.2.name')) {
            if (!regExObj.test(passwordItem.password)) errorDTO.errors.push(element.message)
        } else {
            if (regExObj.test(passwordItem.password)) errorDTO.errors.push(element.message);
        }
    }

    errorDTO.errors.length > 0 ? res.status(400).json(errorDTO.errors) : res.status(204).json();

});

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
});
