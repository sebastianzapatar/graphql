const { gql}=require('apollo-server');

const typeDefs=gql`
    type Curso{
        titulo:String
        tecnologia:String
    }
    type Usuario{#Para devolver
        nombre: String
        apellido: String
        email: String
        creado: String
    }
    input UsuarioInput{
        nombre:String!
        apellido:String!
        email:String!
        password:String!
    }
    type Query{
        getCursos: [Curso]
        getCursosT(input:String):[Curso]
        getCursosTitu(input:String):Curso

        #Usuarios
    }
    type Mutation{
        nuevoUsuario(input:UsuarioInput):Usuario
    }
`
module.exports=typeDefs;