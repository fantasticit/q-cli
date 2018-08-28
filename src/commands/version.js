const program = require('commander')
const packageJSON = require('../utils/packageJSON')

program.version(packageJSON && packageJSON.version, '-v --version')
