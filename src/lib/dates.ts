const isLeapYear = (year: number) => {
    if (year % 4 !== 0) return false;
    if (year % 100 !== 0) return true;
    return year % 400 === 0;
};

export const getMonths = (year: number) => {
    return [
        { name: "January", days: 31, start: 3 },
        { name: "February", days: isLeapYear(year) ? 29 : 28, start: 6 },
        { name: "March", days: 31, start: 6 },
        { name: "April", days: 30, start: 2 },
        { name: "May", days: 31, start: 4 },
        { name: "June", days: 30, start: 0 },
        { name: "July", days: 31, start: 2 },
        { name: "August", days: 31, start: 5 },
        { name: "September", days: 30, start: 1 },
        { name: "October", days: 31, start: 3 },
        { name: "November", days: 30, start: 6 },
        { name: "December", days: 31, start: 1 }
    ];
}

export const getDay = (year: number, month: string, day: number): string | undefined => {
    const date = new Date(`${month} ${day}, ${year} 12:00:00`);
    const dayNumber = date.getDay();
    if (isNaN(dayNumber)) return;
    const dayMap = {
        0: "So",
        1: "Mo",
        2: "Di",
        3: "Mi",
        4: "Do",
        5: "Fr",
        6: "Sa"
    };
    return dayMap[dayNumber as keyof typeof dayMap];
};

// https://www.api-feiertage.de/
export const getHolidaysByStateAndYear = async (state: string, year: number) => {
    const responseJson = await fetch(`https://get.api-feiertage.de?years=${year}&states=${state}`);
    const response = await responseJson.json();
    if (response.state === 'error') return [];
    console.log(response);
    return response.feiertage;
}

const addLeadingZero = (input: number) => {
    return input.toString().length === 1 ? `0${input}` : input;
}

export const isHoliday = (year: number, month: number, day: number, holidays: Array<{date: string}>): boolean => {
    const holiday = holidays.find(holiday => `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}` === holiday.date);
    return !!holiday;
}