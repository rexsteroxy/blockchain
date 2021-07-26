const express = require('express');
const validate = require('../util/validate');
const validator = require('../validator/coin');
const coinController = require('../controller')

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      result: 'WELCOME TO REX API NODE FRAMEWORK',
      data: 'FRAMEWORK',
    });
  });

  router.post(
    '/listCoin',
    validate(validator.coinListing),
    coinController.createCoin
  );
//////
  router.post(
    '/sendMessage',
    validate(validator.sendMessage),
    coinController.sendMessage
  );

  router.get(
    '/getMessages',
    coinController.getMessages
  );

///
  router.get(
    '/getAllListedCoins',
    coinController.listAllCoins
  );

  router.get(
    '/getACoin/:id',
    validate(validator.viewACoin),
    coinController.viewACoin
  );


  router.put(
    '/updateCoin/:id',
    validate(validator.updateCoin),
    coinController.updateCoin
  );

  router.delete(
    '/deleteCoin/:id',
    coinController.deleteCoin
  );

module.exports = router;