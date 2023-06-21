const mongoose=require('mongoose');
require('dotenv').config({path:'.env'});
const conectardb=async()=>{
    try{
        await mongoose.connect(process.env.DB_CONNECTION,{

        });
        console.log("Conecto a la bd");
    }
    catch(e){
        console.log("Error al Conectar a la Base de Datos");
        console.log(e);
        process.exit(1);
    }
}
module.exports=conectardb;