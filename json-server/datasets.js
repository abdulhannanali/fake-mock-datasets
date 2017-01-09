const faker = require('faker')
const flatten = require('lodash.flatten')

module.exports = function () {
    const datasets = []
    const results = []
    const schemaNames = ["productReturns", "productProfitabilityMargin", "campaignInteractions", "productRecommendations"]
    const datasetsLength = 30
    
    for (var i = 1; i <= datasetsLength; i++) {
        datasets.push({
            name: 'Dataset ' + i,
            description: faker.lorem.paragraph(),
            id: 'dataset' + i,
            lastUpdated: faker.date.past(),
            schema_name: schemaNames[Math.floor(Math.random() * 3)],
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
            schema_name: dataset.schema_name
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
        dataset['resultsSize'] = results.length
        return results
    }))
}

function generateDatasetResults (datasetId, minResults = 200, maxResults = 10000) {
    const fields = [
        'transactionId',
        'quantity',
        'date',
        'skuCode'
    ]

    const resultsLength = minResults + Math.ceil(Math.random() * (maxResults - minResults))
    console.log(resultsLength)
    const results = []
    for (var i = 0; i < resultsLength; i++) {
        let resultObj = {
            datasetId,
            arrayIndex: i
        }

        fields.forEach(function (field) {
            let fieldVal

            switch (field) {
                case 'transactionId':
                    fieldVal = faker.random.number()
                    break;
                case 'quantity':
                    fieldVal = Math.floor(Math.random() * 5) + 1
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
