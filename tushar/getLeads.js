const createLeadSchema = require('./leadsParamsSchema');

exports.getAllLeads = ({args}, callback) => {
    const {mongoose, logger} = args;
    const leadParms = createLeadSchema(mongoose);
    leadParms.find((err, leads) => {
        if (err) {
            logger.error(`getAllLeads error err="${err}"`);
            return callback(err, null);
        } else {
            return callback(null, leads);
        }
    });
};
