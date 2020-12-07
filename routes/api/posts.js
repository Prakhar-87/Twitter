const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../../schemas/UserSchema");
const Post = require("../../schemas/PostSchema");

app.set("view engine","pug");
app.set("views","views");   

app.use(bodyParser.urlencoded({extended: false}));

router.get("/", (req, res, next) => {

})

router.post("/", async (req, res, next) => {
    if(!req.body.content){
        console.log("Unable to Find Content");
        return res.sendStatus(400);
    }

    var postData = {
        content: req.body.content,
        postedBy: req.session.user
    }

    Post.create(postData)
    .then(async newPost => {
         newPost = await User.populate(newPost, {path: "postedBy"})

        res.status(201).send(newPost);
    }).catch(err => {
        console.log(err)
        return res.sendStatus(400);
    })

})

module.exports = router;