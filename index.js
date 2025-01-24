//Selecionando os elementos do document sem criar variáveis:

let fields = document.querySelectorAll('#form-user-create [name]')
let user = {} //Criando o objeto que terá as informações dinamicamente preenchidas no formulário
let form = document.querySelector('#form-user-create')


console.log(fields)
form.addEventListener('submit', (e) => {
    e.preventDefault()

    fields.forEach((field) => {

        //Criando uma condição e selecionando apenas o input radio que está checked
        if (field.name === 'gender') {

            if (field.checked) {

                //Adiciona ou atualiza uma propriedade no objeto User
                user[field.name] = field.value
            }

        } else {
            user[field.name] = field.value
        }
    })

    console.log(user)
})