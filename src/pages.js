const database = require('./database/db')

const { subjects,
    weekdays,
    getSubject} = require('./utils/format')
const { Database } = require('sqlite')

function pageLanding(req,res){
    return res.render("index.html") // render é comando para renderizar o html, só é possível após confg do nunjucks
}
function pageStudy(req,res){
    const filters = req.query // recebe os dados 

    if(!filters.subject|| !filters.weekday || !filters.time){
        return res.render("study.html", {filters,subjects,weekdays }) // Aqui deve estar todos os retornos que estiverem em nossa page.
    }

    const query = `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS(

        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${filters.weekday}
        AND class_schedule.time_from <= ${filters.time} 
        AND class_schedule.time_to > ${filters.time };

    )
    
    `
        console.log('Não tem campos vazios ')
    
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

module.exports = {
    pageLanding,
    pageGiveClasses,
    pageStudy
}