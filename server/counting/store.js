module.exports = function() {

    var data;

    this.getData = function() {
        if (!data) {
            this.fetchData();
        }

        return data;
    };

    this.fetchData = function() {
        data = "code that fetches the value";
    };

};