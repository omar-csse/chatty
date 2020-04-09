import * as emailValidator from 'email-validator';
import { usernameRegExp, passwordRegExp } from '../Regexp.js'

export const validate = values => {
	const errors = {}

    if (!usernameRegExp.test(values.username) || values.username === undefined) {
        errors.username = 'invalid username';
    }
	if (!emailValidator.validate(values.email)) {
        errors.email = 'Please, enter a valid email';
    }
	if (!passwordRegExp.test(values.password)) {
		errors.password = 'password must contain (A,a,digit, special char) and be > 8';
	}

	return errors;
}