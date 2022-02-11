const express = require("express");
const router = express.Router();
const { getCryptos, getCryptosNextPage, searchCryptos, findSingleCrypto } = require("../controllers/cryptos");


router
    .route("/")
    .get(getCryptos)

router
    .route("/page")
    .get(getCryptosNextPage)

router 
    .route("/filter")
    .get(searchCryptos)

router
    .route("/get-crypto")
        .get(findSingleCrypto)


module.exports = router;