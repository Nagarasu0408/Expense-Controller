const mongoose = require('mongoose');


const connect = mongoose.connect("mongodb+srv://Nagarasu:admin123@mern-training.vecye0s.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Mern-Training")

connect.then(() => {
    console.log('DB connect Successfully....')
}).catch(() => {
    console.log("DB Connect Faild...")
})



const ExpenseSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    category: {
        type: String
    },
    date: {
        type: String
    }
});

const Expense = new mongoose.model('users', ExpenseSchema);


const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

const User = new mongoose.model('userDetails', UserSchema);

module.exports = { Expense, User };