//Chamar o servidor express
const express =require('express')
const server = express()
const {pageLanding,
    pageGiveClasses,
    pageStudy, 
    saveClasses} = require("./pages")

//Configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views',
{
    express: server,
    noCache: true,

})
//
server
//receber os dados do req.body
.use(express.urlencoded({extended: true})) // por padrão o express não le isso, por isso precisa config para encapsular os dados na view
.use(express.static("public")) //Todo .use é cnfg do servidor 

//Rotas da aplicação.
.get("/", pageLanding)

.get("/study", pageStudy)

.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.listen(5500)



