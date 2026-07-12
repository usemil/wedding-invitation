document.addEventListener("DOMContentLoaded", () => {
    // 1. Populate Config Details
    const namesDisplay = document.getElementById("names-display");
    const dateDisplay = document.getElementById("date-display");
    const venueDisplay = document.getElementById("venue-display");

    namesDisplay.innerHTML = `${weddingConfig.brideName} <br>♡<br> ${weddingConfig.groomName}`;
    venueDisplay.textContent = weddingConfig.venue;

    const weddingDateObj = new Date(weddingConfig.weddingDate);
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    dateDisplay.textContent = weddingDateObj.toLocaleDateString('en-US', dateOptions);

    // 2. Advanced Flow Transitions (Splash -> Envelope -> Prelude -> Main)
    const splashScreen = document.getElementById("splash-screen");
    const envelopeScreen = document.getElementById("envelope-screen");
    const preludeScreen = document.getElementById("prelude-screen");
    const mainContent = document.getElementById("main-content");
    const openBtn = document.getElementById("open-btn");

    // Hide Splash after 2 seconds
    setTimeout(() => {
        splashScreen.style.opacity = "0";
        setTimeout(() => {
            splashScreen.classList.add("hidden");
            envelopeScreen.classList.remove("hidden");
        }, 800); 
    }, 2000); 

    // Handle Envelope Open
    openBtn.addEventListener("click", () => {
        envelopeScreen.classList.add("slide-up-away");
        
        setTimeout(() => {
            envelopeScreen.classList.add("hidden");
            preludeScreen.classList.remove("hidden");
            
            // Fade in Prelude
            setTimeout(() => {
                preludeScreen.style.opacity = "1";
                
                // Keep prelude on screen for 3.5 seconds, then fade out
                setTimeout(() => {
                    preludeScreen.style.opacity = "0";
                    
                    setTimeout(() => {
                        preludeScreen.classList.add("hidden");
                        mainContent.classList.remove("hidden");
                        
                        // Finally, fade in main content
                        setTimeout(() => {
                            mainContent.classList.add("fade-in-content");
                        }, 50);

                    }, 1500); // Wait for prelude to fade out
                }, 3500); // How long the quote stays on screen
                
            }, 50);
        }, 1000); // Wait for envelope to slide away
    });

    // 3. Live Countdown Timer
    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDateObj.getTime() - now;

        if (difference < 0) {
            document.getElementById("countdown").innerHTML = "<h3>It's Wedding Time! 🎉</h3>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days < 10 ? "0" + days : days;
        document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
    }
    setInterval(updateCountdown, 1000);
    updateCountdown(); 

    // 4. Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hidden-scroll').forEach((el) => observer.observe(el));

    // 5. Enhanced Particle System (Multiple symbols, Click & Scroll)
    const symbols = ['❤️', '🌸', '✨', '💖'];

    function spawnParticles(x, y, amount) {
        for (let i = 0; i < amount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('floating-particle');
            particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
            
            // Randomize position spread
            const randomX = (Math.random() - 0.5) * 80; 
            const randomY = (Math.random() - 0.5) * 40;
            
            particle.style.left = `${x + randomX}px`;
            particle.style.top = `${y + randomY}px`;
            
            // Randomize size and animation duration
            particle.style.fontSize = `${Math.random() * 1 + 1}rem`;
            particle.style.animationDuration = `${Math.random() * 1 + 1.5}s`;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 2500);
        }
    }

    // Spawn on Tap
    document.body.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') return;
        // Spawn 2 to 4 particles per tap
        spawnParticles(e.clientX, e.clientY, Math.floor(Math.random() * 3) + 2);
    });

    // Spawn on Scroll (throttled so it doesn't overwhelm the browser)
    let lastScrollTime = 0;
    window.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastScrollTime > 200) { // Only spawn every 200ms of scrolling
            // Spawn near the bottom of the visible screen
            const randomX = Math.random() * window.innerWidth;
            const y = window.innerHeight - 20; 
            
            spawnParticles(randomX, y, 1);
            lastScrollTime = now;
        }
    });
});