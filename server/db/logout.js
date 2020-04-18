const {  clearCookie  } = require('../config/tokens')


module.exports = logout = (res) => {

    clearCookie(res, "__sesjidt_", "/");
    clearCookie(res, "_sesjidrt", "/");
    return "logut successfully"
}