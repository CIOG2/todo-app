const addDisplayNone = (index: number) => {
    const node = document.getElementById(`item-${index}`);
    
    if (node)
        node.classList.add('display-none');
}

const removeDisplayNone = (index: number) => {
    const node = document.getElementById(`item-${index}`);

    if (node)
        node.classList.remove('display-none');
}

export { addDisplayNone, removeDisplayNone};