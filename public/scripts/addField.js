
//Procurar botão
        document.querySelector("#add-time")
        .addEventListener('click', cloneField)

//Quando clicar no botão
// executar ação
function cloneField(){
        // Duplicar os campos
        const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);

        // Antes de colocar na page, limpar os campos: Que campos?
        const fields = newFieldContainer.querySelectorAll('input')        // colocar na página: Onde?

        //Limpar para cada campo 
        fields.forEach(function(field) {
                //pegar o field do momento
                field.value=""
        });
        //Onde por na page
        document.querySelector('#schedule-items').appendChild(newFieldContainer)
}
