module.exports = function (name) {
    var _name = name || '';
    var prefix = ("Howdy " + _name).trim();
    var suffix = ", I'm a teapot!"

    return prefix + suffix;
};