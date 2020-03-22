import * as emailValidator from 'email-validator';

const usernameRegExp = RegExp(/^(?=.*[A-Za-z])(?!([-]|[.]|[_]))(?!.*[_.-]{2,})[A-Za-z0-9_.-]+\b(?!([-]|[.]|[_])){3,30}$/);
const passwordRegExp = RegExp(/^(?=.*[@$!%*?&#^\-_\\|()[\]:;<>±§?/])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9@$!%*?&#^\-_\\|()[\]:;<>±§?/]{8,}$/);

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