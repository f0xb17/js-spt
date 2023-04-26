'use strict';

const fs                    = require('fs');
let participant             = []
let winner                  = []
let possibleWinner          = ''

async function init (args) {
    return new Promise ((resolve, reject) => {
        if (typeof args.path === 'undefined' || args.path === '') {
            reject()
        }
        if (typeof args.runtime === 'undefined' || args.runtime === '') {
            reject()
        } 
        if (typeof args.path === 'string' && typeof args.runtime === 'number') {
            for (let x = 0; x < args.runtime; x++) {
                possibleWinner = get(args.path)
    
                if (winner.includes(possibleWinner)) {
                    x--
                } else {
                    winner.push(possibleWinner)
                }
            }
            resolve(winner)
        }
    })
}

function get (path) {
    let data = fs.readFileSync(path, 'utf-8')
    if (typeof data === 'undefined' || data === '') {
        throw new Error ('Input source is incorrect or empty!')
    } else {
        participant = data.split(',')
    }
    return participant[Math.floor(Math.random() * participant.length)]
}



init({ path: './src/test.txt', runtime: 3 }).then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})