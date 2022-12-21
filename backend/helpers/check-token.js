const jwt = require("jsonwebtoken");

//middleware para validar o token

const checkToken = (req, res, next) => {
    
    const token = req.header("auth-token");

    if(!token) {
        return res.status(401).json({error: "Acesso Negado!"});
    }
        try {

            const verified = jwt.verify(token, "nossosecret");
            req.user = verified;
            next(); // continua

        } catch(err) {

            res.status(400).json({error: "O token é inválido"}); 

        }
}

module.exports = checkToken;



