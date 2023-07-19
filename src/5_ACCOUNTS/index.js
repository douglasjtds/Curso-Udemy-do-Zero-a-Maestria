//external modules

const inquirer = require('inquirer')
const chalk = require('chalk')

// internal modules
const fs = require('fs')

operation()

function operation(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                'Create account',
                'Check balance',
                'Deposit',
                'Withdraw',
                'Exit'
            ]
        }
    ]).then((answer) =>{
        const action = answer['action']
        
        if(action === 'Create account')
            createAccount()
        
    })
    .catch((err) => console.log(err))
}

//create an account
function createAccount(){
    console.log(chalk.bgGreen.black('Thanks for choosing our bank!'))
    console.log(chalk.green('Set your account options below:'))

    buildAccount()
}

function buildAccount() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Type your account name: '
    }]).then((answer) => {
        const accountName = answer['accountName']
        console.info(accountName)

        if(!fs.existsSync('accounts')) 
            fs.mkdirSync('accounts')
        

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('This account already exists, choose another account name!'))
            buildAccount()
            return
        }
        
        fs.writeFileSync(
            `accounts/${accountName}.json`,
             '{"balance": 0}',
             function (err){
                console.log(err)
             }
        )
        console.log(chalk.green('Congrats, your account has been created!'))
        operation()

    }).catch((err) => console.log(err))
}