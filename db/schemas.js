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
    type Token{
        token:String
    }
    type Producto{
        id:ID
        nombre:String
        existencia:Int
        precio:Float
        creado:String
    }
    type Cliente{
        id:ID
        nombre:String
        apellido:String
        empresa:String
        email:String
        telefono:String
        vendedor:ID
    }
    input ClienteInput{
        nombre:String!
        apellido:String!
        empresa:String!
        telefono:String!
        email:String!
    }
    input ProductoInput{
        nombre:String!
        existencia:Int!
        precio:Float
    }
    input UsuarioInput{
        nombre:String!
        apellido:String!
        email:String!
        password:String!
    }
    input AutenticarInput{
        email:String!
        password:String!
    }
    type Query{
        getCursos: [Curso]
        getCursosT(input:String):[Curso]
        getCursosTitu(input:String):Curso

        #Productos
        getProductos:[Producto]
        getProducto(id:ID):Producto

        #Clientes
        getClientesVendedor:[Cliente]
    }
    type Mutation{
        nuevoUsuario(input:UsuarioInput):Usuario
        autenticarUsuario(input:AutenticarInput):Token

        #Producto
        crearProducto(input:ProductoInput):Producto
        borrarProducto(id:ID):String
        actualizarProducto(id:ID, input:ProductoInput):Producto


        #Cliente
        crearCliente(input:ClienteInput):Cliente
        eliminarCliente(id:ID):String
        
    }
`
module.exports=typeDefs;