
const { resolve } = require('path')

const chainWebpack = config => {
    config.resolve.alias.set('@', resolve('src'))
    return config
}

module.exports = {
    lintOnSave: true,
    devServer: {
        open: true,
        port: 8086,
    },
    chainWebpack,
}