const addDisplayNone = ( index: number ) => {
    const node = document.getElementById(`item-${index}`);
    
    if (node)
        node.classList.add('display-none');
}

const removeDisplayNone = ( index: number ) => {
    const node = document.getElementById(`item-${index}`);
    
    if (node)
        node.classList.remove('display-none');
}

const addIsEditing = ( index: number ) => {
    const node = document.getElementById(`article-todo-${index}`);

    if (node)
        node.classList.add('todo-edit');
}

const removeIsEditing = ( index: number ) => {
    const node = document.getElementById(`article-todo-${index}`);

    if (node)
        node.classList.remove('todo-edit');
}


export { addDisplayNone, removeDisplayNone, addIsEditing, removeIsEditing};