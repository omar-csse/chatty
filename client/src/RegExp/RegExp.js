export const usernameRegExp = RegExp(/^(?=.*[A-Za-z])(?!([-]|[.]|[_]))(?!.*[_.-]{2,})[A-Za-z0-9_.-]+\b(?!([-]|[.]|[_])){3,30}$/);
export const passwordRegExp = RegExp(/^(?=.*[@$!%*?&#^\-_\\|()[\]:;<>±§?/])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9@$!%*?&#^\-_\\|()[\]:;<>±§?/]{8,}$/);
export const emailRegExp = RegExp(/^(?=.*@)(?!.*((\.{2,})|(\.@)(\n)|(\s)|([@$!%*?&#^\-_\\|()[\]:;<>±§?/]{1,})))(?:[A-Za-z])(?:[\w-.]{1,40})(@)(?:[A-Za-z]{1,30})(?:\.)(?:[A-Za-z]{2,15})((?:.[A-Za-z]{2,4})?)$/);