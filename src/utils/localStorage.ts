const saveToLocalStorage = (key: string, value: any) => {
    const valueToSave = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, valueToSave);
}

const getFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export { saveToLocalStorage, getFromLocalStorage }