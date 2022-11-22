var express = require('express');
var router = express.Router();

const productHelpers = require('../helpers/product-helpers');

/* GET users listing. */
router.get('/', function(req, res, next) {
 
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
    res.render('user/view-products', {admin:false,products});
   })

 
  
});

module.exports = router;
