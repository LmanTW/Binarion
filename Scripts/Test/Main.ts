let string = ''

for (let i = 0; i < 1000; i++) string += (Math.random() > 0.5) ? '0' : 1

console.log(string)
