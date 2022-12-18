const { response } = require('express');
var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');
const ObjectId = require("mongodb").ObjectId;

const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}



/* GET users listing. */
router.get('/', async function (req, res, next) {
  let user = req.session.user
  // console.log(user);
  let cartCount = null
  if (req.session.user) {
   
   cartCount= await userHelpers.getcartCount(req.session.user._id)
  }
  productHelpers.getAllProducts().then((products) => {

    res.render('user/view-products', { products, user, cartCount });
   

  })

});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
  } else {
    res.render('user/login', { "logginErr": req.session.loginErr })
    req.session.logginErr = false, { title: 'LOGIN' }
  }
});


router.get('/signup', (req, res) => {
  res.render('user/signup'), { title: 'signup' }
});

router.post('/signup', (req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response);
    req.session.loggedIn = true
    req.session.user = response
    res.redirect('/')
  })
})

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')

    } else {
      req.session.loginErr = "Invalid Username or Password"
      res.redirect('/login')
    }
  })
})


router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})
router.get('/cart', verifyLogin, async (req, res) => {
  let products = await userHelpers.getCartProducts(req.session.user._id)
  console.log(products)
  res.render('user/cart', { products, user: req.session.user })

})

router.get('/add-to-cart/:id',  (req, res) => {
  console.log("api call");
  userHelpers.addToCart(req.params.id, req.session.user._id).then(() => {
    res.json({status:true})
  })
})

router.post('/change-product-quantity',(req,res,next)=>{
  
  userHelpers.changeProductQuantity(req.body).then(()=>{

  })
  })

module.exports = router;
