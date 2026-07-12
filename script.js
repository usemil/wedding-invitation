// Prove everything is connected by pulling from config.js
document.addEventListener("DOMContentLoaded", () => {
    const namesDisplay = document.getElementById("names-display");
    // Dynamically insert the names from the config file
    namesDisplay.textContent = `${weddingConfig.brideName} ♡ ${weddingConfig.groomName}`;
});