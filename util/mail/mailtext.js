const { issuer } = require('../../config');

module.exports = (code) => {
  return `
    Your code to log in to ${issuer} is ${code}.
  `
}
