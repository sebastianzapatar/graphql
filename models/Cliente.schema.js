const mongoose=require('mongoose');
const ClienteSchema=mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type: String,
        require: true,
        trim:true 
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    empresa:{
        type:String,
        default:'Sin Empresa',
        trim:true
    },
    creado:{
        type:Date,
        default: Date.now()
    },
    telefono:{
        type:String,
        require:true,
        trim:true
    },
    vendedor:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Usuario'
    }
});
module.exports = mongoose.model("Cliente", ClienteSchema);