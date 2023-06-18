const chalk = require('chalk')

const grade = 5

if(grade >= 7) {
    console.log(chalk.green.bold('Parabéns, você foi aprovado!'))
} else {
    console.log(chalk.bgRed.bold('Você precisa fazer a prova de recuperação!'))
}