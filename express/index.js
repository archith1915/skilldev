const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

const FoodModel = require('./Models/Food');

app.use(express.json());

app.use(cors());

mongoose.connect('mongodb+srv://jaarchith:archith@food.lrteo.mongodb.net/');

app.post('/insert', async(req, res) => {
    const foodName = req.body.foodName;
    const days = req.body.days;
    const food = new FoodModel({ foodName : foodName, daysSinceIAte : days });

    try{
        await food.save()
        res.send("Inserted data");
    }catch(err){
        console.log(err);
    }
})


app.get('/read', async (req, res) => {
    try{
        const foods = await FoodModel.find({});
        res.send(foods);
    }
    catch(err){
        console.log(err);
    }
})

app.put('/update', async (req, res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
    
    try{
        const updatedFood = await FoodModel.findById(id);
        updatedFood.foodName = newFoodName;
        updatedFood.save();
        res.send("Updated data");
    }
    catch(err)
    {
        console.log(err);
    }
})

app.delete('/delete/:id', async (req, res) => {
    try{
        const id = req.params.id;
        await FoodModel.findByIdAndDelete(id);
        res.send("Deleted data");
    }
    catch(err){
        console.log(err);
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });