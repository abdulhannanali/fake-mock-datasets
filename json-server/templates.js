/**
 * templates.js
 * 
 * Following custom schemas are manually generated and are there for only temporary purposes, so the edit
 * functionality can be enabled on them
 */

// Initial Templates Configuration in order to make it look better looking
const faker = require('faker')
module.exports = function () {

    const dataTypes = {
        'STRING': 'STRING',
        'BYTES': 'BYTES',
        'INTEGER': 'INTEGER',
        'FLOAT': 'FLOAT',
        'BOOLEAN': 'BOOLEAN',
        'RECORD': 'RECORD',
        'TIMESTAMP': 'TIMESTAMP',
        'DATE': 'DATE',
        'TIME': 'TIME',
        'DATETIME': 'DATETIME'
    }

    const fieldsData = {
        transactionId: dataTypes.INTEGER,
        userId: dataTypes.INTEGER,
        skuCode: dataTypes.STRING,
        quantity: dataTypes.INTEGER,
        date: dataTypes.DATE,
        email: dataTypes.STRING
    }

    const templates = {
        'productReturns': {
            readable: true,
            writable: true,
            fields: ['transactionId', 'skuCode', 'quantity',  'date']
        },
        'productProfitabilityMargin': {
            readable: true,
            writable: true,            
            fields: ['skuCode', 'quantity', 'date']
        },
        'campaignInteractions': {
            readable: true,
            writable: true,
            fields: ['userId', 'email', 'quantity', 'date']
        },
        'productRecommendations': {
            readable: true,
            writable: true,
            fields: ['userId', 'email', 'quantity', 'date']
        }
    }

    function generateTemplates (specs) {
        const templates = Object.keys(specs).map((templateKey) => {
            const template = specs[templateKey]
            const fields = template.fields || []
            const fieldObject = {}

            const populatedFields = fields.map((field) => {
                fieldObject[field] = fieldsData[field]
            })
            
            return {
                id: templateKey,
                description: faker.lorem.paragraph(),
                readable: template.readable,
                writable: template.writable,
                fields: fieldObject
            }
        })

        return templates
    }

    return {
        templates: (generateTemplates(templates)),
        types: dataTypes
    }
}
