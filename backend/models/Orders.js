const mongoose =require('mongoose')

const {Schema}=mongoose;

const OrderScheme=new Schema({
    email:{
        type :String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true,
    },
})