const express = require("express")

const session = require("express-session")

const bodyParser = require("body-parser");

const TWO_HOURS = 1000 * 60 * 60 * 2;

// nao precisa passar os argumentos pela linha de comando
const {
    PORT = 3000,
    SESS_LIFETIME = TWO_HOURS,
    NODE_ENV = "development",
    SESS_NAME = "sid",
    SESS_SECRET= "oi mundo sou seguro"

} = process.env

// console.log(process)
const app = express()

// construindo nosso proprio midleware
//ao usar om etodo use a gente adiciona esse midleware em todas as rotas do express.

app.use((req, res, next)=>{
    console.log("Oi mundo")
    next();
})


const IN_PROD = NODE_ENV === "production"

app.use(bodyParser.urlencoded({
    extended: true

}))

app.use(session({
    name:SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    // store: "mongo"
    cookie:{
        maxAge: SESS_LIFETIME, //tempo maximo que o cookie vai ficar autenticado milesegundos
        sameSite: true,
        secure: IN_PROD
    }

}))

//  até aqui configuração
// midleware' https://expressjs.com/pt-br/guide/using-middleware.html
const redirectLogin = ( req, res, next) =>{
    if(!req.session.userId){
        res.redirect("/login")
    }else{
        next()
    }

}

const redirectHome = ( req, res, next) =>{
    if(req.session.userId){
        res.redirect("/home")
    }else{
        next()
    }

}
// https://www.youtube.com/watch?v=OH6Z0dJ_Huk
//  até os 12 minutos ele fala somento sobre configuração da session/autenticacao
// refatorar para rotas
// mecher no arquivo .env
// testar no heroku

//  até o minuto 20 ele fala escreve a aplicação base, sem bloqueios na tora
// apartir do 19 quie ele estala o bodyparser ele começa falar sobre restrição de rotas
// inicio rotas 


// a´te o minuto 23 ele cria o midleware
//depois ele começa a criar as rotas

// aos 28 minutos ele fala sobre os sinais que o midleware session possui

const users = [
    { id: 1, name:"joao", email:"dale@gmail.com", password: "segredo"},
    { id: 2, name:"jefrey", email:"dalejefrey@gmail.com", password: "segredo"},
    { id: 3, name:"lumus", email:"dalelumus@gmail.com", password: "segredo"},
]

app.get("/", (req,res)=>{
    console.log(req.session)

    let {userId} = req.session

    // userId = 1
    res.send(`
    <h1> OI MUDNO </h1>
    ${userId ? 
    `    
    <a href="/home">  Pagina casa </a>
    <form method="post" action="/logout">
     <button> Logout </button>
    </form> `
    : 
    `<a href="/login"> Login </a>
    <a href="/register"> Registro </a>
    `}`)

})

//  area exclusiva para o usuario
app.get("/home", redirectLogin, (req,res)=>{

    const user = users.find(user => user.id === req.session.userId)

    res.send(`
    <h1> Home </h1>
    <a href="/"> Pagina inicia </a>
    <ul>
        <li> Name: ${user.name}</li>
        <li> Email: ${user.email}</li>
    </ul>
    `)

})


function faz_validacao(){
    // conversa com o banco de dados
    return 1;
}

app.get("/login", redirectHome, (req,res)=>{
    res.send(`
    <h1>Login </h1>
    <form method="post" action="/login">
    <input type="email" name="email" placeholder="Coloque seu email"> </input>
    <input type="password" name="password" placeholder="Sua senha"> </input>
     <button type="submit"> Logue </button>
    </form> 
    `)
    // faz a validação

    // req.session.userId = faz_validacao();


})

app.get("/register", redirectHome, (req,res)=>{

    res.send(`
    <h1>Register </h1>
    <form method="post" action="/register">
    <input type="name" name="name" placeholder="Coloque seu email" required> </input>
    <input type="email" name="email" placeholder="Coloque seu email" required> </input>
    <input type="password" name="password" placeholder="Sua senha" required> </input>
    <button type="submit"> Registrese </button>
    </form> 
    `)
    
    
})

app.post("/login",redirectHome, (req,res)=>{
    //destruturação
    const {email, password} = req.body

    if(email && password){
        // fala com o banco de dados
        //  hash
        const user = users.find( user => user.email === email && user.password == password)

        if(user){
            req.session.userId = user.id
            return res.redirect("/home")
        }

    }

    res.redirect("/login")
    

})

app.post("/register", redirectHome, (req,res)=>{
    const {name, email, password} = req.body

    if(name && email && password){  //validaçao
        //some
        const exists = users.some(
            user => user.email === email
        )
        if(!exists){
            const user = {
                id: users.length +1,
                name,
                email,
                password  //hash
            }
            users.push(user)
            req.session.userId = user.id
            return res.redirect("/home")
        }
    }


    

    return res.redirect("/register")

    // query errors
    
})

app.post("/logout", redirectLogin,  (req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.redirect("/home")
        }else{
            res.clearCookie(SESS_NAME)
            res.redirect("/login")
        }

    })
    
})








app.listen(PORT , ()=>{console.log(`http://localhost:${PORT}`)})


