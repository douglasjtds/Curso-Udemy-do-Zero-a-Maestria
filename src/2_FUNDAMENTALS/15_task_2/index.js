const chalk = require('chalk');
const inquirer = require('inquirer');

inquirer.prompt([
  {
    name: 'name',
    message: "What's your name? ",
  },
  {
    name: 'age',
    message: "What's your age? ",
  },
])
.then((answers) => {
    if(!answers.name || !answers.age){
        throw new Error(chalk.red('Name and age are required properties!'))
    }
    console.log(chalk.bgYellow.black(`Your name is ${answers.name}, and your age is ${answers.age}`))
}
)
.catch((err) => console.log(err));