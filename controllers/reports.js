const helpers = require('../utils/functions');
const ReportModel = require('../models/Report');

exports.getReports = async (req, res, next) => {
    const Report = new ReportModel(req.db);

    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    const perPage = 10;

    try {
        let results = helpers.pagination(Report.getAll({ filterBank: req.query.bank, filterScoreFrom: req.query.scoreFrom, filterScoreTo: req.query.scoreTo }), currentPage, perPage);

        res.status(200).json(results)

        return;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
        return err;
    }
};
