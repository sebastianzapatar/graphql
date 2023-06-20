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
    }
}
module.exports=resolvers;