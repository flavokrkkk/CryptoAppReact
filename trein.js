//Метод find - в работе

// const arr = [200, 4, 2, 55, 6, 8, 9]

// const v = arr.find(el => el > 10 && el < 100)
// console.log(v)

const arr = [
    {
        age: 17,
        name: 'Egor',
    },

    {
        age: 15,
        name: 'Andry',
    },

    {
        age: 13,
        name: 'Misha',
    },

    {
        age: 20,
        name: 'Alex',
    },

    {
        age: 23,
        name: 'Bob',
    },

    {
        age: 32,
        name: 'Harry',
    },
]

const f = arr.find(el => el.age === 20)

console.log(f)