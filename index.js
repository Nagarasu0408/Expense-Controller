// Define Functionality
/**
 * Function            -- EndPoints
 *
 * Add Expense Details -->/add-Expense (post)
 * view History        -->/view (get)
 * Edit Expense        -->/edit (put/patch)
 * delete Expense      -->/delete (delete)
 *
 */
// After Define Functionality Define EndPoints


// npm i cors --> userd to handle the response to anywhere




const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require("mongoose");
const { Expense, User } = require('./dbConnect.js')



const app = express();
app.use(bodyParser.json());// Use to parse the Given Data
app.use(cors());


/** Add Expense Details */

app.post('/add', async (req, res) => {
    try {
        await Expense.create({
            "amount": req.body.amount,
            "category": req.body.category,
            "date": req.body.date
        });
        res.status(201).json({
            "message": "Success"
        });
    }
    catch (error) {
        res.status(500).json({
            "status": "Failure",
            "error": error
        })
    }
})


/** View all Data from DB  */

app.get('/view', async (req, res) => {
    try {
        const data = await Expense.find({});
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({
            "message": "faild",
            "Error": error
        })
    }

})

/** delete/:id --> :id indicate the parameter its handle on URL --> use (req.params.id) to access the id value */
/** Delete the particular Data from DB */

app.delete('/delete', async (req, res) => {
    try {
        await Expense.deleteOne({ amount: req.body.amount });
        res.status(200).json({
            "message": "Data Deleted Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            "message": "faild",
            "Error": error
        })
    }
})


//Use Parameter to Delete the Value

app.patch('/update/:id', async (req, res) => {
    try {
        await Expense.findByIdAndUpdate(req.params.id, {
            "amount": req.body.amount,
            "category": req.body.category,
            "date": req.body.date
        });
        res.status(200).json({
            "message": "Data Updated Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            "message": "faild",
            "Error": error
        })
    }
})

/** Update the Data using ID-->parameter */

const port = process.env.PORT || 5000; /**  Automatically Choose the Available  Post Number  in Particular Web environment OR Locally available port Number*/
app.listen(port, () => {
    console.log("Server start....");
})
