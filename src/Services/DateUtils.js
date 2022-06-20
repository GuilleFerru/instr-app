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