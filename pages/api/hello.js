// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200
  res.json([
    {text: "sjskdfjsklfjssfld", completed: false}, 
    {text: "klfldsjsfkljs", completed: true}, 
    {text: "dlkiuouwadklklajkds", completed: false}, 
    {text: "kslfjsdklfjsdklsfjsklfdskldjf sadklfjs jsdklfsdkl", completed: false}
])
}



/*
  listar -> retorna array de itens
  nova -> retorna id
  deletar
  clear
  editar
*/