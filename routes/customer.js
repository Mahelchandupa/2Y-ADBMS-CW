const router = require("express").Router();
const Customer = require("../models/Customer");

//ADD CUSTOMER
router.post("/add", async (req, res) =>{
    try{
      
      const newCustomer = new Customer({
          name: req.body.name,
          email: req.body.email,
          shipping_address: req.body.shipping_address,
      });
      const customer = await newCustomer.save(); //The method insert() does not exist in Mongoose. so used save() method to save the new customer instance.
      res.status(200).json(customer);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//ADD MANY CUSTOMERS
router.post("/addMany", async (req, res) => {
    try {
      const customersData = req.body; 
  
      // Insert multiple customers to the database
      const customers = await Customer.insertMany(customersData);
  
      res.status(200).json(customers);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

//UPDATE CUSTOMER
router.put("/:id", async (req, res) =>{
    if(req.body.userId === req.params.id){
        try{
          const updateCustomer = await  Customer.findByIdAndUpdate(req.params.id, {
            $set: req.body,
          },
          {new:true});
          res.status(200).json(updateCustomer);

        }catch(err){
           res.status(500).json(err);
        }
    }else{
        res.status(401).json("You can update only your Data")
    }
});

//DELETE CUSTOMER
router.delete("/:id", async (req, res) =>{
    if(req.body.userId === req.params.id){
       try{
            const customer = await Customer.findById(req.params.id)
            if(customer){
                try{
                    const user = await Customer.findByIdAndDelete(req.params.id);
                    res.status(200).json("Customer has been deleted")
    
                }catch(err){
                    res.status(500).json(err);
                }
            }else{
             res.status(404).json("Customer not found")
            }
       }catch(err){
          res.status(500).json(err);
       }
    }else{
        res.status(401).json("You can Delete only your account")
    }
})

//GET CUSTOMER USING ID
router.get("/:id", async (req, res) =>{
    try{
       const customer = await Customer.findById(req.params.id); // findById() 
       res.status(200).json(customer);
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL CUSTOMERS
router.get("/", async (req,res) =>{
    const name = req.query.name
    const email = req.query.email
    try{
        let customers;

        if(name){
            customers = await Customer.find({name : name}); // get customer using name customers in collection
        }
        else if(email){
            customers = await Customer.find({email : email}); // get customer using email customers in collection
        }
        else{
            customers = await Customer.find(); // find() used to get all customers in collection
        }
        res.status(200).json(customers);

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router