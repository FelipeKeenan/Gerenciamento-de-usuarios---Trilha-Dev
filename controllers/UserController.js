class UserController {

    constructor(formId, tableId) {

        //Pegando um formulário dinâmico
        this.formEl = document.getElementById(formId)
        this.tableEl = document.getElementById(tableId)
        this.onSubmit()
    }

    onSubmit() {

        this.formEl.addEventListener('submit', (e) => {
            e.preventDefault()

            let values = this.getValues()

            this.getPhoto().then(
                (content) => {

                    values.photo = content

                    this.addLine(values)


                }, (e) => {
                    console.error(e)
                }
            )
        })

    } //Fechando o método OnSubmit

    getPhoto() {


        return new Promise((resolve, reject) => {
            let fileReader = new FileReader() //variável que irá armazenar o objeto nativo FileReader

            let spread = [...this.formEl.elements]

            let elements = spread.filter(item => {
                if (item.name === "photo") {

                    return item
                }

            })


            let file = (elements[0].files[0])

            //função/callback quando carregar a foto
            fileReader.onload = () => {

                resolve(fileReader.result)

            }

            fileReader.onerror = (e) => {
                reject(e)
            }

            fileReader.readAsDataURL(file)

        })


    }




    // Método que percorre todos os elementos do formulário para criar um objeto user com os valores dos campos
    getValues() {

        let user = {}
        var spread = [...this.formEl.elements] //Variável que será possível utilizar o forEach -> tornando um array


        //Percorre todos os inputs
        spread.forEach((field) => {

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

        //Criando o objeto instanciado da classe User / Model
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        )
    } //Fechando o método get Values

    //Método que irá criar uma ''linha'' no documento com as informações dos inputs
    addLine(dataUser, tableId) {
        let tr = document.createElement('tr')
        this.tableEl.appendChild(tr)
        tr.innerHTML = `
                      <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                      <td>${dataUser.name}</td>
                      <td>${dataUser.email}</td>
                      <td>${dataUser.admin}</td>
                      <td>${dataUser.birth}</td>
                      <td>
                        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                      </td> 
    `
    } //Fechando o método addLine

}
