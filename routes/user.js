const { response } = require('express');
var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');

const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}



/* GET users listing. */
router.get('/', function (req, res, next) {
  let user = req.session.user
  // console.log(user);
  productHelpers.getAllProducts().then((products) => {

    res.render('user/view-products', { products, user });

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
  let product = await userHelpers.getCartProducts(req.session.user._id)
  console.log(product)
  res.render('user/cart')

})

router.get('/add-to-cart/:id', verifyLogin, (req, res) => {
  userHelpers.addToCart(req.params.id, req.session.user._id).then(() => {
    res.redirect('/')
  })
})

module.exports = router;
