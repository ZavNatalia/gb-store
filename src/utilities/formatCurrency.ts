export const toCurrency = (n: number, curr = 'RUB', LanguageFormat = 'Ru-ru') =>
    Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr, minimumFractionDigits: 0 }).format(n);