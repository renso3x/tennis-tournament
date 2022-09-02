import { Match } from "./src"
import { Player } from './src/types'

const p1 = {
    name: 'R. Nadal',
    score: 0
}
const p2 = {
    name: 'D. Medvedev',
    score: 0
}

const match = new Match(p1, p2)

match.pointWonBy(p1)
match.pointWonBy(p2)
// Score 15-15
console.log(match.score())


match.pointWonBy(p1)
match.pointWonBy(p1)
// Score 40-15
console.log(match.score())

match.pointWonBy(p2);
match.pointWonBy(p2);
// Score Deuce
console.log(match.score())


match.pointWonBy(p1);
// Score Advantage player 1"
console.log(match.score())

match.pointWonBy(p1);
// this will return "1-0"
console.log(match.score())