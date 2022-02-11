
const CoinGecko = require("coingecko-api");

const CoinGeckoClient = new CoinGecko();


// @desc    Get all transactions
// @route   Get /api/v1/transactions
// @access  Public 
 
exports.getCryptos = async (req, res, next) => {
    try {
        const cryptos = await CoinGeckoClient.coins.all();
        return res.status(200).json({
            success: true,
            count: cryptos.length,
            data: cryptos
        });
        
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
}

exports.getCryptosNextPage = async (req, res, next) => {
    const pageNumber = req.query.pageNumber
    try {
        const cryptos = await CoinGeckoClient.coins.all({page: pageNumber});
        return res.status(200).json({
            success: true,
            count: cryptos.length,
            data: cryptos
        });
        
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
}

exports.searchCryptos = async (req, res, next) => {

    
    const cryptoIds = req.query.filterCryptos;
    
    // console.log(cryptoIds);
    const filteredCryptoData = [];
    // = await cryptoIds.map(async (cryptoId) => {

    //     const data = await CoinGeckoClient.coins.fetch(cryptoId)

    //     return data


    // } )
    // console.log(cryptoIds.length)

    function collectData(data) {
        filteredCryptoData.push(data)
    }


    for (let i=0; i < cryptoIds.length; i++) {
        
        // async function getData() {
            const apiData = await CoinGeckoClient.coins.fetch(cryptoIds[i])
        //     filteredCryptoData.push(apiData.data);

            
        // }

        collectData(apiData.data)

        console.log(filteredCryptoData.length)
    }

    
    try {

        return res.status(200).json({
            success: true,
            count: filteredCryptoData.length,
            data: filteredCryptoData
        });
 
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }

}


exports.findSingleCrypto = async (req, res, next) => {

    const cryptoId = req.query.id
    
    const crypto = await CoinGeckoClient.coins.fetch(cryptoId);

    console.log(crypto)

    try {
        
        return res.status(200).json({
            success: true, 
            count: crypto.length,
            data: crypto
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }

}