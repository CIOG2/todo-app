const saveToLocalStorage = (key: string, value: any) => {
    const valueToSave = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, valueToSave);
}

const getFromLocalStorage = (key: string) => {
    return localStorage.getItem(key);
}

export { saveToLocalStorage, getFromLocalStorage }