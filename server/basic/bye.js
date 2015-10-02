module.exports = function (name) {
    var _name = name || '';
    var prefix = ("Bye " + _name).trim();
    var suffix = "!";

    return prefix + suffix;
};