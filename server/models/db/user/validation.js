const { usernameRegExp, emailRegExp, passwordRegExp } = require('../../RegExp/RegExp');

const validated = (username, email, password, authType) => {

	if (authType === 'login') {
		if (!emailRegExp.test(email)) {
			if (!usernameRegExp.test(username) || username === undefined) {
				return 'Enter a valid username or email';
			}
		}
	}
	else if (authType === 'signup') {
		if (!emailRegExp.test(email)) {
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

module.exports = validated;