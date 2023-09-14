const router = require("express").Router();
const Customer = require("../models/Customer");
const Product = require("../models/ProductCatalog");
const Order = require("../models/OrderManagment");

//ADD ORDER
router.post("/add", async (req, res) => {
    try {
      // Assuming req.body contains customer_id, order_date, and order_details
      const { customer_id, order_details } = req.body;
  
      // Create a new order document
      const newOrder = new Order({
        customer_id: customer_id,
        order_date: new Date(),
        order_details: order_details,
      }); 
      const order = await newOrder.save();
      res.status(200).json(order);

    } catch (err) {
      res.status(500).json(err);
    }
  });

//UPDATE ORDER 
router.put("/:id", async (req, res) =>{
    if(req.body.orderId === req.params.id){
        try{
          const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
          },
          {new: true});
          res.status(200).json(updateOrder)

        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("Order Id Cannot found")
    }
})


//DELETE ORDER BY ID
router.delete("/:id", async (req,res) =>{
    if(req.body.orderId === req.params.id){
        try{
            const order = await Order.findByIdAndDelete(req.params.id);
            res.status(200).json("Order has been Deleted")
    
        }catch(err){
          res.status(500).json(err)
        }
    }else{
        res.status(401).json("Order Id Cannot Found")
    }
})

//GET ORDER BY ORDER ID
router.get("/:id", async (req, res) =>{
    try{
      const order = await Order.findById(req.params.id)
      res.status(200).json(order)

    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL ORDERS OR USING CUSTOMER ID
router.get("/", async (req, res) =>{
    const customer_id = req.query.customer_id;
    try{
       let order 
      if(customer_id){
        order = await Order.find({customer_id: customer_id})
      }
      else{
        order = await Order.find()
      }
      res.status(200).json(order);

    }catch(err){
        res.status(500).json(err)
    }
})

  module.exports = router