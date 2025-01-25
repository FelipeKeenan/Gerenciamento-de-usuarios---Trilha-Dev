//Selecionando os elementos do document sem criar variáveis:

let fields = document.querySelectorAll('#form-user-create [name]')
let user = {} //Criando o objeto que terá as informações dinamicamente preenchidas no formulário
let form = document.querySelector('#form-user-create')

function addLine(dataUser) {
    let tr = document.createElement('tr')
    document.querySelector('#table-users').appendChild(tr)

    tr.innerHTML = `
     <tr>
                      <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
                      <td>${dataUser.name}</td>
                      <td>${dataUser.email}</td>
                      <td>${dataUser.admin}</td>
                      <td>${dataUser.birth}</td>
                      <td>
                        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                      </td>
                    </tr> 
    `

}


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

    addLine(user)
})