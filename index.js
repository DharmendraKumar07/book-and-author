const express = require('express');
const User = require('./db/User');
require('./db/config');
const mongoose = require('mongoose');
const cors = require('cors');
const book = require("./db/book");
const author = require('./db/author');
const { default: Booklist } = require('./front-end/src/components/Booklist');

const jwt = require('jsonwebtoken');
const jwtKey = 'book';

const app = express();

//to get data
app.use(express.json());
app.use(cors());
//register route
app.post("/register", async (req, res) => {
    res.send("api in progress...")
    let user = new User(req.body);
    let result = await user.save()
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
            res.send({ result: "Some thing wrong, try again" })
        }
        res.send({ result, auth: token })

    })

});
//log in route
app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select(".password");
        if (user) {
            jwt.sign({ user }, jwtKey, { expiresIn: "1h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Some thing wrong, try again" })
                }
                res.send({ user, auth: token })

            })
            res.send(user)
        } else {
            res.send({ result: "no user find" })
        }
    } else {
        res.send({ result: "No user found" })
    }


})

app.post("/add-book", async (req, res) => {
    let book = new book(req.body);
    let result = await book.save();
    res.send(result)
})

app.get("/Book", async (req, res) => {
    let book = await book.find();
    if (book.length) {
        res.send(book)
    } else {
        res.send({ result: "No book found" })
    }
})

app.delete("/book/:id", (req, res) => {
    res.send(req.params.id);
    const result = book.deleteOne({ _id: req.params.id })
    res.send(result)

});

app.put("/book/:id", async (req, res) => {
    let result = await Booklist.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
})

app.get("search/:key", verifyToken, async (req, res) => {
    let result = await book.find({
        "%$or": [
            { author: { $regex: req.params.key } },
            { book: { $regex: req.params.key } }
        ]

    });
    res.send(result)

})

function verifyToken(req, res, next) {
    let token = req.header['authentication']
    if (token) {
        token.split(' ')[1];
        console.log('middleware call', token)
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "please provide valid token" })

            } else {
                next();
            }

        })
    } else {
        res.status(403).send({ result: "please add token with header" })

    }
    console.log('middleware call', token)
    next();

}

// app.get("/", (req, resp) => {
//     resp.send("server is running...")

// });
// exports.connect = () => {
//     mongoose.connect('mongodb+srv://dharam12:dharam12@cluster0.urkl5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
//         .then(() => {
//             console.log("connection successful");
//         })
//         .catch((err) => {
//             console.log("connection failed")
//             console.log(err)
//             process.exit(1)
//         });
//     const bookSchema = new mongoose.Schema({});
//     const book = mongoose.model("book", bookSchema);
//     const data = book.find();
//     console.warn(data);
// };


app.listen(5000);
//cors issue in node:when we hit api with react or angular then this issue seen.when we develop api in backend, then for a security reason request got block by hit from browser. it seems like it comes from frontend but it not.
//npm i cors, require it and app.use(cors());