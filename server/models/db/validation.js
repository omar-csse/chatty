const emailValidator = require('email-validator');
const { usernameRegExp, passwordRegExp } = require('../../Regexp/Regexp');

module.exports = validated = (username, email, password, authType) => {

	if (authType === 'login') {
		if (!emailValidator.validate(email)) {
			if (!usernameRegExp.test(username) || username === undefined) {
				return 'Enter a valid username or email';
			}
		}
	}
	else if (authType === 'signup') {
		if (!emailValidator.validate(email)) {
			return 'Enter a valid email';
		}
		if (!usernameRegExp.test(username) || username === undefined) {
			return 'Enter a valid username';
		}
	}
	if (!passwordRegExp.test(password)) {
		return 'Enter a valid password';
    }
    
	return true;
}