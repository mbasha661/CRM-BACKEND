const router = require('express').Router();
const Customer = require('../schema/customerSchema')
const jwt = require('jsonwebtoken')

// add a customer

router.post("/add-customer", async (req, res) => {
    
    try {
        const existingContact = await Customer.findOne({ email: req.body.email });
        if (existingContact) {
            return res.status(200).send({
                message: "Customer already Exists",
                success: false
            })
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'test')

        req.body.userId = decoded.userId;

        const newCustomer = new Customer({
            ...req.body,
            user: req.body.userId
        })
        await newCustomer.save()
        return res.status(200).send({
            success: true,
            message: "Customer added successfully"
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

// get the details of a specific user

router.get("/get-customers-by-id", async (req, res) => {

    try {

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'test')

        req.body.userId = decoded.userId;

        const customers = await Customer.find({ user: req.body.userId })
            .populate("user")
        res.status(200).send({
            success: true,
            message: "Customer fetched successfully",
            data: customers
        })
    } catch (error) {
        res.status(500).send({
            message: "Customer fetch failed",
            data: error,
            success: false
        })
    }
})

// get a specific customer details

router.get("/edit-customer/:id", async (req, res) => {

    try {
        const customer = await Customer.find({ _id: req.params.id })
        return res.status(200).send({
            success: true,
            message: "Success",
            data: customer
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "failed",
            data: null
        })
    }
})

// edit a customer

router.put("/edit-customer/:id", async (req, res) => {

    let user = req.body;
    const editUser = new Customer(user)

    try {
        const updatedCustomer = await Customer.updateOne({ _id: req.params.id }, editUser)
        res.status(201).send({
            success: true,
            message: "Customer updated successfully",
            data: updatedCustomer
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "failed",
            data: null
        })

    }
})

// delete a customer

router.delete("/delete-customer/:id", async (req,res)=>{

    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.send({
            success:true,
            message:'Customer deleted successfully'
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})






module.exports = router