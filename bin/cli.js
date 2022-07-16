#!/usr/bin/env node

const chalk = require('chalk')
const path = require('path')
const yargs = require('yargs')

const argv = yargs
  .scriptName('sfcc-catalog-pricebook')
  .usage(
    `\n${chalk.cyan.bold('Usage:')} ${chalk.bold.green('sfcc-catalog-pricebook')} ${chalk.bold('-i')} ${chalk.dim(
      '[input]'
    )} ${chalk.bold('-o')} ${chalk.dim('[output]')}`
  )
  .option('input', {
    describe: 'Input File ( Catalog XML )',
    alias: 'i',
    demandOption: true,
    type: 'string',
  })
  .option('output', {
    describe: 'Output File ( Generated XML )',
    alias: 'o',
    demandOption: false,
    type: 'string',
    default: 'pricebook',
  })
  .option('id', {
    describe: 'The ID of the generated pricebook',
    demandOption: false,
    type: 'string',
  })
  .option('name', {
    describe: 'The display name of the generated pricebook',
    alias: 'n',
    demandOption: false,
    type: 'string',
    default: null,
  })
  .option('description', {
    describe: 'The description for the generated pricebook',
    alias: 'd',
    demandOption: false,
    type: 'string',
    default: null,
  })
  .option('currency', {
    describe: 'The currency code to be used for the generated pricebook',
    alias: 'c',
    demandOption: false,
    type: 'string',
    default: 'USD',
  })
  .option('min-amount', {
    describe: 'The minimum price amount to be generated for a product',
    alias: 'm',
    demandOption: false,
    type: 'number',
    default: 5.99,
  })
  .option('max-amount', {
    describe: 'The minimum price amount to be generated for a product',
    alias: 'x',
    demandOption: false,
    type: 'number',
    default: 589.99,
  })
  .example('sfcc-catalog-pricebook -i catalog.xml', 'Basic Example')
  .wrap(105)
  .epilogue(`${chalk.bold.cyan('Need Help?')} https://github.com/sfccdevops/sfcc-catalog-pricebook`)
  .help()
  .version().argv

require(path.join(__dirname, '../lib/index.js'))(argv)
