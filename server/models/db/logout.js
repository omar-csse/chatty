const {  clearCookie  } = require('../../config/tokens')


module.exports = logout = (res) => {

    clearCookie(res, "_sesjid", "/");
    return "logut successfully"
}