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
    postCheckPassword(postOptions, element, connection);
  });
});

// connection.end();

// FUNCTIONS
function postCheckPassword(
  options: RequestOptions,
  passwordToCheck: string,
  conn: mysql.Connection,
) {
  const body = JSON.stringify({
    password: passwordToCheck,
  });

  const request = http.request(options, (res: IncomingMessage) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk.toString('utf8');
    });

    res.on('end', () => {
      let updateValidValue = `UPDATE passwords SET valid = 1 WHERE password = "${passwordToCheck}"`;
      let message = `Status code: ${res.statusCode}. \n Password validated: ${passwordToCheck}. \n Changed valid value to 0.`;

      if (res.statusCode === 400) {
        updateValidValue = `UPDATE passwords SET valid = 0 WHERE password = "${passwordToCheck}"`;
        message = `Status code: ${res.statusCode}. \n Password not validated: ${passwordToCheck}. \n Errors: ${data} \n Changed valid value to 0.`;
      }

      conn.query(updateValidValue, (err, result) => {
        if (err) throw err;
        console.log(message);
      });
    });
  });

  request.write(body);
  request.end();
}
