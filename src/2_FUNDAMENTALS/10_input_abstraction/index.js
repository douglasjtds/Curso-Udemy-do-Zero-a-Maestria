const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      name: "p1",
      message: "Qual a primeira nota? ",
    },
    {
      name: "p2",
      message: "Qual a segunda nota? ",
    },
  ])
  .then((answers) => {
    console.log(answers);
    const average = (parseInt(answers.p1) + parseInt(answers.p2)) / 2;

    console.log(`A média das notas é ${average}`);
  })
  .catch((err) => console.log(err));
