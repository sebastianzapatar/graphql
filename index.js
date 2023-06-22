'use strict'
const {ApolloServer}=require('apollo-server');
const typeDefs=require('./db/schemas');
const jwt=require('jsonwebtoken');
const resolvers=require('./db/resolvers');
require('dotenv').config({path:'env'});
const conectardb=require('./config/db');

conectardb();
//servidor
const server=new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
        const token=req.headers['authorization']||'';
        try{
            const usuario=jwt.verify(token,process.env.JWT_TOKEN);
            return {
                usuario
            };
        }
        catch(e){
            console.log(e);
        }
    }
});

//Arrancar servidor

server.listen().then(({url})=>{
    console.log(`Servidor corriendo en la URL ${url}`);
})