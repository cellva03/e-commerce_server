// importing all the  libraries
const User = require('../models/userModel');    
const auth = require('../Auth/auth');
const Product = require('../models/productModel');
const Sales = require('../models/salesModel');
const mongoose = require('mongoose');
let LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

// Login User
const login = (req,res) => {
    // console.log(req.body.email);
    const email = req.body.email;
    User.findOne({email},(err,user) => {
        // console.log(user);
        if(err) res.status(500).send(err)
        else if(!user) res.status(401).send({message: 'User is not found'})
        else{
            localStorage.setItem('user',user._id);
            auth.comparePassword(req.body.password,user.password,(err,isMatch) => {
                if(err) res.status(500).send(err)
                else if(!isMatch) res.status(401).send({message: 'Password is not matched'})
                else{
                    // currentUser = user;
                    let payload = {username:user.username}
                    auth.generateToken(payload,(err,token) => {
                        console.log("token  "+token);
                        res.send({message: 'User is logged in successfully',token:token,loggedIn:true,user: user})
                    })
                }
            })
        }
    })
}

// logout User
const logout = (req,res) => {
    localStorage.clear();
    res.send({message: 'User is logged out'});

}


// function to create a new user
const register =(req,res) => {
    console.log(req.body);
    const user = new User(req.body);

    user.save((err,user) => {
        if(err){
            res.send({user: false, message: 'User is not added'});
        }
        else{
            res.send({user: true, message: 'User is added'});
        }
    })
}

// function for verifying the user
const verifyToken = (req,res) => {
    auth.isAuthorized();
}

// function for post carting the product
const post_cart = (req,res) => {
    const userId = localStorage.getItem('user');
    console.log(userId);
    if(!userId){
        res.status(200).send({ errMessage: ' You have to Login to add to cart'});
    }
    else{
    const cartData = {
        _id : new mongoose.Types.ObjectId(),
        oldId : req.body.oldId,
        title : req.body.title,
        price : req.body.price,
        stock : req.body.stock,
        ProductImage : req.body.ProductImage,
        category : req.body.category,
        description : req.body.description,
    }
    console.log(cartData);
    User.findOne({_id: userId},(err,user) => {
        if(err) res.status(500).send(err)
        else if(!user) res.status(401).send({message: 'User is not found'})
        else{
            user.cart.push(cartData);
            user.save((err,user) => {
                if(err) res.status(500).send(err)
                else{
                    res.send({message: 'Product is added to cart',user: user.cart})
                }
            })
        }
    })}
}

// function for posting the wishlist
const post_wishlist = (req,res) => {
    const userId = localStorage.getItem('user');
    console.log(userId);
    const cartData = {
        _id : req.body._id,
        title : req.body.title,
        price : req.body.price,
        stock : req.body.stock,
        ProductImage : req.body.ProductImage,
        category : req.body.category,
        description : req.body.description,
    }
    console.log(cartData);
    User.findOne({_id: userId},(err,user) => {
        if(err) res.status(500).send(err)
        else if(!user) res.status(401).send({message: 'User is not found'})
        else{
            user.wish.push(cartData);
            user.save((err,user) => {
                if(err) res.status(500).send(err)
                else{
                    res.send({message: 'Product is added to wish'})
                }
            })
        }
    })
}


// function for getting the cart
const get_cart = (req,res) => {
    const user = localStorage.getItem('user');
    // console.log(user);
    User.findOne({_id: user},(err,user) => {
        // console.log(user);
        if(err) res.status(500).send(err)
        else if(!user) res.status(401).send({message: 'User is not found'})
        else{
            res.send({cart: user.cart,message: 'Cart is fetched',user: user})
        }
    })
}

// function for getting the wishlist
const get_wishlist = (req,res) => {
    const user = localStorage.getItem('user');
    // console.log(user);
    User.findOne({_id: user},(err,user) => {
        // console.log(user);
        if(err) res.status(500).send(err)
        else if(!user) res.status(401).send({message: 'User is not found'})
        else{
            res.send({wish: user.wish,message: 'Wish is fetched'})
        }
    })
}

// function for deleting the cart
const delete_cart = (req,res) => {
    const user = localStorage.getItem('user');
    const id = req.params.id;
    console.log(id);
    User.findOne({_id: user},(err,user) => {
        if(err) res.status(500).send(err)
        else if(!user) res.status(401).send({message: 'User is not found'})
        else{
            user.cart.pop(id);
            user.save((err,user) => {
                if(err) res.status(500).send(err)
                else{
                    res.send({message: 'Product is Popped from cart',cart: user.cart})
                }
            })
        }
    })
}

// function for deleting the wishlist
const delete_wishlist = (req,res) => {
    const user = localStorage.getItem('user');
    const id = req.params.id;
    console.log(id);
    User.findOne({_id: user},(err,user) => {
        if(err) res.status(500).send(err)
        else if(!user) res.status(401).send({message: 'User is not found'})
        else{
            user.wish.pop(id);
            user.save((err,user) => {
                if(err) res.status(500).send(err)
                else{
                    res.send({message: 'Product is Popped from wish',wish: user.wish})
                }
            })
        }
    })
}

//function for checking out the cart
const check_out = async(req,res) => {
    // console.log(req.body.products);
    const user = localStorage.getItem('user');
    const products = req.body.products;
    let datas = [];
    await products.forEach((cartproduct) => {
       Product.findOne({_id: cartproduct.oldId},(err,product) => {
           if(err) res.status(500).send(err)
           else if(!product) res.status(401).send({message: 'Product is not found'})
           else{
               const data = {
                   title: product.title,
                   price: product.price,
                   stock: product.stock,
                   category: product.category,
                   description: product.description,
                   quantity: cartproduct.quantity,
               }
               // console.log(data);
               datas.push(data);
               return data;
           }
       })
   })

    User.findOne({_id: user},(err,user) => {
        console.log(datas);
        if(err) res.status(500).send(err)
        else if(!user) res.status(401).send({message: 'User is not found'})
        else{
            Sales.create({
                username: user.username,
                email: user.email,
                products: datas,
                cost : req.body.cost,
                date: new Date()
            })
            user.discount = 0;
            user.cart = [];
            user.save((err,user) => {
                if(err) res.status(500).send(err)
                else{
                    res.send({message: 'Cart is emptied'})
                }
            })
            products.forEach(orderedproduct => {
                Product.findOne({_id: orderedproduct.oldId},(err,product) => {
                    if(err) res.status(500).send(err)
                    else if(!product) res.status(401).send({message: 'Product is not found'})
                    else{
                        console.log(product.stock);
                        product.stock = product.stock - parseInt(orderedproduct.quantity);
                        if(product.stock < 10){
                            console.log('Low Stock');
                        }
                        product.save((err,product) => {
                            if(err) res.status(500).send(err)
                            else{
                                console.log('Product is updated',product.stock);
                                // res.send({message: 'Product is updated'})
                            }
                        })
                    }
                })
            })
        }
    })

}

// function for getting the user
const get_user = (req,res) => {
    const user = localStorage.getItem('user');
    User.findOne({_id: user},(err,user) => {
        // console.log(user);
        if(err) res.status(500).send(err)
        else if(!user) res.status(401).send({message: 'User is not found'})
        else{
            res.send({user: user,message: 'User is fetched'})
        }
    })
}

module.exports={
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
}