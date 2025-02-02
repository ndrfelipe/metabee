const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

// MongoDB é um NoSQL
const LoginSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    email: { type: String, required: true},
    senha: { type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login{
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register(){
        this.valida();
        if(this.errors.length > 0) return;

        await this.userExists();

        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

        try{
            
            this.user = await LoginModel.create(this.body);
        }catch(e){
            console.log(e)
        }
        
    }

    async userExists(){
        const user = await LoginModel.findOne({ email: this.body.email });
        if (user) this.errors.push("Email já cadastrado.")
    }

    valida(){
        this.cleanUp(); 

        if(!validator.isEmail(this.body.email)) this.errors.push('Email Inválido');
        if(this.body.senha.length < 3 || this.body.senha.length > 50) this.errors.push('Senha precisa ter entre 3 e 50 caracteres');

    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            email: this.body.email,
            senha: this.body.senha
        }
    }
};

module.exports = Login;