const helpers = require('../utils/functions');

exports.getReports = async (req, res, next) => {
    const bank = req.query.bank || '';
    const scoreFrom = req.query.scoreFrom && req.query.scoreFrom != '' ? parseFloat(req.query.scoreFrom) : null;
    const scoreTo = req.query.scoreTo && req.query.scoreTo != '' ? parseFloat(req.query.scoreTo) : null;
    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    const perPage = 10;
    
    let records = helpers.deepClone(req.db);

    let results = pagination(filterResults(records, { bank, scoreFrom, scoreTo }), currentPage, perPage);
    
    try {
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

const pagination = (results, currentPage, perPage) => {
    let pageResults = {
        data: [],
        totalPages: null
    };

    let resultsLength = results.length;
    let toIndex = (currentPage + 1) * perPage;

    pageResults.totalPages = Math.ceil(resultsLength / perPage);
    toIndex = toIndex > resultsLength ? resultsLength : toIndex;

    for (let i = currentPage * perPage; i < toIndex; i++) {
        pageResults.data.push(results[i]);
    }

    return pageResults;
}

const filterResults = (results, { bank, scoreFrom, scoreTo }) => {
    return results.filter(el => {
        let isValid = false;

        if (filterBank(el.body.bankName, bank) &&
            filterScoreFrom(el.body.reportScore, scoreFrom) &&
            filterScoreTo(el.body.reportScore, scoreTo)) {
            isValid = true;
        }

        return isValid;
    })
}

const filterBank = (bankName, filterBank) => ((filterBank !== '' && bankName.includes(filterBank)) || filterBank === '');

const filterScoreFrom = (reportScore, filterScoreFrom) => ((filterScoreFrom !== null && parseFloat(reportScore) > filterScoreFrom) || filterScoreFrom === null);

const filterScoreTo = (reportScore, filterScoreTo) => ((filterScoreTo !== null && parseFloat(reportScore) < filterScoreTo) || filterScoreTo === null);
