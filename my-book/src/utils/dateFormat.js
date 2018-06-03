export const takeTime = () => {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    return `${addZero(dd)}-${addZero(mm)}-${yyyy}`;
}

const addZero = (time) => {
    if (time < 10) {
        time = `0${time}`;
    }

    return time;
}