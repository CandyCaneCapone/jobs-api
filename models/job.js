const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    title : {
        type : String , 
        required : [true , "Please provide job title"] ,
        trim : true , 
        minLength : 3 , 
        maxLength : 100  
    },
    company : {
        type : String , 
        required : [true , "Please provide job company"], 
        trim : true , 
        maxLength : 50 , 
    },
    status : {
        type : String ,
        enum : ["interview" , "declined" , "pending"], 
        default : "pending" 
    },
    
    createdBy : {
        type : mongoose.Types.ObjectId , 
        required : true , 
        ref : "users"
    }
})

module.exports = mongoose.model("jobs" , userSchema); 