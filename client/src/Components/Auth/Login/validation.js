import {usernameRegExp, passwordRegExp ,emailRegExp} from '../../../RegExp/RegExp';

export const validate = values => {
	const errors = {}

	if (!emailRegExp.test(values.identifier)) {
		if (!usernameRegExp.test(values.identifier) || values.identifier === undefined) {
			errors.identifier = 'Enter a valid username or email';
		}
	}

	if (!passwordRegExp.test(values.password)) {
		errors.password = 'Invalid password';
	}

	return errors;
}