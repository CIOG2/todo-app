const saveToLocalStorage = (value: any) => {
    const valueToSave = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem('todoList', valueToSave);
}

const getFromLocalStorage = () => {
    const value = localStorage.getItem('todoList');
    return value ? JSON.parse(value) : [];
}

export { saveToLocalStorage, getFromLocalStorage }