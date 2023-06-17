//more then one value
const x = 10
const y = "Douglas"
const z = [1, 2] 

console.log(x,y,z)

// counting prints
console.count(`O valor de x é: ${x}, contagem: ` )
console.count(`O valor de x é: ${x}, contagem: ` )
console.count(`O valor de x é: ${x}, contagem: ` )
console.count(`O valor de x é: ${x}, contagem: ` )

// variable between a string
console.log('O nome dele é %s, ele é um programador', y)

// cleaning console
setTimeout(() => {
    console.clear()
}, 5000)
