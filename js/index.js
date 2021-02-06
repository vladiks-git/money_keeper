let btnStart = document.getElementById('start')
let budget_value = document.querySelector('.budget-value')
let level_value = document.querySelector('.level-value')
let expenses_value = document.querySelector('.expenses-value')
let optionalexpenses_value = document.querySelector('.optionalexpenses-value')
let income_value = document.querySelector('.income-value')
let monthsavings_value = document.querySelector('.monthsavings-value')
let yearsavings_value = document.querySelector('.yearsavings-value')
let countBtn = document.querySelector('.count-budget-btn')
let dayBudget = document.querySelector('.daybudget-value')

let inputExpenses = document.querySelectorAll('.expenses-item')
let expenses_item_btn = document.getElementsByTagName('button')[0]
let optionalexpenses_btn = document.getElementsByTagName('button')[1]
let optionalexpenses_inputs = document.querySelectorAll('.optionalexpenses-item')
let choose_income = document.querySelector('.choose-income')
let checksavings = document.querySelector('.checksavings')
let choose_sum = document.querySelector('.choose-sum')
let choose_percent = document.querySelector('.choose-percent')
let year_value = document.querySelector('.year-value')
let moth_value = document.querySelector('.month-value')
let day_value = document.querySelector('.day-value')


let time, money;

// старт программы
btnStart.addEventListener('click',() => {
    let money = +prompt('Ваш бюджет на месяц', '')
    let time = prompt('Введите дату yyyy mm dd','')
    while (isNaN(money) || money == '' || money == null){
        money = +prompt('Ваш бюджет на месяц', '')
    }
    appData.budget = money
    appData.time = time
    budget_value.textContent = money.toFixed()
    year_value.value = new Date(Date.parse(time)).getFullYear()
    day_value.value = new Date(Date.parse(time)).getDate()
    moth_value.value = new Date(Date.parse(time)).getMonth() + 1
})

//обязательные траты
expenses_item_btn.addEventListener('click', () => {
    let sum = 0;
    for(let i = 0; i < inputExpenses.length; i ++){
        let a = inputExpenses[i].value
        let b = inputExpenses[++i].value
        if(a !== null && b !== null && a !== '' && b !== '' && a !== undefined && b !== undefined){
            console.log('верно')
            console.log(b)
            appData.expenses[a] = +b
            sum += +b
        }else {
            i -= 1
        }
    }
    expenses_value.textContent = sum
})

// необязательные траты
optionalexpenses_btn.addEventListener('click', () => {
    for(let i = 0; i < optionalexpenses_inputs.length; i ++){
        let b = optionalexpenses_inputs[i].value
        appData.optionalExpenses[i] = b
        optionalexpenses_value.textContent += appData.optionalExpenses[i] + ' '

    }
})

// бюджет на день + уровень дохода
countBtn.addEventListener('click', () => {

    if(appData.budget !== undefined){
        appData.moneyPerDay = (appData.budget / 30).toFixed()
        dayBudget.textContent = appData.moneyPerDay
        if(appData.moneyPerDay < 100){
            level_value.textContent = 'Минимальный уровень дохода'
        }
        else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
            level_value.textContent = 'Средний уровень дохода'
        }
        else if(appData.moneyPerDay > 2000){
            level_value.textContent = 'Высокий уровень дохода'
        }
        else {
            level_value.textContent = 'Произошла ошибка'
        }
    }
    else {
        alert('Для начала нажмите кнопку "Начать расчет"')
    }
})

//дополнительные доходы
choose_income.addEventListener('input', () => {
    let items = choose_income.value;
    appData.income = items.split(', ')
    income_value.textContent = appData.income
})

checksavings.addEventListener('click', () => {
    appData.savings = !appData.savings
})

choose_sum.addEventListener('input', () => {
    if(appData.savings){
        let sum = +choose_sum.value
        let percent = +choose_percent.value
        appData.monthIncome = sum/100/12 * percent
        appData.yearIncome = sum/100 * percent

        monthsavings_value.textContent = appData.monthIncome.toFixed(1)
        yearsavings_value.textContent = appData.yearIncome.toFixed(1)
    }
})

choose_percent.addEventListener('input', () => {
    if(appData.savings){
        let sum = +choose_sum.value
        let percent = +choose_percent.value
        appData.monthIncome = sum/100/12 * percent
        appData.yearIncome = sum/100 * percent

        monthsavings_value.textContent = appData.monthIncome.toFixed(1)
        yearsavings_value.textContent = appData.yearIncome.toFixed(1)
    }
})

let appData = {
    expenses: {},
    optionalExpenses: {},
    budget: money,
    timeDate: time,
    savings: false,
    income: []
}