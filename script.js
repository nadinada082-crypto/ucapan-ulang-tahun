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
// ── 1. Inject partner name ───────────────────────────
const nameEl = document.getElementById("partner-name");
if (nameEl) nameEl.textContent = PARTNER_NAME;

// ── 2. Floating Particles ────────────────────────────
(function createParticles() {
    const container = document.getElementById("particles");
    if (!container) return;
    const colors = ["rgba(255,77,141,.55)",
        "rgba(196,113,237,.45)",
        "rgba(247,197,159,.35)",
        "rgba(255,128,171,.4)",
    ];

    for (let i = 0; i < 35; i++) {
        const p = document.createElement("div");
        p.classList.add("particle");
        const size = Math.random() * 8 + 3;

        p.style.cssText = ` left: $ {
                Math.random() * 100
            }

            %;

            width: $ {
                size
            }

            px;

            height: $ {
                size
            }

            px;

            background: $ {
                colors[Math.floor(Math.random() * colors.length)]
            }

            ;

            --dur: $ {
                Math.random() * 10 + 7
            }

            s;

            --delay: $ {
                Math.random() * 12
            }

            s;
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

        p.style.cssText = ` left: $ {
                Math.random() * 100
            }

            %;

            --dur: $ {
                Math.random() * 8 + 5
            }

            s;

            --delay: $ {
                Math.random() * 10
            }

            s;

            font-size: $ {
                Math.random() * .8 + .8
            }

            rem;
            `;
        container.appendChild(p);
    }
})();

// ── 4. Countdown Timer ───────────────────────────────
(function initCountdown() {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const msgEl = document.getElementById("countdown-msg");
    if (!daysEl) return;
    const target = new Date(BIRTHDAY_DATE).getTime();

    function pad(n) {
        return String(n).padStart(2, "0");
    }

    function animateTick(el) {
        el.classList.remove("tick");
        // Force reflow
        void el.offsetWidth;
        el.classList.add("tick");
    }

    function update() {
        const now = Date.now();
        const diff = target - now;

        if (diff <= 0) {
            // It's birthday time! 🎉
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
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

        if (daysEl.textContent !== newD) {
            daysEl.textContent = newD; animateTick(daysEl);
        }

        if (hoursEl.textContent !== newH) {
            hoursEl.textContent = newH; animateTick(hoursEl);
        }

        if (minutesEl.textContent !== newM) {
            minutesEl.textContent = newM; animateTick(minutesEl);
        }

        if (secondsEl.textContent !== newS) {
            secondsEl.textContent = newS; animateTick(secondsEl);
        }

        if (msgEl) {
            if (d === 0 && h === 0 && m < 60) {
                msgEl.innerHTML = "🎊 Sebentar lagi! Bersiaplah untuk merayakan!";
                msgEl.style.color = "var(--rose)";
            }

            else if (d <= 7) {
                msgEl.innerHTML = `🌟 Tinggal $ {
                        d
                    }

                    hari lagi ! Aku sudah tidak sabar !`;
                msgEl.style.color = "var(--gold)";
            }

            else {
                msgEl.innerHTML = "🎉 Hari ulang tahunmu sedang dinantikan dengan penuh cinta!";
                msgEl.style.color = "var(--gold)";
            }
        }

        setTimeout(update, 1000);
    }

    update();
})();

// ── 5. Gallery Lightbox ───────────────────────────────
(function initGallery() {
    const items = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightbox-img");
    const lbCaption = document.getElementById("lightbox-caption");
    const lbOverlay = document.getElementById("lightbox-overlay");
    const lbClose = document.getElementById("lightbox-close");
    if (!lightbox) return;

    function open(imgSrc, caption) {
        lbImg.src = imgSrc;
        lbCaption.textContent = caption;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function close() {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";

        // Clear src slightly delayed to avoid flash
        setTimeout(() => {
            lbImg.src = "";
        }

            , 350);
    }

    items.forEach((item) => {
        item.addEventListener("click", () => {
            const img = item.querySelector("img");
            const caption = item.querySelector(".gallery-caption");
            if (img) open(img.src, caption ? caption.textContent : "");
        });
    });
    lbOverlay?.addEventListener("click", close);
    lbClose?.addEventListener("click", close);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
    });
})();

// ── 6. Scroll Reveal ─────────────────────────────────
(function initScrollReveal() {
    const targets = [".countdown-section",
        ".letter-section",
        ".gallery-section",
        ".wishes-section",
        ".countdown-card",
        ".gallery-item",
        ".wish-card",
        ".letter-card",
    ];
    const revealEls = document.querySelectorAll(targets.join(","));
    revealEls.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                // Stagger children of grids
                entry.target.querySelectorAll(".reveal").forEach((child, i) => {
                    setTimeout(() => child.classList.add("visible"), i * 100);
                });
            }
        });
    }

        ,
        {
            threshold: 0.12
        });
    revealEls.forEach((el) => observer.observe(el));
})();

// ── 7. Popup on Load ─────────────────────────────────
(function initPopup() {
    const overlay = document.getElementById("popup-overlay");
    const btn = document.getElementById("popup-btn");
    const confettiEl = document.getElementById("popup-confetti");
    if (!overlay || !btn) return;
    // Create confetti inside popup
    const confettiChars = ["🎊", "✨", "🌟", "💫", "🎉", "💕", "🌸"];

    for (let i = 0; i < 20; i++) {
        const span = document.createElement("span");
        span.textContent = confettiChars[Math.floor(Math.random() * confettiChars.length)];
        span.style.cssText = ` position: absolute;

            font-size: $ {
                Math.random() * .8 + .7
            }

            rem;

            left: $ {
                Math.random() * 100
            }

            %;

            top: $ {
                Math.random() * 100
            }

            %;

            opacity: $ {
                Math.random() * .5 + .3
            }

            ;

            animation: floatUp $ {
                Math.random() * 3 + 2
            }

            s ease-in-out infinite;

            animation-delay: $ {
                Math.random() * 3
            }

            s;
            `;
        if (confettiEl) confettiEl.appendChild(span);
    }

    btn.addEventListener("click", () => {
        overlay.classList.add("hidden");
    });
})();

// ── 8. Celebration (fires on birthday) ───────────────
function launchCelebration() {
    const celebChars = ["🎊",
        "🎉",
        "💖",
        "⭐",
        "🌸",
        "✨"];

    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const el = document.createElement("div");
            el.textContent = celebChars[Math.floor(Math.random() * celebChars.length)];
            el.style.cssText = ` position: fixed;

                left: $ {
                    Math.random() * 100
                }

                vw;
                top: -40px;

                font-size: $ {
                    Math.random() * 1.5 + 1
                }

                rem;
                pointer-events: none;
                z-index: 9999;

                animation: petalFall $ {
                    Math.random() * 4 + 3
                }

                s linear forwards;
                `;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 8000);
        }

            , i * 100);
    }
}

// ── 9. Smooth active nav highlight ───────────────────
(function initNavHighlight() {
    const sections = document.querySelectorAll("section[id]");

    const onScroll = () => {
        const scrollY = window.scrollY + window.innerHeight / 2;

        sections.forEach((sec) => {
            if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
                document.title = `🎂 Birthday — $ {
                            sec.id.charAt(0).toUpperCase() + sec.id.slice(1)
                        }

                        `;
            }
        });
    }

        ;

    window.addEventListener("scroll", onScroll, {
        passive: true
    });
})();