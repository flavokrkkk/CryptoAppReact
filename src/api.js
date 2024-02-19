import {cryptoData, cryptoAssets} from './data.js'

export const fakeFetchCrypto = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 1)
    })
}
1
export const fetchAssets = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 1)
    })
}