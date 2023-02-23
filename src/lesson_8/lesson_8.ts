// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
    return nums.reduce((a, b) => a + b)
}

// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
    if (b + c < a || a + b < c || a + c < b) {
        return '00'
    } else if (a === b && a === c) {
        return '10'
    } else if (a === b || a === c || b === c) {
        return '01'
    }
    return "11"
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
    let res = '' + number
    return res.split('').reduce((a, b) => (+a) + (+b), 0)
}


// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    let evenSum = 0
    let oddSum = 0
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            evenSum += arr[i]
        } else {
            oddSum += arr[i]
        }
    }
    return evenSum > oddSum
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    let resArr = []
    for (let i = 0; i < array.length; i++) {
        if (Number.isInteger(array[i]) && array[i] > 0) {
            resArr.push(Math.pow(array[i], 2))
        }
    }
    return resArr
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export const sumFirstNumbers = (n: number): number => {
    if (n === 0) return 0
    return n + sumFirstNumbers(n - 1);
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

export function getBanknoteList(amountOfMoney: number): Array<number> {
    let res = []
    const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
    while (amountOfMoney >= 1) {
        for (let j = 0; j < banknotes.length; j++)
            if (amountOfMoney >= banknotes[j]) {
                amountOfMoney -= banknotes[j]
                res.push(banknotes[j])
                break
            }
    }
    return res
}