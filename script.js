const containers = document.querySelectorAll(".container")
const draggables = document.querySelectorAll(".draggable")


draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
    })

    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
    })

})

containers.forEach(container => {
    container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDraggingAfterElement(container, e.clientY);
        const draggable = document.querySelector(".dragging");
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement)
        }
    })
})

function getDraggingAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;

        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}