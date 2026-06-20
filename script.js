/* =====================================================
   script.js — Birthday Website Interactive Logic
   ===================================================== */
"use strict";
// ─────────────────────────────────────────────────────
//  ✏️  CUSTOMIZATION — Edit these values to personalise
// ─────────────────────────────────────────────────────
/** Display name shown in the hero section */
const PARTNER_NAME = "Sayangku 💖";
/**
 * Target birthday date for the countdown.
 * Format: "YYYY-MM-DDTHH:mm:ss" (local time)
 * Example: "2026-07-20T00:00:00" = 20 July 2026 midnight
 */
const BIRTHDAY_DATE = "2026-07-20T00:00:00";
// ─────────────────────────────────────────────────────

// ── 0. Scroll Lock on Page Load ──────────────────────
(function initScrollLock() {
    // Function to lock scroll
    function lockScroll() {
        document.documentElement.classList.add("scroll-locked");
        document.body.classList.add("scroll-locked");
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.documentElement.style.height = "100vh";
        document.body.style.height = "100vh";
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
    }
    
    // Function to unlock scroll
    function unlockScroll() {
        document.documentElement.classList.remove("scroll-locked");
        document.body.classList.remove("scroll-locked");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.documentElement.style.height = "";
        document.body.style.height = "";
        document.documentElement.style.position = "";
        document.body.style.position = "";
    }
    
    // Lock scroll immediately on page load
    lockScroll();
    
    const heroBtn = document.getElementById("hero-btn");
    
    // Prevent scroll with wheel and arrow keys
    function preventScroll(e) {
        if (document.body.classList.contains("scroll-locked")) {
            e.preventDefault();
        }
    }
    
    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("keydown", (e) => {
        if (document.body.classList.contains("scroll-locked")) {
            if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === " ") {
                e.preventDefault();
            }
        }
    });
    
    // ONLY unlock scroll when hero button "Buka Kejutan" is clicked
    if (heroBtn) {
        heroBtn.addEventListener("click", () => {
            unlockScroll();
            document.removeEventListener("wheel", preventScroll);
            document.removeEventListener("touchmove", preventScroll);
            // Show music toggle after clicking hero button
            const musicToggle = document.getElementById("music-toggle");
            if (musicToggle) {
                musicToggle.classList.add("visible");
            }
            // Smooth scroll to profile section
            setTimeout(() => {
                const profileSection = document.getElementById("profile");
                if (profileSection) {
                    profileSection.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        });
    }
})();

// ─────────────────────────────────────────────────────
// ── 1. Inject partner name ───────────────────────────
const nameEl = document.getElementById("partner-name");
if (nameEl) nameEl.textContent = PARTNER_NAME;

// ── 2. Floating Particles ────────────────────────────
(function createParticles() {
    const container = document.getElementById("particles");
    if (!container) return;
    const colors = [
        "rgba(255,77,141,.55)",
        "rgba(196,113,237,.45)",
        "rgba(247,197,159,.35)",
        "rgba(255,128,171,.4)",
    ];
    for (let i = 0; i < 35; i++) {
        const p = document.createElement("div");
        p.classList.add("particle");
        const size = Math.random() * 8 + 3;
        p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      --dur: ${Math.random() * 10 + 7}s;
      --delay: ${Math.random() * 12}s;
    `;
        container.appendChild(p);
    }
})();

// ── 3. Falling Petals ────────────────────────────────
(function createPetals() {
    const container = document.getElementById("petals");
    if (!container) return;
    const petals = ["🌸", "🌹", "💮", "🌺", "✨", "💕", "⭐"];
    for (let i = 0; i < 18; i++) {
        const p = document.createElement("div");
        p.classList.add("petal");
        p.textContent = petals[Math.floor(Math.random() * petals.length)];
        p.style.cssText = `
      left: ${Math.random() * 100}%;
      --dur: ${Math.random() * 8 + 5}s;
      --delay: ${Math.random() * 10}s;
      font-size: ${Math.random() * .8 + .8}rem;
    `;
        container.appendChild(p);
    }
})();

// ── 4. Countdown Timer ───────────────────────────────
(function initCountdown() {
    const daysEl    = document.getElementById("days");
    const hoursEl   = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const msgEl     = document.getElementById("countdown-msg");
    if (!daysEl) return;
    const target = new Date(BIRTHDAY_DATE).getTime();
    function pad(n) { return String(n).padStart(2, "0"); }
    function animateTick(el) {
        el.classList.remove("tick");
        // Force reflow
        void el.offsetWidth;
        el.classList.add("tick");
    }
    function update() {
        const now  = Date.now();
        const diff = target - now;
        if (diff <= 0) {
            // It's birthday time! 🎉
            daysEl.textContent    = "00";
            hoursEl.textContent   = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            if (msgEl) {
                msgEl.innerHTML = "🎉🎂 SELAMAT ULANG TAHUN SAYANG! Hari ini adalah harimu! 🎂🎉";
                msgEl.style.fontSize = "1.3rem";
                msgEl.style.color = "var(--rose)";
            }
            launchCelebration();
            return;
        }
        const totalSeconds = Math.floor(diff / 1000);
        const d = Math.floor(totalSeconds / 86400);
        const h = Math.floor((totalSeconds % 86400) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        const newD = pad(d), newH = pad(h), newM = pad(m), newS = pad(s);
        if (daysEl.textContent    !== newD) { daysEl.textContent    = newD; animateTick(daysEl); }
        if (hoursEl.textContent   !== newH) { hoursEl.textContent   = newH; animateTick(hoursEl); }
        if (minutesEl.textContent !== newM) { minutesEl.textContent = newM; animateTick(minutesEl); }
        if (secondsEl.textContent !== newS) { secondsEl.textContent = newS; animateTick(secondsEl); }
        if (msgEl) {
            if (d === 0 && h === 0 && m < 60) {
                msgEl.innerHTML = "🎊 Sebentar lagi! Bersiaplah untuk merayakan!";
                msgEl.style.color = "var(--rose)";
            } else if (d <= 7) {
                msgEl.innerHTML = `🌟 Tinggal ${d} hari lagi! Aku sudah tidak sabar!`;
                msgEl.style.color = "var(--gold)";
            } else {
                msgEl.innerHTML = "🎉 Hari ulang tahunmu sedang dinantikan dengan penuh cinta!";
                msgEl.style.color = "var(--gold)";
            }
        }
        setTimeout(update, 1000);
    }
    update();
})();

// ── 5. Gallery Lightbox with Keyboard Navigation ───────────────────────────────
(function initGallery() {
    const items     = document.querySelectorAll(".gallery-item");
    const lightbox  = document.getElementById("lightbox");
    const lbImg     = document.getElementById("lightbox-img");
    const lbCaption = document.getElementById("lightbox-caption");
    const lbCounter = document.getElementById("lightbox-counter");
    const lbOverlay = document.getElementById("lightbox-overlay");
    const lbClose   = document.getElementById("lightbox-close");
    if (!lightbox) return;
    
    let currentIndex = -1;
    const galleryItems = Array.from(items);
    
    function updateCounter() {
        if (lbCounter) {
            lbCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
        }
    }
    
    function open(index) {
        currentIndex = index;
        const item = galleryItems[index];
        const img = item.querySelector("img");
        const caption = item.querySelector(".gallery-caption");
        if (img) {
            lbImg.src = img.src;
            lbCaption.textContent = caption ? caption.textContent : "";
            updateCounter();
            lightbox.classList.add("open");
            document.body.style.overflow = "hidden";
        }
    }
    
    function close() {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
        currentIndex = -1;
        setTimeout(() => { lbImg.src = ""; }, 350);
    }
    
    function navigate(direction) {
        if (currentIndex === -1) return;
        let newIndex = currentIndex + direction;
        
        // Loop around
        if (newIndex < 0) newIndex = galleryItems.length - 1;
        if (newIndex >= galleryItems.length) newIndex = 0;
        
        open(newIndex);
    }
    
    items.forEach((item, index) => {
        item.addEventListener("click", () => {
            open(index);
        });
    });
    
    lbOverlay?.addEventListener("click", close);
    lbClose?.addEventListener("click", close);
    
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("open")) return;
        
        switch(e.key) {
            case "Escape":
                close();
                break;
            case "ArrowLeft":
                e.preventDefault();
                navigate(-1);
                break;
            case "ArrowRight":
                e.preventDefault();
                navigate(1);
                break;
            case "Home":
                e.preventDefault();
                open(0);
                break;
            case "End":
                e.preventDefault();
                open(galleryItems.length - 1);
                break;
        }
    });
})();

// ── 6. Scroll Reveal ─────────────────────────────────
(function initScrollReveal() {
    const targets = [
        ".countdown-section",
        ".letter-section",
        ".gallery-section",
        ".wishes-section",
        ".timeline-section",
        ".countdown-card",
        ".gallery-item",
        ".wish-card",
        ".letter-card",
    ];
    const revealEls = document.querySelectorAll(targets.join(","));
    revealEls.forEach((el) => el.classList.add("reveal"));
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    // Stagger children of grids
                    entry.target.querySelectorAll(".reveal").forEach((child, i) => {
                        setTimeout(() => child.classList.add("visible"), i * 100);
                    });
                }
            });
        },
        { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
})();

// ── 7. Popup on Load & Music Integration ─────────────────────────────────
(function initPopupAndMusic() {
    const overlay    = document.getElementById("popup-overlay");
    const btn        = document.getElementById("popup-btn");
    const confettiEl = document.getElementById("popup-confetti");
    const audio      = document.getElementById("bg-audio");
    
    if (!overlay || !btn) return;
    
    // Create confetti inside popup
    const confettiChars = ["🎊", "✨", "🌟", "💫", "🎉", "💕", "🌸"];
    for (let i = 0; i < 20; i++) {
        const span = document.createElement("span");
        span.textContent = confettiChars[Math.floor(Math.random() * confettiChars.length)];
        span.style.cssText = `
      position: absolute;
      font-size: ${Math.random() * .8 + .7}rem;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * .5 + .3};
      animation: floatUp ${Math.random() * 3 + 2}s ease-in-out infinite;
      animation-delay: ${Math.random() * 3}s;
      pointer-events: none;
    `;
        if (confettiEl) confettiEl.appendChild(span);
    }
    
    function showMusicToggle() {
        const musicToggle = document.getElementById("music-toggle");
        if (musicToggle) {
            musicToggle.classList.add("visible");
        }
    }

    // Close button click handler
    btn.onclick = function() {
        overlay.classList.add("hidden");
        showMusicToggle();
        // Trigger music player to play after popup closes
        if (audio) {
            setTimeout(() => {
                const musicBtn = document.getElementById("music-btn");
                if (musicBtn) {
                    // Trigger the music player's click handler
                    musicBtn.click();
                }
            }, 300);
        }
    };
    
    // Also close on overlay click (outside card)
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            overlay.classList.add("hidden");
            showMusicToggle();
            // Trigger music player to play after popup closes
            if (audio) {
                setTimeout(() => {
                    const musicBtn = document.getElementById("music-btn");
                    if (musicBtn) {
                        musicBtn.click();
                    }
                }, 300);
            }
        }
    };
})();

// ── 8. Celebration (fires on birthday) ───────────────
function launchCelebration() {
    const celebChars = ["🎊", "🎉", "💖", "⭐", "🌸", "✨"];
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const el = document.createElement("div");
            el.textContent = celebChars[Math.floor(Math.random() * celebChars.length)];
            el.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -40px;
        font-size: ${Math.random() * 1.5 + 1}rem;
        pointer-events: none;
        z-index: 9999;
        animation: petalFall ${Math.random() * 4 + 3}s linear forwards;
      `;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 8000);
        }, i * 100);
    }
}

// ── 9. Smooth active nav highlight ───────────────────
(function initNavHighlight() {
    const sections = document.querySelectorAll("section[id]");
    const onScroll = () => {
        const scrollY = window.scrollY + window.innerHeight / 2;
        sections.forEach((sec) => {
            if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
                document.title = `🎂 Birthday — ${sec.id.charAt(0).toUpperCase() + sec.id.slice(1)}`;
            }
        });
    };
    window.addEventListener("scroll", onScroll);
})();

// ── 10. Music Player ─────────────────────────────────
(function initMusicPlayer() {
    const audio       = document.getElementById("bg-audio");
    const btn         = document.getElementById("music-btn");
    const icon        = document.getElementById("music-icon");
    const vinyl       = document.getElementById("music-vinyl");
    const player      = document.getElementById("music-player");
    const closeBtn    = document.getElementById("music-close");
    const toggleBtn   = document.getElementById("music-toggle");
    const progressFill= document.getElementById("music-progress-fill");
    const timeEl      = document.getElementById("music-time");
    const progressBar = document.querySelector(".music-progress-bar");

    if (!audio || !btn) return;

    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${String(s).padStart(2, "0")}`;
    }

    function updateUI() {
        // Sinkronisasi UI dengan state audio sebenarnya
        if (audio.paused) {
            icon.textContent = "▶";
            vinyl.classList.remove("spinning");
        } else {
            icon.textContent = "⏸";
            vinyl.classList.add("spinning");
        }
    }

    function togglePlayPause() {
        if (audio.paused) {
            audio.play().catch(err => console.log('Play error:', err));
        } else {
            audio.pause();
        }
        // Update UI setelah toggle
        setTimeout(updateUI, 50);
    }

    // Play/Pause toggle on button click
    btn.addEventListener("click", togglePlayPause);

    // Update UI saat audio state berubah
    audio.addEventListener("play", updateUI);
    audio.addEventListener("pause", updateUI);

    // Progress bar
    audio.addEventListener("timeupdate", () => {
        if (!audio.duration) return;
        const pct = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = pct + "%";
        timeEl.textContent = formatTime(audio.currentTime);
    });

    // Click to seek
    progressBar.addEventListener("click", (e) => {
        if (!audio.duration) return;
        const rect = progressBar.getBoundingClientRect();
        const pct  = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pct * audio.duration;
    });

    // Close / mini toggle
    closeBtn.addEventListener("click", () => {
        player.classList.add("hidden");
        toggleBtn.classList.add("visible");
    });

    toggleBtn.addEventListener("click", () => {
        player.classList.remove("hidden");
        toggleBtn.classList.remove("visible");
    });

    // Initial UI update
    updateUI();
})();

// ── 11. Social Sharing Buttons ───────────────────────────────
(function initSocialSharing() {
    const shareWhatsApp = document.getElementById("share-whatsapp");
    const shareInstagram = document.getElementById("share-instagram");
    
    if (!shareWhatsApp && !shareInstagram) return;
    
    const pageUrl = window.location.href;
    const shareText = "Ayo rayakan ulang tahun sayang ku! 🎂💕";
    
    // WhatsApp Share
    if (shareWhatsApp) {
        shareWhatsApp.addEventListener("click", () => {
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + "\n" + pageUrl)}`;
            window.open(whatsappUrl, "_blank");
        });
    }
    
    // Instagram Share
    if (shareInstagram) {
        shareInstagram.addEventListener("click", () => {
            // Instagram tidak memiliki share API built-in, jadi buka Instagram profile/feed
            const instagramUrl = `https://www.instagram.com/`;
            window.open(instagramUrl, "_blank");
            // Tampilkan alert untuk manual share
            alert(`Bagikan URL ini di Instagram Story atau DM:\n\n${pageUrl}`);
        });
    }
})();


// -- 12. Letter Reveal Functionality ------------------------------
(function initLetterReveal() {
    const letterCard = document.getElementById("letter-card");
    const letterSealed = document.getElementById("letter-sealed");
    const letterContent = document.getElementById("letter-content");
    const revealBtn = document.getElementById("letter-reveal-btn");
    const closeBtn = document.getElementById("letter-close-btn");
    
    if (!revealBtn || !closeBtn || !letterSealed || !letterContent) return;
    
    revealBtn.addEventListener("click", () => {
        letterSealed.style.display = "none";
        letterContent.style.display = "block";
        letterCard.style.transform = "scale(1.02)";
    });
    
    closeBtn.addEventListener("click", () => {
        letterContent.style.display = "none";
        letterSealed.style.display = "block";
        letterCard.style.transform = "scale(1)";
    });
})();

