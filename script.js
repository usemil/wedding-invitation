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

    // 2. Advanced Flow Transitions
    const appContainer = document.getElementById("app-container");
    const splashScreen = document.getElementById("splash-screen");
    const envelopeScreen = document.getElementById("envelope-screen");
    const preludeScreen = document.getElementById("prelude-screen");
    const mainContent = document.getElementById("main-content");
    const openBtn = document.getElementById("open-btn");
    const bgMusic = document.getElementById("bg-music");

    // Pre-load music
    bgMusic.src = weddingConfig.musicSrc;

    // Hide Splash after 2 seconds
    setTimeout(() => {
        splashScreen.style.opacity = "0";
        setTimeout(() => {
            splashScreen.classList.add("hidden");
            envelopeScreen.classList.remove("hidden");
        }, 800); 
    }, 2000); 

    // Handle Envelope Open & Play Music
    openBtn.addEventListener("click", () => {
        // Play music directly! The browser allows this because it's tied to a click event.
        bgMusic.play().catch(e => console.log("Audio play prevented by browser:", e));

        envelopeScreen.classList.add("slide-up-away");
        
        setTimeout(() => {
            envelopeScreen.classList.add("hidden");
            preludeScreen.classList.remove("hidden");
            
            // Fade in Prelude
            setTimeout(() => {
                preludeScreen.style.opacity = "1";
                
                // Keep prelude on screen for 4 seconds, then fade out
                setTimeout(() => {
                    preludeScreen.style.opacity = "0";
                    
                    setTimeout(() => {
                        preludeScreen.classList.add("hidden");
                        mainContent.classList.remove("hidden");
                        
                        // Allow app-container to scroll now
                        appContainer.style.overflow = "auto";
                        
                        // Finally, fade in main content
                        setTimeout(() => {
                            mainContent.classList.add("fade-in-content");
                        }, 50);

                    }, 1500); 
                }, 4000); 
                
            }, 50);
        }, 1000); 
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

    // 5. Enhanced Particle System (Click & Scroll)
    const symbols = ['❤️', '🌸', '✨', '💖'];

    function spawnParticles(x, y, amount) {
        for (let i = 0; i < amount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('floating-particle');
            particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
            
            const randomX = (Math.random() - 0.5) * 80; 
            const randomY = (Math.random() - 0.5) * 40;
            
            particle.style.left = `${x + randomX}px`;
            particle.style.top = `${y + randomY}px`;
            
            particle.style.fontSize = `${Math.random() * 1 + 1}rem`;
            particle.style.animationDuration = `${Math.random() * 1 + 1.5}s`;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 2500);
        }
    }

    document.body.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') return;
        spawnParticles(e.clientX, e.clientY, Math.floor(Math.random() * 3) + 2);
    });

    let lastScrollTime = 0;
    window.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastScrollTime > 200) { 
            const randomX = Math.random() * window.innerWidth;
            const y = window.innerHeight - 20; 
            spawnParticles(randomX, y, 1);
            lastScrollTime = now;
        }
    });

    // 6. Popping Sakura Petals (Random X and Y)
    function createSakura() {
        const petal = document.createElement('div');
        petal.classList.add('sakura-petal');
        petal.innerHTML = '🌸';
        
        // Randomly place anywhere on the screen (both X and Y axis)
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.top = Math.random() * 100 + 'vh';
        
        // Randomize size slightly
        petal.style.fontSize = Math.random() * 0.8 + 0.8 + 'rem';
        
        // Randomize animation duration between 3 and 5 seconds
        const duration = Math.random() * 2 + 3;
        petal.style.animationDuration = duration + 's'; 
        
        document.getElementById('app-container').appendChild(petal);
        
        // Remove after animation completes
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }
    // Spawn a new petal popping up every 800ms
    setInterval(createSakura, 800);

    // 7. Venue & Fake RSVP Logic
    const mapBtn = document.getElementById("map-btn");
    mapBtn.href = weddingConfig.mapLink;
    document.getElementById("venue-text-large").textContent = weddingConfig.venue;

    const sendWishBtn = document.getElementById("send-wish-btn");
    const wishesCard = document.getElementById("wishes-card");
    const thankYouMsg = document.getElementById("thank-you-msg");
    const guestNameInput = document.getElementById("guest-name");

    sendWishBtn.addEventListener("click", () => {
        if (guestNameInput.value.trim() === "") {
            guestNameInput.style.borderColor = "red";
            setTimeout(() => guestNameInput.style.borderColor = "rgba(212, 175, 55, 0.3)", 2000);
            return;
        }

        sendWishBtn.innerHTML = "Sending...";
        
        setTimeout(() => {
            wishesCard.classList.add("hidden");
            thankYouMsg.classList.remove("hidden");
            
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            let count = 0;
            const burst = setInterval(() => {
                spawnParticles(centerX, centerY, 5);
                count++;
                if(count > 10) clearInterval(burst); 
            }, 100);

        }, 800);
    });
});