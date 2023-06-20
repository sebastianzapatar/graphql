'use strict'
const {ApolloServer, gql}=require('apollo-server');
const cursos=[
    {titulo:'El profesor se embalo',
    tecnologia:'En teoria apollo'},
    {titulo:'Buen diplomado',
    tecnologia:'node'},
]
const typeDefs=gql`
    type Curso{
        titulo:String
        tecnologia:String
    }
    type Query{
        getCursos: [Curso]
    }
`
const resolvers={
    Query:{
        getCursos:()=>cursos
    }
}
//servidor
const server=new ApolloServer({
    typeDefs,
    resolvers
});

//Arrancar servidor

server.listen().then(({url})=>{
    console.log(`Servidor corriendo en la URL ${url}`);
})