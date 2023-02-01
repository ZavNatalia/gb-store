export const getConvertedDate = (value: string) => {
    let options = {year: 'numeric', month: 'long', day: 'numeric'} as const;
    return new Date(value).toLocaleDateString("ru", options);
}