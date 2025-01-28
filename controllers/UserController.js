class UserController {

    constructor(formId, tableId) {

        //Pegando um formulário dinâmico
        this.formEl = document.getElementById(formId)
        this.tableEl = document.getElementById(tableId)
        this.onSubmit()
        this.onEdit()
    }

    onEdit() {

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", () => {

            this.showPanelCreate()

        })

    }

    onSubmit() {

        this.formEl.addEventListener('submit', (e) => {
            e.preventDefault()

            //Selecionando o botão e travando ele
            let btn = this.formEl.querySelector('[type=submit]')

            btn.disabled = true;

            let values = this.getValues()

            if (!values) return false;

            this.getPhoto().then(
                (content) => {

                    values.photo = content

                    this.addLine(values)

                    this.formEl.reset()

                    btn.disabled = false

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
            if (file) {
                fileReader.readAsDataURL(file)
            } else {
                resolve('dist/img/boxed-bg.jpg')
            }
        })
    } //Fechando método getPhoto




    // Método que percorre todos os elementos do formulário para criar um objeto user com os valores dos campos
    getValues() {

        let user = {}
        var spread = [...this.formEl.elements] //Variável que será possível utilizar o forEach -> tornando um array
        let isValid = true


        //Percorre todos os inputs
        spread.forEach((field) => {

            //Verificando e validando se há nos elementos dos inputs algum campo com 'name', 'email' ou 'password'
            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {

                //Acessando a tag pai e inserindo uma classe nova nela para deixar o ''border'' = red
                field.parentElement.classList.add('has-error')
                isValid = false

                return false;
            }

            //Criando uma condição e selecionando apenas o input radio que está checked
            if (field.name === 'gender') {

                if (field.checked) {

                    //Adiciona ou atualiza uma propriedade no objeto User
                    user[field.name] = field.value
                }

            } else if (field.name == 'admin') {

                user[field.name] = field.checked

            }
            else {

                user[field.name] = field.value

            }
        })

        if (!isValid) {
            return false
        }

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
    addLine(dataUser) {
        let tr = document.createElement('tr')
        tr.dataset.user = JSON.stringify(dataUser)

        this.tableEl.appendChild(tr)
        tr.innerHTML = `
                      <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                      <td>${dataUser.name}</td>
                      <td>${dataUser.email}</td>
                      <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
                      <td>${Utils.dateFormat(dataUser.register)}</td>
                      <td>
                        <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                      </td> 
    `

        tr.querySelector(".btn-edit").addEventListener("click", (e) => {

            console.log(JSON.parse(tr.dataset.user))

            this.showPanelUpdate()

        })

        this.updateCount()
    } //Fechando o método addLine

    showPanelCreate() {
        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";

    }

    showPanelUpdate() {

        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";
    }



    updateCount() {

        let numberUsers = 0
        let numberAdmin = 0
        let tableChildren = [...this.tableEl.children]

        tableChildren.forEach(tr => {

            numberUsers++;

            let user = JSON.parse(tr.dataset.user)

            if (user._admin) numberAdmin++;



        })

        document.querySelector('#number-users').innerHTML = numberUsers
        document.querySelector('#number-users-admin').innerHTML = numberAdmin

    } //Fechando o método updateCount

}
