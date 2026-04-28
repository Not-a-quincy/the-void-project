const buttonContainer = document.querySelector(".button-container");
const whyOverlay = document.getElementById("why-overlay");
const openWhy = document.getElementById("open-why");
const closeWhy = document.getElementById("close-why");
const submitName = document.getElementById("submit-name");
const userNameInput = document.getElementById("user-name");

// --- 1. Helper: Create & Animate Ghost ---
function createGhost(name) {
    const ghost = document.createElement("div");
    ghost.className = "floating-name";
    ghost.innerText = name;
    
    const reposition = () => {
        ghost.style.left = Math.random() * (window.innerWidth - 100) + "px";
        ghost.style.top = Math.random() * (window.innerHeight - 100) + "px";
    };

    reposition(); // Set initial spot
    document.body.appendChild(ghost);
    
    // Continuous haunting
    setInterval(reposition, 3000); // Changed to 3s for a smoother "ghostly" feel
}

// --- 2. The Summoning (Load from DB on refresh) ---
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/ghosts');
        if (response.ok) {
            const ghosts = await response.json();
            ghosts.forEach(g => createGhost(g.name));
            console.log(`Summoned ${ghosts.length} ghosts.`);
        }
    } catch (err) {
        console.error('The Void history is unreachable:', err);
    }
});

// --- 3. The Escape Logic ---
buttonContainer.addEventListener("mouseenter", () => {
    const x = Math.random() * (window.innerWidth - 160);
    const y = Math.random() * (window.innerHeight - 90);
    buttonContainer.style.left = `${x}px`;
    buttonContainer.style.top = `${y}px`;
    buttonContainer.style.transform = "none";
});

// --- 4. The Why Overlay ---
if (openWhy) {
    openWhy.addEventListener("click", () => whyOverlay.style.display = "flex");
}
closeWhy.addEventListener("click", () => whyOverlay.style.display = "none");

// --- 5. The Save Logic ---
submitName.addEventListener("click", async () => {
    const name = userNameInput.value.trim();
    if (!name) return;

    try {
        const response = await fetch('/ghosts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            const saved = await response.json();
            createGhost(saved.name); // Now uses the same helper
            userNameInput.value = "";
        }
    } catch (err) {
        console.error('Network error saving name:', err);
    }
});
