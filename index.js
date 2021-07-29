// Your code here
function createEmployeeRecord(employeeArr) {
    const employeeObj = {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj
}

function createEmployeeRecords(nestedArray) {
    const nestedObj = nestedArray.map(employee => {
        return createEmployeeRecord(employee)
    })
    return nestedObj
}

function createTimeInEvent(employeeObj, dateTimeStamp) {
    let timeInObj = {}

    timeInObj.type = "TimeIn"
    timeInObj.date = dateTimeStamp.split(' ')[0]
    timeInObj.hour = parseInt(dateTimeStamp.split(' ')[1])

    employeeObj.timeInEvents.push(timeInObj)

    return employeeObj
}

function createTimeOutEvent(employeeObj, dateTimeStamp) {
    let timeOutObj = {}

    timeOutObj.type = "TimeOut"
    timeOutObj.date = dateTimeStamp.split(' ')[0],
    timeOutObj.hour = parseInt(dateTimeStamp.split(' ')[1])

    employeeObj.timeOutEvents.push(timeOutObj)

    return employeeObj
}

function hoursWorkedOnDate(employeeObj, date) {
    let timeIn = employeeObj.timeInEvents.find(function(timeInEvent){
        if(timeInEvent.date === date)
            return true
    })
    let timeOut = employeeObj.timeOutEvents.find(function(timeOutEvent){
        if(timeOutEvent.date === date)
        return true
    })

    return (timeOut.hour - timeIn.hour)/100
}  
    
function wagesEarnedOnDate(employeeObj, date) {
        let hours = hoursWorkedOnDate(employeeObj, date)
        let pay = employeeObj.payPerHour

        return hours * pay
    }

    function allWagesFor(employeeObj){
        let dates = employeeObj.timeInEvents.map(timeIn => {return timeIn.date})
        let wages = dates.map(date => {return wagesEarnedOnDate(employeeObj, date)})

        return wages.reduce(function(total, wage){return wage + total}, 0)
    }

    function calculatePayroll(employeeRecordsArray){
        let allWages = employeeRecordsArray.map(employeeObj => {return allWagesFor(employeeObj)})
        return allWages.reduce(function(total, wages){return wages + total}, 0)
    }

    function findEmployeeByFirstName(srcArray, firstName){
        return srcArray.find(employee => employee.firstName === firstName)
    }