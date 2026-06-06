// 1. Set the hidden timestamp value when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toLocaleString();
    }
});

// 2. Modal Logic
const modals = {
    np: document.getElementById("np-modal"),
    bronze: document.getElementById("bronze-modal"),
    silver: document.getElementById("silver-modal"),
    gold: document.getElementById("gold-modal")
};

const buttons = {
    np: document.getElementById("np-btn"),
    bronze: document.getElementById("bronze-btn"),
    silver: document.getElementById("silver-btn"),
    gold: document.getElementById("gold-btn")
};

// Open Modals
Object.keys(buttons).forEach(key => {
    buttons[key].addEventListener("click", () => {
        modals[key].showModal();
    });
});

// Close Modals
document.querySelectorAll(".close-modal").forEach(button => {
    button.addEventListener("click", (e) => {
        e.target.closest("dialog").close();
    });
});

// Close modal when clicking outside of it
document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", (e) => {
        const dialogDimensions = dialog.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            dialog.close();
        }
    });
});