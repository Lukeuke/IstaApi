# IstaApi
Api made to search words which ends with provided ending in polish dictionary

## Installation

```console
git clone https://github.com/Lukeuke/IstaApi.git
```

```console
npm install
```

1. Rename file called '.env-example' to '.env'
1. In 'PORT=your_port_number' goes your port number
1. In 'HOST=ip_address' goes your host for example: localhost
1. To start the api type
```console
node app.js
```

## Endpoints

### Get
- <a href="http://localhost:3000/api?word=ista"> /api?word=your_word </a> <br>
`Searches all the dictionary for specific ending of word`

### Post
- <a href="http://localhost:3000/dictionary"> /dictionary </a> <br>
`Searches the definition of word provided in json from sjp.pl` <br>
In request body you must provide json:

```json
{
  "word" : "your_word"
}
```

Response:
```json
{
    "description": "example_descritpion"
}
```

-  <a href="http://localhost:3000/urban"> /urban </a> <br>
`Searches definition, example and contributor of provided word from urandictionary.com`
`In request body you must provide:`

```json
{
    "word" : "wtf"
}
```

Response:
```json
{
    "description": "description for word",
    "example": "example for word",
    "contributor": "contributor for word"
}
```



## License
<a href="https://github.com/Lukeuke/IstaApi/blob/main/LICENSE" target="_blank"> MIT </a>
