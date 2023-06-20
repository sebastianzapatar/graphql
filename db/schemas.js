const { gql}=require('apollo-server');

const typeDefs=gql`
    type Curso{
        titulo:String
        tecnologia:String
    }
    type Query{
        getCursos: [Curso]
        getCursosT(input:String):[Curso]
        getCursosTitu(input:String):Curso
    }
`
module.exports=typeDefs;