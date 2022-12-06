const { response } = require('express');
var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');



/* GET users listing. */
router.get('/', function (req, res, next) {
let user=req.session.user
console.log(user);
  productHelpers.getAllProducts().then((products) => {
    
    res.render('user/view-products', { products,user });

  })

});


router.get('/login', (req, res) => {
  res.render('user/login'), { title: 'LOGIN' }
});


router.get('/signup', (req, res) => {
  res.render('user/signup'), { title: 'signup' }
});

router.post('/signup', (req, res) => {
  userHelpers.doSignup(req.body)
})

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')

    } else {
      res.redirect('/login')
    }
  })
})


router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/login')
})
module.exports = router;
