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

app.get('/ista', (req, res) => {
    axios.get(url).then((response) => {
        const data = response.data
        const ista = data.match(/[a-zA-Z]+ista/g)
        const json = JSON.stringify(ista)
        res.send(json)
    })
})

app.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST} and on port ${PORT}`)
})