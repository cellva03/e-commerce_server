// importing yhe controller module
const router = require('express').Router();

const { 
    login, 
    logout, 
    register,
    verifyToken,
    post_cart,
    get_cart,
    post_wishlist,
    get_wishlist,
    delete_cart,
    delete_wishlist,
    check_out,
    get_user   
} = require('../controllers/userController');

// Route for login user
router.post('/login', login);

// Route for logout user
router.get('/logout', logout);

// Route for creating a new user
router.post('/register', register);

// Route for post the cart product
router.post('/cart', post_cart )

router.post('/wish', post_wishlist )

router.get('/cart', get_cart)

router.get('/wish', get_wishlist)


router.delete('/cart/:id', delete_cart)

router.delete('/wish/:id', delete_wishlist)

router.post('/checkout', check_out)


router.get('/user', get_user)

// router.get('/sales', (req,res) => {
//     Sales.find({},(err,sales) => {
//         if(err) res.status(500).send(err)
//         else if(!sales) res.status(401).send({message: 'Sales is not found'})
//         else{
//             res.send({sales: sales,message: 'Sales is fetched'})
//         }
//     })
// })

module.exports = router;