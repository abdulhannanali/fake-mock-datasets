const faker = require('faker')
const flatten = require('lodash.flatten')

module.exports = function () {
    const datasets = []
    const results = []
    const types = ['returns', 'margin', 'campain']
    const datasetsLength = 20
    
    for (var i = 0; i < datasetsLength; i++) {
        datasets.push({
            name: 'Dataset ' + (i + 1),
            description: faker.lorem.paragraph(),
            id: faker.random.uuid(),
            lastUpdated: faker.date.past(),
            type: types[Math.floor(Math.random() * 3)],
            access: {
                lookup: {
                    endpoint: 'stash.qubitproducts.com',
                    namespace: 'halloweencostumes'
                },
                liveTap: {
                    project: 'qubit-client-halloweencostumes',
                    table: 'halloweencostumes.returnsData'
                }
            }
        })
    }

    const datasetsResults = generateDatasetsResults(datasets)
    const datasetsList = datasets.map(function (dataset) {
        return {
            id: dataset.id,
            name: dataset.name,
            lastUpdated: dataset.lastUpdated,
            type: dataset.type
        }
    })

    return {
        list: datasetsList,
        datasets: datasets,
        results: datasetsResults
    }
}

function generateDatasetsResults (datasets) {
    return flatten(datasets.map(function (dataset) {
        const results = generateDatasetResults(dataset.id)
        return results
    }))
}

function generateDatasetResults (datasetId, resultsLength = 1000) {
    const fields = [
        'transactionId',
        'quantity',
        'date',
        'skuCode'
    ]

    const results = []
    for (var i = 0; i < resultsLength; i++) {
        let resultObj = {
            datasetId
        }

        fields.forEach(function (field) {
            let fieldVal

            switch (field) {
                case 'transactionId':
                    fieldVal = faker.random.number()
                    break;
                case 'quantity':
                    fieldVal = Math.floor(Math.random() * 5)
                    break;
                case 'skuCode':
                    fieldVal = 'AJ' + Math.floor(Math.random() * 50)
                    break;
                case 'date':
                    fieldVal = faker.date.past()
                default:
                    break
            }

            resultObj[field] = fieldVal
        })

        results.push(resultObj)
    }

    return results
}
