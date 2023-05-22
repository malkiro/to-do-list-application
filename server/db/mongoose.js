const mongoose = require("mongoose")

const mongodbURL = "mongodb+srv://malkiro:pass123@cluster0.rptb90l.mongodb.net/mydatabase?retryWrites=true&w=majority";

mongoose.connect(mongodbURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
})

const connection = mongoose.connection
mongoose.set('strictQuery', true);

connection.once("open",()=>{
    console.log("MongoDB Connected!")
})