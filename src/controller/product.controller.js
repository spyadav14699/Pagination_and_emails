const express = require("express");

const path = require("path");
const router = express.Router();

const Product = require("../model/product.model")

const User = require("../model/user.model")

const transporter = require("../config/email")

router.post("", async (req, res) => {

try {

const product = await Product.create(req.body);

const user = await User.findById(product.user_id).lean().exec();

   var message = {
    from: "noreply@surya.com",
    to: user.email,
    subject: `Welcome to ABC system ${user.first_name} ${user.last_name}`,
    text: "Hello User",
    html: "<p>Hello User</p>",
    attachments : [{filename : "name.txt", path: path.join(__dirname, "../name.txt") }]
  };


  transporter.sendMail(message)

return res.status(201).send(product)
    
} catch (err) {

    return res.status(500).send(err.message);
   
}

});


router.get("", async (req, res) => {

    try {

        const page = +req.query.page || 1;

        const size = +req.query.size || 2;

        let search = req.query.search;


        const skip  = (page - 1) * size;

 let product, totalPages;

 if(!search) {

    product = await Product.find().skip(skip).limit(size).lean().exec();

    totalPages = Math.ceil((await Product.find().countDocuments())/size);

 }
 else {

    product = await Product.find({ name : search }).skip(skip).limit(size).lean().exec();

    totalPages = Math.ceil((await Product.find().countDocuments())/size);

 }

       
        
        return res.status(200).send({product, totalPages})
            
        } catch (err) {
        
            return res.status(500).send(err.message);
           
        }

})


module.exports = router;
