const bcrypt=require('bcryptjs');
const Usuario=require('../models/Usuario.schema');
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
        }
    }
}
module.exports=resolvers;