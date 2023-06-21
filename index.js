'use strict'
const {ApolloServer}=require('apollo-server');
const typeDefs=require('./db/schemas');
const resolvers=require('./db/resolvers');
const conectardb=require('./config/db')

conectardb();
//servidor
const server=new ApolloServer({
    typeDefs,
    resolvers
});

//Arrancar servidor

server.listen().then(({url})=>{
    console.log(`Servidor corriendo en la URL ${url}`);
})