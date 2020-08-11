const db = require('./db') // o ./ indica que estou pegando minha pasta atual 
const createProffy = require('./createProffy') //Chamando a importação de função 

db.then( async (db) => {
    //inserir dados
    proffyValue = {
        name: "Lívia Nascimento", 
        avatar:"https://avatars2.githubusercontent.com/u/50409673?s=460&u=e4b29e5e96514bfabb7c8620d43b53a4ac00f959&v=4", 
        whatsapp: "82999557091", 
        bio: "Entusiastas das melhores tecnologias de matemática avançada. Apaixonada por explodir coisas em laboratório e por mudar a vidas pessoas através de experiências. Mais de 200.000 pessoas já passaram por aqui uma das minhas explosões.", subject: "Matemática",
        
    }

    classValue = {
        subject: 6,
        cost: "20",
        //o proffy id vem do banco de dados 
    }
    classScheduleValues = [
        //class_id vem do BD

        {
            weekday:1,
            time_from: 770 , 
            time_to: 1220
        },

        {
            weekday:0,
            time_from: 500 , 
            time_to: 1220
        }
    ]    //consultar dados inseridos 

    //await createProffy(db,{proffyValue,classValue,classScheduleValues})

    //todos os proffys
   const selectedProffys = await db.all("SELECT * FROM proffys")
   //console.log(selectedProffys)
   
   //consultar as classes de um prof especifico 
   //E trazer junto os dados do prof 

   const selectedClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
   `)
   //console.log(selectedClassesAndProffys)

   //O horário que a pessoa trabalha, or exemplo, é das 8h - 18 h
   // O horaário de time_from precisa ser menor ou igual ao horario solicitado 
   // O time_to precisa ser acima 

   const selectClassesSchedule = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id =1
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= 520 
    AND class_schedule.time_to > "420";

   `)
    console.log(selectClassesSchedule)

});