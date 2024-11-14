const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastEatenDate: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, //connecting one schema to another
        ref: 'User',
    }
})

const Food = mongoose.model('Food', foodSchema);

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    token = token.replace('Bearer', "");
    if(!token) return res.status(403).json({message: 'Token not provided'});
    jwt.verify(token, "your_secret_key", (err, decoded)=>{
        if(err) return res.status(401).json({message : "Failed to authenticate"});
        req.user = decoded.userId;
        next();
    })
}

app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body; //object destructuring
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to register' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'Invalid credentials' });
        }
        const isMatching = await bcrypt.compare(password, user.password);
        if (!isMatching) {
            return res.status(404).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login' });
    }
})

app.post('/api/foods', verifyToken, async (req, res) => {
    try{
        const { name, lastEatenDate } = req.body;
        const food = new Food({ 
            name, 
            lastEatenDate : new Date (lastEatenDate), 
            user: req.userId 
        });
        await food.save();
        res.status(201).json({ message: 'Food added successfully' });
    }catch(err)
    {
        console.error(err);
        res.status(500).json({ error: 'Failed to add food' });
    }
})

app.get('/api/foods', verifyToken, async (req, res) => {
    try{
        const foods = await food.find({user : req.userId});
        req.json(foods);
    }
    catch(err){
        res.status(500).json({error : "Failed to fetch food"});
    }
});

app.put('/api/foods/:id', verifyToken, async (req, res) => {
    try{
        const {lastEatenDate} = req.body;
        const food = await Food.findOneAndUpdate(
            {_id : req.params.id, user : req.userId},
            {lastEatenDate : new Date(lastEatenDate)},
            {new : true}
        );
        if(!food){
            return res.status(404).json({error : "Food not found"});
        }
        res.json(food);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error : "Failed to update food"});
    }
});

const PORT = process.env.PORT || 6154;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})