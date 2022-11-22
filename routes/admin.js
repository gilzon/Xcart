var express = require('express');
var router = express.Router();

const productHelpers = require('../helpers/product-helpers');

/* GET home page. */
router.get('/', function(req, res, next) {
  let products=[
    {
       name:"Hoodie",
       category:"hoodies",
       description:"Premium Printed Hoodies",
       image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTezSut3Aq2i7khS5NbWqpwGl9zfovuRd_yA&usqp=CAU"
    },
    {
      name:"Hoodie",
      category:"hoodies",
      description:"Premium Printed Hoodies",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4HVt-9lOAhibrlhXTNgTXxaF9BZpZWEj4yg&usqp=CAU"
   },
   {
    name:"Hoodie",
    category:"hoodies",
    description:"Premium Printed Hoodies",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI1aeKfrIF3k60vnrHG8C86UKvHNAXvplavk_O1bU1Tzuxo77dr802jPkIXwrHlf2PbkQ&usqp=CAU"
 },
 {
  name:"Hoodie",
  category:"hoodies",
  description:"Premium Printed Hoodies",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNEJnvGKcGg3qyxfsacAU2CmczyKfkH0uia0K1B3A53E8nIhkavRR-AIHOyJH3Qo5rJqA&usqp=CAU"
},
  ]
  
  res.render('admin/view-products', {admin:true,products});
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
