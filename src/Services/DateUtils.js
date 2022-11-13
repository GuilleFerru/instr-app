export const formatDate = (date) => {
    return new Date(date).toLocaleString("es-AR", { dateStyle: "short" });
}

export const parseStringToDate = (stringDate) => {
    const b = stringDate.split(/\D+/);
    const d = new Date(b[2], b[1] - 1, b[0])
    let year;
    b[2].length === 2 ? year = `20${b[2]}` : year = `${b[2]}`;
    d.setFullYear(year);
    return d && d.getMonth() === b[1] - 1 ? d : new Date(NaN);
}

export const parseStringToHtmlInputType = (stringDate) => {
    const dateSplit = stringDate.split(/\D+/);
    const year = dateSplit[2];
    const month = dateSplit[1].length === 1 ? `0${dateSplit[1]}` : dateSplit[1];
    const day = dateSplit[0].length === 1 ? `0${dateSplit[0]}` : dateSplit[0];
    return `${year}-${month}-${day}`;
}



export const dateInLocalDate = (date) => {
    const localDate = new Date(date).toLocaleDateString('es-AR');
    const dateResp = parseStringToDate(localDate);
    return dateResp;
}


export const parseStringToString = (stringDate) => {
    const arrayDate = stringDate.split(/\D+/)
    const day = arrayDate[2].charAt(0) === '0' ? arrayDate[2].substring(1) : arrayDate[2];
    const month = arrayDate[1].charAt(0) === '0' ? arrayDate[1].substring(1) : arrayDate[1];
    const year = arrayDate[0].substring(2, 4);
    const dateString = `${day}/${month}/${year}`;
    return dateString;
}

export const getYesterday = () => {
    const date = new Date();
    const y = date.getFullYear()
    const m = date.getMonth();
    const d = date.getDate() - 1;
    return new Date(y, m, d);
}


export const initOfDailyShift = () => {
    const date = new Date();
    if (date.getMonth() === 0) {
        const y = date.getFullYear() - 1;
        const m = 11;
        const d = 16;
        return new Date(y, m, d);
    }
    const y = date.getFullYear();
    const m = date.getMonth() - 1;
    const d = 16;
    return new Date(y, m, d);
}

export const endOfDailyShift = () => {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = 15;
    return new Date(y, m, d);
}

export const getDayName = (dayNumber) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    return days[dayNumber];
}

export const initOfHolidayPeriod = () => {
    const date = new Date();
    const y = date.getFullYear();
    const m = 9;
    const d = 1;
    return new Date(y, m, d);
}

export const endOfHolidayPeriod = () => {
    const date = new Date();
    const y = date.getFullYear() + 1;
    const m = 8;
    const d = 30;
    return new Date(y, m, d);
}