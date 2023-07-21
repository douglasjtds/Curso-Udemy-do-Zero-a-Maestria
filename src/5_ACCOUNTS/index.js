//external modules
const inquirer = require('inquirer')
const chalk = require('chalk')

// internal modules
const fs = require('fs')

//start program
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
                'Transfer',
                'Exit'
            ]
        }
    ]).then((answer) =>{
        const action = answer['action']
        
        if(action === 'Create account')
            createAccount()
        else if (action === 'Check balance')
            getAccountBalance()
        else if (action === 'Deposit')
            deposit()
        else if (action === 'Withdraw')
            withdrawn()
        else if(action === 'Transfer')
            transfer()
        else if (action === 'Exit'){
            console.log(chalk.bgBlue.black('Thanks for using Accounts!'))
            process.exit()
        }
        
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

//add an amount to an user account
function deposit () {
    inquirer.prompt({
        name: 'accountName',
        message: 'Whats the name of your account?'
    }).then((answer) => {
        const accountName = answer['accountName']
        
        if(!checkAccount(accountName))
            return deposit()

        inquirer.prompt([
            {
                name: 'amount',
                message: 'How much do you wanna deposit?'
            }
        ]).then((answer) => {
            const amount = answer['amount']
            addAmount(accountName, amount)

            operation()
        }).catch((err) => console.log(err))
        
    }).catch((err) => console.log(err))
}

///verify if account exists
function checkAccount(accountName){
    if (!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('This account does not exists!'))
        return false
    }
    return true
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount) {
        console.log(chalk.bgRed.black('There was an error, please try again.'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    //write the new account value on json file
    fs.writeFileSync(`accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function(err){
        console.log(err)
    })

    console.log(chalk.green(`The amount of U$${amount} has been deposited into ${accountName}'s account.`))
}

//check account balance
function getAccountBalance(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Whats the name of your account?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        //verify if account exists
        if(!checkAccount(accountName)){
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Your account balance is U$${accountData.balance}`))
        operation()
    })
}

// withdrawn an amount from user account
function withdrawn(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Which account do you want to withdrawn from? '
        }
    ]).then((answer) => {

        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return withdrawn()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'How much do you want to withdrawn?'
            }
        ]).then((answer) => {

            const amount = answer['amount']

            removeAmount(accountName, amount)
            operation()

        }).catch((err) => console.log(err))

    }).catch((err) => console.log(err))
}

function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount) {
        console.log(chalk.bgRed.black('An error has occurred, please try again!'))
        return withdrawn()
    }

    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('Unavailable value.'))
    }
    
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(`accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        }
    )

    console.log(chalk.green(`The amount of U$${amount} has been withdrawn from ${accountName}'s account.`))
}


//bonus exercise
function transfer() {
    inquirer.prompt([
        {
            name: 'originAccountName',
            message: 'From which account do you want to take de money?'
        }
    ]).then((answer) => {
        const accountOrigin = answer['originAccountName']
        if(!checkAccount(accountOrigin))
            return transfer()
        

        inquirer.prompt([{
            name: 'value',
            message: 'How much do you want to transfer?'
        }]).then((answer) => {
            
            const valueToBeTransferred = answer['value']

            if(getAccount(accountOrigin).balance < valueToBeTransferred){
                console.log(chalk.bgRed.black('Unavailable value.'))
                return transfer()
            }

            inquirer.prompt([{
                name: 'destineAccountName',
                message: 'Which account will the money be transferred to?'
            }]).then((answer) => {
                const destinAccount = answer['destineAccountName']
                if(!checkAccount(destinAccount))
                    return transfer()
                
                removeAmount(accountOrigin, valueToBeTransferred)
                addAmount(destinAccount, valueToBeTransferred)
                operation()
                
            }).catch((err) => console.log(err))

        }).catch((err) => console.log(err))

    }).catch((err) => console.log(err))
}