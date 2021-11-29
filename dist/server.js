"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
let app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.json("Hello World!");
});
dotenv_1.default.config({ path: './.env' });
app.listen(process.env.PORT, () => {
    console.log('The application is listening on port ' + process.env.PORT + '!');
});
