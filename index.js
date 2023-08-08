
const DAILY_WORKING_HOURS = 8;
const DAYS_IN_WEEK = 7;
const END_OF_WORK = 17;
const DAILY_NON_WORKING_HOURS = 16;


const calculateDueDate = (submitDate, turnaround) => {
    validateArguments(submitDate, turnaround)

    let resultDate = addWorkingDays(submitDate, turnaround)
    resultDate = addRemainingWorkingHours(resultDate, turnaround);

    return new Date(resultDate).toLocaleString('hu-Hu');
};

const addWorkingDays = (submitDate, turnaround) => {
    let addendWorkingDays = getWorkingDays(turnaround);
    let resultDate = submitDate;

    while (addendWorkingDays > 0) {
        const dayIndex = resultDate.getDay();
        resultDate = addDays(resultDate, addendWorkingDays);
        addendWorkingDays = Math.floor((dayIndex + addendWorkingDays) / DAYS_IN_WEEK) * 2;
    }

    return addDays(resultDate, getWeekendCorrection(resultDate));
}

export const addRemainingWorkingHours = (date, turnaround) => {
    const hours = getRemainingHours(turnaround);
    let result = new Date(date);
    const endHour = result.getHours() + hours;
    result.setHours(endHour < END_OF_WORK ? endHour : endHour + DAILY_NON_WORKING_HOURS);

    return addDays(result, getWeekendCorrection(result));
}

const getWorkingDays = (hours) => {
    return Math.floor(hours / DAILY_WORKING_HOURS);
}

const getRemainingHours = (turnaround) => {
    const workingDays = getWorkingDays(turnaround)
    return (turnaround === 0 || workingDays === 0) ? turnaround : turnaround % workingDays;
};

const getWeekendCorrection = (date) => {
    switch (date.getDay()) {
        case 0:
            return 1;
        case 6:
            return 2;
        default:
            return 0;
    }
}

const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const validateArguments = (date, turnaround) => {
    if ([undefined, null, ''].includes(date)) {
        throw new Error('Date is required')
    }
    if (!date instanceof Date || isNaN(date)) {
        throw new Error('Date is invalid')
    }
    if ([undefined, null, ''].includes(turnaround)) {
        throw new Error('Turnaround is required')
    }
    if (!Number.isInteger(turnaround)) {
        throw new Error('Turnaround must be integer')
    }
    return true
}

export default calculateDueDate
