import * as emailValidator from 'email-validator';

const usernameRegExp = RegExp(/^(?=.*[A-Za-z])(?!([-]|[.]|[_]))(?!.*[_.-]{2,})[A-Za-z0-9_.-]+\b(?!([-]|[.]|[_])){3,30}$/);
const passwordRegExp = RegExp(/^(?=.*[@$!%*?&#^\-_\\|()[\]:;<>±§?/])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9@$!%*?&#^\-_\\|()[\]:;<>±§?/]{8,}$/);

export const validate = values => {
	const errors = {}

	if (!emailValidator.validate(values.identifier)) {
		if (!usernameRegExp.test(values.identifier) || values.identifier === undefined) {
			errors.identifier = 'Enter a valid username or email';
		}
	}

	if (!passwordRegExp.test(values.password)) {
		errors.password = 'Invalid password';
	}

	return errors;
}