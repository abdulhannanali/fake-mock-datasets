const datasetGenerator = require('./datasets')

module.exports = function () {
        const {results, datasets, list} = datasetGenerator()

        return {
            list,
            results,
            datasets
        }
}