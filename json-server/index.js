const datasetGenerator = require('./datasets')
const templatesGenerator = require('./templates')

module.exports = function () {
        const {results, datasets, list} = datasetGenerator()
        const templates = templatesGenerator()

        return {
            list,
            results,
            datasets,
            templates
        }
}