const chalk = require('chalk')
const forEach = require('lodash/forEach')
const fs = require('fs')
const ora = require('ora')
const path = require('path')
const xml2js = require('xml2js')

const slug = require('./slug')

module.exports = async (options) => {
  // Start CLI Spinner
  const spinner = ora(`${chalk.bold('Processing ...')} [Ctrl-C to Cancel])`).start()

  // Update Spinner
  spinner.text = chalk.bold(`Processing ${options.input} ...`).concat(' [Ctrl-C to Cancel]')
  spinner.render()

  // Read Catalog XML File
  fs.readFile(options.input, (xmlError, xmlString) => {
    // Exit if we could not read from file
    if (xmlError) {
      spinner.text = `Error: ${xmlError.message}`
      spinner.fail()
      process.exit()
    }

    // Parse Catalog XML Text
    xml2js.parseString(xmlString, (parseErr, xmlObject) => {
      // Exit if we could not read from file
      if (parseErr) {
        spinner.text = `Error: ${parseErr.message}`
        spinner.fail()
        process.exit()
      }

      // Create Default Pricebook List ID
      let listId = 'pricebook'

      // Update List ID if Catalog ID exists
      if (
        xmlObject.catalog &&
        typeof xmlObject.catalog['$'] !== 'undefined' &&
        typeof xmlObject.catalog['$']['catalog-id'] !== 'undefined'
      ) {
        listId = `${xmlObject.catalog['$']['catalog-id']}-pricebook`
      }

      // Check if Output Filename Defined
      if (options.name) {
        // Add Pricebook suffix to list ID if not already present
        listId = `${slug(options.name.replace(/-pricebook$/, ''))}-pricebook`
      }

      const titleCase = (str) => {
        str = str.toLowerCase().split(' ')
        for (var i = 0; i < str.length; i++) {
          str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
        }
        return str.join(' ')
      }

      // Create Pricebook Object
      const pricebooks = {
        $: {
          xmlns: 'http://www.demandware.com/xml/impex/pricebook/2006-10-31',
        },
        pricebook: {
          header: {
            $: {
              'pricebook-id': listId,
            },
            currency: options.currency,
            'display-name': options.name || titleCase(listId.replace(/-/g, ' ')),
            description: options.description,
            'online-flag': true,
          },
          'price-tables': {
            'price-table': [],
          },
        },
      }

      // Loop through Catalog Products
      forEach(xmlObject.catalog.product, (product) => {
        // Check that we have a Product with an ID
        if (product && typeof product['$'] !== 'undefined' && typeof product['$']['product-id'] !== 'undefined') {
          // Save Product to Pricebook List
          pricebooks.pricebook['price-tables']['price-table'].push({
            $: {
              'product-id': product['$']['product-id'],
            },
            amount: {
              $: {
                quantity: 1,
              },
              _: Math.floor(Math.random() * (options.maxAmount - options.minAmount + 1)) + options.minAmount,
            },
          })
        }
      })

      // Create XML Builder
      const builder = new xml2js.Builder({
        mergeAttrs: true,
        rootName: 'pricebooks',
        xmldec: {
          version: '1.0',
          encoding: 'UTF-8',
        },
      })

      // Build XML String from Object
      const pricebookXML = builder.buildObject(pricebooks)

      // Create File Name from Catalog ID
      let outputFile = `${listId}.xml`

      // Check if Output Filename Defined
      if (options.output) {
        const base = options.output.endsWith('.xml') ? path.dirname(options.output) : options.output

        if (fs.existsSync(base)) {
          // Not sure if user has XML added as extension, so let's make sure
          outputFile = options.output.endsWith('.xml') ? options.output : path.join(options.output, outputFile)
        } else {
          spinner.text = `Error: Invalid Output Path "${options.output}"`
          spinner.fail()
        }
      }

      // Write XML Output to File
      fs.writeFile(outputFile, pricebookXML, (writeErr) => {
        if (writeErr) {
          spinner.text = `Error: ${writeErr}`
          spinner.fail()
        } else {
          spinner.text = chalk.bold('Processing Complete').concat(` ( Created: ${outputFile} )`)
          spinner.succeed()
        }

        // Terminate Process
        process.exit()
      })
    })
  })
}
