const bcrypt=require('bcryptjs');
const Usuario=require('../models/Usuario.schema');
const jwt=require('jsonwebtoken')

const crearToken=(usuario,secreta,expiracion)=>{
    const {id,email,nombre,apellido}=usuario;
    return jwt.sign({id,email,nombre,apellido},secreta,{expiresIn:expiracion})
}
const cursos=[
    {titulo:'El profesor se embalo',
    tecnologia:'En teoria apollo'},
    {titulo:'Buen diplomado',
    tecnologia:'node'},
]
const resolvers={
    Query:{
        getCursos:()=>{
            return cursos
        },
        getCursosT:(_,{input})=>{
            const resultado=cursos.filter(
                curso=>curso.tecnologia===input
            );
            return resultado;
        },
        getCursosTitu:(_,{input})=>{
            const resultado=cursos.find(
                curso=>curso.titulo===input
            );
            return resultado;
        }
    },
    Mutation:{
        nuevoUsuario:async (_,{input})=>{
            //Validar que el usuario no exista
            const {email,password}=input;
            const usuario=await Usuario.findOne({email});
            if(usuario){
                throw new Error("Este email ya esta registrado");
            }
            //Hash del password
            input.password=await bcrypt.hash(password,10);
            //Guardar en la base de datos
            try{
                const usuario=new Usuario(input);
                const resultado=await usuario.save();
                return resultado;
            }
            catch(e){
                console.log(e)
            }
        },
        autenticarUsuario:async(_,{input})=>{
            const {email,password}=input;
            //Verificar si el usuario existe
            const existeUsuario=await Usuario.findOne({email})
            if(!existeUsuario){
                throw new Error('Credenciales incorrectas');
            }
            //Verificar si el passwor es correcto
            const passwordCorrecto=await bcrypt.
            compare(password,existeUsuario.password);
            if(!passwordCorrecto){
                throw new Error('Credenciales incorrectas');
            }
            //DevolverToken
            return{
                token:crearToken(existeUsuario,process.env.JWT_TOKEN,'24h')
            }
        }
    }
}
module.exports=resolvers;