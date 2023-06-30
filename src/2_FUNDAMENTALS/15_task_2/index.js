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
.then((answers) =>
    console.log(chalk.bgYellow.black(`Your name is ${answers.name}, and your age is ${answers.age}`))
)
.catch((err) => console.log(err));