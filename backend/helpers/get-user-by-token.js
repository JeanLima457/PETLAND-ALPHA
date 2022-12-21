const jwt = require ("jsonwebtoken");
const User = require("../models/user");

//Obter usuário a partir do jwt token

const getUserByToken = async (token) => {
    
    if(!token) {
    return res.status(400).json({error: "O usuário não existe!"})
}

    //encontrar usuário
    const decoded = jwt.verify(token, "nossosecret");

    const userId = decoded.id;

    const user = await User.findOne({_id: userId});

    return user;

}

module.exports = getUserByToken;