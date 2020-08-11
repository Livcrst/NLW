//Chamar o servidor express
const express =require('express')
const server = express()
const {pageLanding,
    pageGiveClasses,
    pageStudy} = require("./pages")

//Configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views',
{
    express: server,
    noCache: true,

})

server.use(express.static("public")) //Todo .use é cnfg do servidor 

//Rotas da aplicação.
.get("/", pageLanding)

.get("/study", pageStudy)

.get("/give-classes", pageGiveClasses)
.listen(5500)



