const schema = require('mongoose').Schema;
let object;
module.exports = function createLeadsSchema(mongoose) {
    const leadModelParams = new schema({
        First_Name: { type: String }
    }, { versionKey: false });
    
    if (!object) {
        object = mongoose.model('lead', leadModelParams);
    }

    return object;
};
