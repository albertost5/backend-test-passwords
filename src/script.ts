/* eslint-disable no-console */
import mysql from 'mysql';
import dotenv from 'dotenv';
import http, { IncomingMessage } from 'http';
import { RequestOptions } from 'https';

dotenv.config({ path: './.env' });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

connection.query('SELECT password from passwords', (err, rows) => {
  if (err) throw err;
  const arrPasswords: string[] = [];
  // let objectsql;
  for (let i = 0; i < rows.length; i++) {
    arrPasswords.push(rows[i].password);
  }

  const postOptions: RequestOptions = {
    hostname: process.env.DB_HOST,
    port: process.env.PORT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    path: '/passwords',
  };

  arrPasswords.forEach((element) => {
    postCheckPassword(postOptions, element);
  });
});

connection.end();

// FUNCTIONS
function postCheckPassword(options: RequestOptions, passwordToCheck: string) {
  const body = JSON.stringify({
    password: passwordToCheck,
  });

  const request = http.request(options, (res: IncomingMessage) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk.toString('utf8');
    });

    res.on('end', () => {
      if (res.statusCode === 204) {
        console.log(`Status code: ${res.statusCode}. Password validated: ${passwordToCheck}`);
      } else if (res.statusCode === 400) {
        console.log(
          `Status code: ${res.statusCode}. Password not validated: ${passwordToCheck}. Errors: ${data}`,
        );
      }
    });
  });

  request.write(body);
  request.end();
}
