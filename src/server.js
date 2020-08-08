//Criação da base de dados do banco 
const proffys = [
    //guarda no array pq são varios itens
    {
        //Tudo dentro de chaves é um objeto do meu JS
        name: "Lívia Nascimento", 
        avatar:"https://avatars2.githubusercontent.com/u/50409673?s=460&u=e4b29e5e96514bfabb7c8620d43b53a4ac00f959&v=4", 
        whatsapp: "82999557091", 
        bio: "Entusiastas das melhores tecnologias de matemática avançada. <br><br> Apaixonada por explodir coisas emm laboratório e por mudar a vidas pessoas através de experiências. Mais de 200.000 pessoas já passaram por aqui uma das minhas explosões.", subject: "Matemática",
        cost: "20", 
        weekday: [0], 
        time_from: [770] , 
        time_to: [1220]
    },
    {
        //Tudo dentro de chaves é um objeto do meu JS
        name: "Samilly Nunes", 
        avatar:"https://avatars0.githubusercontent.com/u/37520136?s=460&u=9c6b20941f80c7d21cdf0d346151bf5d38015350&v=4", 
        whatsapp: "82999557091", 
        bio: "Entusiasta das artes computacionais avançadas. <br><br> Apaixonada por desenvolver soluções que podem mudar a vidas pessoas através de suas experiências. Mais de 200.000 pessoas já passaram por aqui uma das minhas explosões.", 
        subject: "Artes",
        cost: "50", 
        weekday: [1], 
        time_from: [770] , 
        time_to: [1220]
    }
]

const subjects =[
    "Artes",
   "Biologia",
   "Ciências",
   "Educação Física",
   "Física",
   "Geografia",
   "História",
   "Matemática",
   "Português",
    "Quimica",
]

const weekdays = [
    "Domingo", 
    "Segunda", 
    "Terça",
    "Quarta",
    "Quinta", 
    "Sexta",
    "Sábado",
]
//Organizando em função 

function getSubject(subjectNumber){
    const position = +subjectNumber-1
    return subjects[position]
}

function pageLanding(req,res){
    return res.render("index.html") // render é comando para renderizar o html, só é possível após confg do nunjucks
}
function pageStudy(req,res){
    const filters = req.query // recebe os dados 
    return res.render("study.html", { proffys,filters,subjects,weekdays }) // Aqui deve estar todos os retornos que estiverem em nossa page.
}
function pageGiveClasses(req,res){
    const data = req.query
    //adicionando dados ao array
    const isNotEmpty = Object.keys(data).length != 0 //Isso transforma as chaves em um array. USando operação ternaria 
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)
        proffys.push(data)
        return res.redirect("/study")
    }
    else{
        //se não 
    return res.render("give-classes.html", {subjects,weekdays})
    }

    
}

//Chamar o servidor express
const express =require('express')
const server = express()

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



