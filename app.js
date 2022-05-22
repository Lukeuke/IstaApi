require('dotenv').config()

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || 'localhost'
const { default: axios } = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()

const url = 'https://raw.githubusercontent.com/sigo/polish-dictionary/master/dist/pl.txt'

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api', (req, res) => {

    res.setHeader('content-type', 'application/json');

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

app.post('/dictionary', (req, res) => {

    const item = [];
    var desc;

    const { word } = req.body;

    if(!word) {
        res.status(418).send({error: 'no word provided'})
        return
    }

    console.log(word)

    let encoded = encodeURI(word);

    axios('https://sjp.pl/' + encoded).then(response => {

        const html = response.data
        const $ = cheerio.load(html)

        $('p').each(function() {
            item.push($(this).text())
        })

        desc = item[3]

        console.log(desc)  
        
        res.status(200).send({
            word: word,
            description: desc
        })
    }).catch((error) => {
        res.json({
            error: error
        })
        return
    })

})

app.post('/urban', (req, res) => {

    const { word } = req.body

    const exampleArr = [];
    const descriptionArr = [];
    var example
    var description
    var contributor

    console.log(word)

    if(!word) return res.status(418).send({error: 'no word provided'})

    axios(`https://www.urbandictionary.com/define.php?term=${word}`).then(response => {

        const html = response.data
        const $ = cheerio.load(html)

        $('.example').each(function() {
            exampleArr.push($(this).text())
        })
        $('.meaning').each(function() {
            descriptionArr.push($(this).text())
        })
        $('.contributor').each(function() {
            contributor = $(this).text()
        })
      
        example = exampleArr[0];
        description = descriptionArr[0];
                
        res.status(200).send({
            word: word,
            description: description,
            example: example,
            contributor: contributor
        })
    }).catch(error => {
        res.status(404).send({
            error: `No definition for word: ${word}`,
            status_from_urban: error.response.status
        })
    })

})

app.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST} and on port ${PORT}`)
})