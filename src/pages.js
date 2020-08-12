const Database = require('./database/db')

const { subjects,
    weekdays,
    getSubject, convertHoursToMinutes} = require('./utils/format')

function pageLanding(req,res){
    return res.render("index.html") // render é comando para renderizar o html, só é possível após confg do nunjucks
}
async function pageStudy(req,res){
    const filters = req.query // recebe os dados 

    if(!filters.subject|| !filters.weekday || !filters.time){
        return res.render("study.html", {filters,subjects,weekdays }) // Aqui deve estar todos os retornos que estiverem em nossa page.
    
    }
    //converter hrs em min 
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS(

        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${filters.weekday}
        AND class_schedule.time_from <= ${timeToMinutes} 
        AND class_schedule.time_to > ${timeToMinutes}

    )
    AND classes.subject = '${filters.subject}'
    
    `
    // caso haja erro na consulta ao banco de dados
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy)=>{
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', {proffys, subjects, filters, weekdays})
    } catch (error) {
        console.log(error)
        
    }
        console.log('Não tem campos vazios ')
    
}
function pageGiveClasses(req,res){

    return res.render("give-classes.html", {subjects,weekdays})

    
}
async function saveClasses(req,res){
    const createProffy = require('./database/createProffy')
   // const data = req.body
   const proffyValue = {
        name: req.body.name, 
        avatar:req.body.avatar, 
        whatsapp:req.body.whatsapp, 
        bio: req.body.bio

   }
   const classValue = {
        subject: req.body.subject,
        cost: req.body.cost,
    //o proffy id vem do banco de dados 
   }
   const classScheduleValues = req.body.weekday.map((weekday, index) => {
       return {
        weekday,
        time_from: convertHoursToMinutes(req.body.time_from[index]) , 
        time_to: convertHoursToMinutes(req.body.time_to[index])

       }
   })

   try {
    const db = await Database;

    await createProffy(db,{proffyValue, classValue,classScheduleValues})
    let queryString = "?subject=" + req.body.subject
    queryString += "&weekday" + req.body.weekday[0]
    queryString += "time="+ req.body.time_from[0]
     
     /*adicionando dados ao array
     const isNotEmpty = Object.keys(data).length != 0 //Isso transforma as chaves em um array. USando operação ternaria 
     if (isNotEmpty) {
 
         data.subject = getSubject(data.subject)
         proffys.push(data) */
     return res.redirect("/study"+queryString) // Isso monta o endereço da aba 

       
   } catch (error) {
       console.log(error)
       
   }
   
}






module.exports = {
    pageLanding,
    pageGiveClasses,
    pageStudy,
    saveClasses
}