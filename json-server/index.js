const datasetGenerator = require('./datasets')
const templatesGenerator = require('./templates')

module.exports = function () {
        const {results, datasets, list} = datasetGenerator()
        const {templates, types} = templatesGenerator()

        return {
            list,
            results,
            datasets,
            templates,
            types
        }
}