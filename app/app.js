const express = require('express');
const postRouter = require('./routes/postRoutes');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const app = express();
const password = 'CeWsMcG5ZE7hzxur';
const username = 'aditya';
const url = `mongodb+srv://${username}:${password}@mern-stack.cwato.mongodb.net/mern-app?retryWrites=true&w=majority`;

app.use(bodyParser.json())


// localhost:8080/post/
app.use('/post', postRouter)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then((_) => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`App is running at ${PORT}`)
    })
}).catch((err) => {
    console.log('Something went wrong',err)
})

