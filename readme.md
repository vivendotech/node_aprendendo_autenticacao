
# Autenticação

O processo de autenticação é o processo que garantir ao longo do tempo que algo é VALIDO. Validação é o processo de tornar algo verdadeiro!



Segundo o dicionario:
- autenticar, garantir a autenticidade de, reconhecer como verdadeiro. (ao longo do tempo). Técnicas de autenticação por exemplo OAuth, JWT.
- validar, tornar(-se) ou declarar(-se) válido, conforme aos preceitos vigentes; legitimar(-se) (instantaneo)



# Inicializando o projeto
Passos necessários para inicializar o projeto

## Instalando as bibliotecas necessárias
É necessario a biblioteca:
- express, para ser os ervidor http
- epxress-session, que é o modulo midleware que lida com autenticações do tipo Cookie (temos que ver essa informação)
- body-parser, que é um modulo midleware que lida com a captação dos dados que vem do site.

Para  instalar elas no seu projeto use
```
npm install express
npm install express-session
npm install body-parser
```


Ou para inicializer esse projeto use para instlar as bibliotecas do package.json
```
npm install
```

# Construir a aplicação base

É necessário cosntruir a aplicação base. É aplicação aplicaçã sem bloqueios de rota


# Configurando os parametros da autenticação

O segundo passo é configurar os parametros necessários para a autenticação. 
```js
const {
    PORT = 3000,
    SESS_LIFETIME = TWO_HOURS,
    NODE_ENV = "development",
    SESS_NAME = "sid",
    SESS_SECRET= "oi mundo sou seguro"

} = process.env
```
e
```js
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
```

# Construir midlewares e aplicar em rotas expecificas

É necessário construir midlewares para aplicar em rotas expecificas. Isso permite que a se trave as rotas caso não tenha uma autenticação.
```js
const redirectLogin = ( req, res, next) =>{
    // se a sessão não tem usuario, redirecionar para a rota login.
    if(!req.session.userId){
        res.redirect("/login")
    }else{
        //comando para continuar
        next()
    }

}

```
Aplicando o middleware em rotas especificas
```js
//redirectLogin, é o middleware aplicado
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

```








// apartir do 19 quie ele estala o bodyparser ele começa falar sobre restrição de rotas
// inicio rotas 






# Conhecimento necessário
Assuntos que devem ser tratados com antecedencia a esse. Facilitariam o entendimento de como funciona o express.

- O que é um midleware


# Coisas a serem feita
- Implementar a validação feita por um banco de dados (validação apenas do array alocado na memoria da aplicação)
- Criptografando senhas
- Implementar outra forma de autenticação (e.g. JWT)

#  Conhecimento suplementar

- desestruturando um dicionario (destructuring)
- Método [Array.some](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- Método [Array.filter](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filtro)





# Referencias



# Apendice 1
Destruturando ariaveis do ambiente, variaveis que podem ser passadas por um terminal, usando o método de desestruração.

```js
const {
    PORT = 3000
    SESS_LIFETIME = TWO_HOURS
} = process.env

```
