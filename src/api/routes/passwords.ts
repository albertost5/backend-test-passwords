import express from 'express';
import { PasswordItemDTO } from '../clients/PasswordCheck/model/passwordItemDTO';
import { PasswordErrorsDTO } from '../clients/PasswordCheck/model/passwordErrorsDTO';
import { Rule } from '../../models/rule';

const config = require('config');

const router = express.Router();

router.post('/', (req, res) => {
  const passwordItem = new PasswordItemDTO();
  passwordItem.password = req.body.password;

  const errorDto = new PasswordErrorsDTO();
  errorDto.errors = [];

  const rule = new Rule();
  rule.rules = config.get('regex');

  rule.rules.forEach((e) => {
    const regExObject = new RegExp(e.pattern);

    if (e.name !== config.get('regex.2.name')) {
      if (!regExObject.test(passwordItem.password)) {
        errorDto.errors.push(e.message);
      }
    } else if (regExObject.test(passwordItem.password)) {
      errorDto.errors.push(e.message);
    }
  });

  // eslint-disable-next-line no-unused-expressions
  errorDto.errors.length > 0 ? res.status(400).json(errorDto.errors) : res.status(204).json();
});

export { router };
