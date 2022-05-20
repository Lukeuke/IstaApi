# IstaApi
Api made to search words which ends with provided ending in polish dictionary

## Installation

```bash
git clone https://github.com/Lukeuke/IstaApi.git
```

```bash
npm install
```

1. Rename file called '.env-example' to '.env'
1. In 'PORT=your_port_number' goes your port number
1. In 'HOST=ip_address' goes your host for example: localhost
1. To start the api type
```bash
node app.js
```

## How to use
http://localhost:3000/api?word=word_to_choose 'word_to_choose' is your word that ends with, what you provided,
<br> after this query, API returns json array of elements 


## License
<a href="https://github.com/Lukeuke/IstaApi/blob/main/LICENSE" target="_blank"> MIT </a>
