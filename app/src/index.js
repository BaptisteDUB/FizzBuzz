const prompt = require('prompt-sync')({sigint: true})
const fs = require('fs');
const mongoose = require('mongoose');

// INIT le fichier résultat
fs.writeFileSync('./result/results.txt', '********* ' + new Date().toLocaleString() + ' *********\n', {flag: 'a+'}, err => {console.log(err)})

//INIT CONNECTION
mongoose.connect(process.env.ME_CONFIG_MONGODB_URL, {
    useNewUrlParser: true,
    user: process.env.ME_CONFIG_MONGODB_ADMINUSERNAME,
    pass: process.env.ME_CONFIG_MONGODB_ADMINPASSWORD})

    .then(() => {
        console.log('successfully connected to the database')
        main()
    })
    .catch(err => {
        console.log('error connecting to the database\n' + err)
        process.exit()
    })


function main() {
    //Init du schéma 
    const gameSchema = new mongoose.Schema({
        number: String,
        result: String,
        date: String
      })
    const Game = mongoose.model('games', gameSchema)

    play(Game)
}


function fizzbuzz(number) {

    let nb = Number(number)

    if(!Number.isInteger(nb)) {
        return 'Not an integer'
    }

    if(number%5 === 0 && number%3 === 0){
        return 'FizzBuzz'
    }

    if(number%3 === 0) {
        return 'Fizz' 
    }

    if(number%5 === 0) {
        return 'Buzz'
    }

    return number.toString() 

  }

async function play(Game) {

    let i = prompt("Please enter a number ")

    let result = fizzbuzz(i)

    console.log(`${i} ${result}\n`)

    fs.writeFileSync('./result/results.txt', `${i} ${result}\n`, {flag: 'a+'}, err => {console.log(err)})

    await Game.create({'number': i, 'result': result, 'date': new Date().toLocaleString()})

    play(Game)
}

