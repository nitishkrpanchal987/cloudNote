const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://nitishkumarpanchal987:Q5Jzon4qeqlJrksy@cluster0.tjfgwet.mongodb.net/cloudnote?retryWrites=true&w=majority';
const mongoL = 'mongodb://127.0.0.1:27017/testing';

const connectToMongoose = async()=>{
    await mongoose.connect(mongoURI);
    console.log('connected to mongo');
}
module.exports = connectToMongoose;

