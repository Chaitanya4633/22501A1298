const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const urlRoutes=require('./routes/urlRoutes');

const app=express();
app.use(cors());
app.use(express.json());

app.use('/', urlRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/urlShortener',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
})

.catch(err => console.error(err));
