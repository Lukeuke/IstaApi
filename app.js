require('dotenv').config()

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || 'localhost'
const { default: axios } = require('axios')
const express = require('express')
const app = express()

const url = 'https://raw.githubusercontent.com/sigo/polish-dictionary/master/dist/pl.txt'

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api', (req, res) => {

    var queryParam = req.query;
    var word = queryParam.word

    if(!word) {
        res.json({
            error: 'No word provided'
        })
        return
    }

    console.log(word)

    axios.get(url).then((response) => {
        const data = response.data

        // find words in data that are ending on specific word from query
        const words = data.split('\n').filter(w => w.endsWith(word))

        console.log(words)

        res.send(words)
    })
})

app.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST} and on port ${PORT}`)
})