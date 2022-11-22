var express = require('express');
var router = express.Router();

const productHelpers = require('../helpers/product-helpers');

/* GET home page. */
router.get('/', function(req, res, next) {
 productHelpers.getAllProducts().then((products)=>{
  console.log(products);
  res.render('admin/view-products', {admin:true,products});
 })
  
 
});
router.get('/add-product',function(req,res){
res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Image);

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    image.mv('./public/product-images/'+id+'.jpg' ,(err)=>{
      if(!err){
        res.render("admin/add-product")
      }else{
        console.log(err);
      }
      }
   ) })
  })
  

module.exports = router;
