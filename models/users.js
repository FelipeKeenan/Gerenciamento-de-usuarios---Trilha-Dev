class User {

    constructor(name, gender, email, birth, country, password, photo, admin) {
        this._name = name
        this._gender = gender
        this._email = email
        this._birth = birth
        this._country = country
        this._password = password
        this._photo = photo
        this._admin = admin
        this._register = new Date()
    }


    //Getters de cada propriedade

    get register() {
        return this._register
    }

    get name() {
        return this._name
    }
    get gender() {
        return this._gender
    }
    get email() {
        return this._email
    }
    get birth() {
        return this._birth
    }
    get country() {
        return this._country
    }
    get password() {
        return this._password
    }
    get photo() {
        return this._photo
    }
    get admin() {
        return this._admin
    }

    set photo(value) {
        this._photo = value
    }

}