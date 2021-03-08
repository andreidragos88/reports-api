const helpers = require('../utils/functions');

class Report {

    constructor(db) {
        this.records = helpers.deepClone(db);
    }

    getAll({ filterBank, filterScoreFrom, filterScoreTo }) {
        let bank = filterBank || '';
        let scoreFrom = filterScoreFrom && filterScoreFrom !== '' ? parseFloat(filterScoreFrom) : null;
        let scoreTo = filterScoreTo && filterScoreTo !== '' ? parseFloat(filterScoreTo) : null;

        return this.records.filter(el => {
            let isValid = false;

            if (this.filterBank(el.body.bankName, bank) &&
                this.filterScoreFrom(el.body.reportScore, scoreFrom) &&
                this.filterScoreTo(el.body.reportScore, scoreTo)) {
                isValid = true;
            }

            return isValid;
        })
    }

    filterBank(bankName, filterBank) {
        return ((filterBank !== '' && bankName.includes(filterBank)) || filterBank === '');
    }

    filterScoreFrom(reportScore, filterScoreFrom) {
        return ((filterScoreFrom !== null && parseFloat(reportScore) > filterScoreFrom) || filterScoreFrom === null);
    }

    filterScoreTo(reportScore, filterScoreTo) {
        return ((filterScoreTo !== null && parseFloat(reportScore) < filterScoreTo) || filterScoreTo === null);
    }
}

module.exports = Report;
