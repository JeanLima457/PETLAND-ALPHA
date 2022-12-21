const router = require("express").Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");

const Party = require("../models/party");
const User = require ("../models/user")

//definindo o arquivo do armazenamento
const diskStorage = require("../helpers/file-storage");
const upload = multer ({storage: diskStorage});


//middlewares
const verifyToken = require("../helpers/check-token");

//helpers
const getUserByToken = require("../helpers/get-user-by-token");


//create new party
router.post("/", verifyToken, upload.fields([{name: "photos"}]), async (req, res) => {

    //req data
    const title = req.body.title;
    const description = req.body.description;
    const partyDate = req.body.party_date;

    let files = [];

    if(req.files) {
        files = req.files.photos;
    }

    //validation
    if(title == "null" || description == "null" || partyDate == "null") {
        return res.status(400).json({ error: "Preencha pelo menos nome, descrição e data."})
    }

    //verificar o usuário 
    const token = req.header("auth-token");

    const userByToken = await getUserByToken(token);

    const userId = userByToken._id.toString();

    try {

        const user = await User.findOne({ _id: userId });
        
        //create photos array with image path
        let photos = [];

        if(files && files.length > 0 ){

            files.forEach((photo, i) => {
                photos[i] = photo.path;
                
            });
        }

        const party = new Party ({
            title: title,
            description: description,
            partyDate: partyDate,
            photos: photos,
            privacy: req.body.privacy,
            userId: user._id.toString()
        });

        try {

        const newParty = await party.save();
            res.json({ error: null, msg:"Evento criado com sucesso!", data: newParty});


        }catch(err) {
            return res.status(400).json({ error});

        }

    
 
    
    } catch(err) {
        return res.status(400).json({ error: "Acesso negado"})

    }

});

//obter festas públicas
router.get("/all", async (req, res) => {

    try {
        const parties = await Party.find({privacy: false}).sort([[ '_id', -1]]);
        res.json({error: null, parties: parties});

    }catch(err) {
        return res.status(400).json({error});
    }

});

//obter todos as festas dos usuários 
router.get("/userparties", verifyToken, async (req, res) => {

    try{

    const token = req.header("auth-token");

    const user = await getUserByToken(token);

    const userId = user._id.toString();

    const parties = await Party.find({ userId: userId});
    res.json({error:null, parties:parties});

    } catch(error) {
        return res.status(400).json({error});
    }
});

//obter a festa do usuário
router.get("/userparty/:id", verifyToken, async (req, res) => {

    try {
        const token = req.header("auth-token");

        const user = await getUserByToken(token);

        const userId = user._id.toString();
        const partyId = req.params.id;

        const party = await Party.findOne({_id: partyId, userId})
        res.json({error: null, party: party});


    }catch(error) {

        return res.status(400).json({error});

    }

})
//obter festas (públicas ou privadas)
router.get("/:id", async (req, res) => {
    
    try {

    //encontrar festas
    const id = req.params.id;
    const party = await Party.findOne({_id: id});

    //festa pública
    if(party.privacy === false) {
        res.json({error: null, party: party})


    //festa privada
    }else{

        const token = req.header("auth-token");

        const user = await getUserByToken(token);

        const userId = user._id.toString();
        const partyUserId = party.userId.toString();

        // Verificar se o id do usuário está correspondendo ao id da festa
        if(userId == partyUser) {
            res.json({error: null, party: party})
        }

    }

    } catch(err) {
        return res.status(400).json({error:"O evento não existe"});

    }

})

//delete a festa

router.delete("/", verifyToken, async (req, res) => {

    const token = req.header("auth-token");
    const user = await getUserByToken(token);
    const partyId = req.body.id;
    const userId = user._id.toString();

    try {
        await Party.deleteOne({_id: partyId, userId: userId});
        res.json({error: null, msg: "Evento removido com sucesso!"})
    
    } catch(error) {
        res.status(400).json({error: "Acesso Negado"})    
    }

})


//Atualizar a festa

router.put("/", verifyToken, upload.fields([{name: "photos"}]), async (req, res) => {

    //req body 
    const title = req.body.title;
    const description = req.body.description;
    const partyDate = req.body.partyDate;
    const partyId = req.body.id;
    const partyUserId = req.body.user_id;

    let files = [];

    if(req.files) {
        files = req.files.photos;
    }

    //validation
    if(title == "null" || description == "null" || partyDate == "null") {
        return res.status(400).json({ error: "Preencha pelo menos nome, descrição e data."})
    }


    // verificar usuário

    const token = req.header("auth-token");

    const userByToken = await getUserByToken(token);

    const userId = userByToken._id.toString();

    if(userId != partyUserId) {
        return res.status(400).json({error: "Acesso negado!"});
 
    }

    // construir um objeto da festa

    const party = {
        id: partyId,
        title: title,
        description: description,
        partyDate: partyDate,
        privacy: req.body.privacy,
        userId: userId
    }

    //create photos array with image path
     let photos = [];

        if(files && files.length > 0 ){
    
            files.forEach((photo, i) => {
                 photos[i] = photo.path;  
                });
                party.photos = photos;
        }

        try{
            //retornar o arquivo colocado
            const updatedParty = await Party.findOneAndUpdate({_id: partyId, userId: userId}, {$set: party}, {new: true})
            res.json({error:null, msg: "Evento Atualizado com Sucesso!", data: updatedParty})
        }catch (error) {

            res.status(400).json({error});
        }


    






})


module.exports = router;