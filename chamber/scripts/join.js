// 1. Grab the timestamp right before the form submits (This fixes the missing date!)
const form = document.querySelector(".membership-form");
if (form) {
    form.addEventListener("submit", () => {
        const timestampField = document.getElementById("timestamp");
        if (timestampField) {
            timestampField.value = new Date().toLocaleString();
        }
    });
}

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
    // Only add the listener if the button actually exists on the page
    if (buttons[key]) {
        buttons[key].addEventListener("click", (e) => {
            e.preventDefault(); // Prevents the button from accidentally submitting the form
            modals[key].showModal();
        });
    }
});

// Close Modals with the Close Button
document.querySelectorAll(".close-modal").forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.closest("dialog").close();
    });
});

// Close modal when clicking outside of it (clicking the backdrop)
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