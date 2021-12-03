import express from 'express';
import dotenv from 'dotenv';
import { router as pw } from './api/routes/passwords';

const app = express();

app.use(express.json());
app.use('/passwords', pw);

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}!`);
});
