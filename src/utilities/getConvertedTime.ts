export const getConvertedTime = (value: string) => {
    const hours = new Date(value).getHours();
    const minutes = new Date(value).getMinutes();
    return hours + ':' + minutes;
}
