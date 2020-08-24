class ValidatorService {
    isText(stringToValidate, min = 1, max = 200) {
        var regularExpression = new RegExp(`^[a-zA-Z0-9_ !@#$&()\\-.+,/\]{${min},${max}}$`);
        var regularExpression2 = new RegExp(`^[ñA-Za-z0-9 _]*[ñA-Za-z0-9][ñA-Za-z0-9 _]*$`);
        return regularExpression.test(stringToValidate) || regularExpression2.test(stringToValidate);
    }

    isURL(stringToValidate){
        var regularExpression = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
        return regularExpression.test(stringToValidate);
    }

    // Minimum eight characters, at least one letter and one number
    isPassword(stringToValidate){
        var regularExpression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regularExpression.test(stringToValidate);
    }
}

module.exports = new ValidatorService();