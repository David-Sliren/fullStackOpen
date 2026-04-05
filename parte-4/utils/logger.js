const info = (...props) => process.env.NODE_ENV !== 'test' && console.log(...props)

const error = (...props) => process.env.NODE_ENV !== 'test' && console.error(...props)

module.exports = { info, error }
