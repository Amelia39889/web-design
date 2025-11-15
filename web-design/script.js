  document.addEventListener('DOMContentLoaded',() => {
    initVisitCounter();
    initDateTime();
    initContactForm();
    initScrollToTop();
    initProjectFilter();
    initThemeToggle();
    initSlider();
    initTypewriter();
    initWeatherWidget();

  });


function initDateTime() {
    const dateTimeEL = document.getElementById('date-time');
    if (!dateTimeEL) return;

    function updateTime() {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();

        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');

        dateTimeEL.textContent = `Dziś jest: ${dd}.${mm}.${yyyy}, godzina: ${hh}:${min}:${ss}`;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

  function initVisitCounter(){
  const visitEL = document.getElementById('visit-counter');
    if (!visitEL) return;
    const key = 'visitCount';
    let count = localStorage.getItem(key);
    if (count == null) {
        visitEL.textContent = 'Witaj po raz pierwszy!';
        localStorage.setItem(key, '1');
    }else {
        count = parseInt(count, 10) + 1;
        localStorage.setItem(key, String(count));
        visitEL.textContent = `To jest Twoja ${count} wizyta na tej stronie!`;   
    }
}

function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return; 

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";

        let valid = true;

        if (name === "") {
            nameError.textContent = "Podaj imię!";
            valid = false;
        }

        if (email === "") {
            emailError.textContent = "Podaj email!";
            valid = false;
        } else if (!email.includes('@')) {
            emailError.textContent = "Email musi zawierać @";
            valid = false;
        }

        if (message === "") {
            messageError.textContent = "Wpisz wiadomość!";
            valid = false;
        }

        if (valid) {
            alert("Dziękuję! Formularz został wysłany poprawnie.");
            form.reset();
        }
    });
}



function initScrollToTop() {
   
    const button = document.createElement('button');
    button.textContent = '⬆️';
    button.id = 'scrollTopBtn';

    button.style.position = 'fixed';
    button.style.bottom = '30px';
    button.style.right = '30px';
    button.style.padding = '15px 18px';
    button.style.fontSize = '24px';
    button.style.border = 'none';
    button.style.borderRadius = '50%';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    button.style.display = 'none';     
    button.style.zIndex = '999';

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


function initProjectFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    if (!buttons.length || !projects.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            projects.forEach(project => {
                const category = project.getAttribute('data-category');

                if (filter === "all" || filter === category) {
                    project.style.display = "block";
                } else {
                    project.style.display = "none";
                }
            });
        });
    });
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    // Wczytaj zapisany motyw
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Kliknięcie przełącznika
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Zapis wyboru w pamięci
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}




function initSlider() {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    if (!track || !slides.length) return;

    let current = 0;
    let autoplay;

    // Tworzenie kropek
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            goToSlide(i);
        });

        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach(d => d.classList.remove('active'));
        dots[current].classList.add('active');
    }

    function goToSlide(index) {
        current = index;
        track.style.transform = `translateX(-${current * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        goToSlide(current);
    }

    function prevSlideFunc() {
        current = (current - 1 + slides.length) % slides.length;
        goToSlide(current);
    }

    // Przyciski
    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlideFunc);

    // Autoplay
    function startAutoplay() {
        autoplay = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplay);
    }

    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
}



function initTypewriter() {
    const element = document.getElementById('typing');
    if (!element) return;

    const texts = ['Developer', 'Designer', 'Creator'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (!isDeleting) {
            element.textContent = currentText.substring(0, charIndex++);
            if (charIndex > currentText.length) {
                setTimeout(() => isDeleting = true, 2000);
            }
        } else {
            element.textContent = currentText.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                charIndex = 0;
            }
        }

        setTimeout(type, isDeleting ? 80 : 120);
    }

    type();
}



function initWeatherWidget() {
    const widget = document.getElementById("weather-widget");
    if (!widget) return;

    const url = "https://wttr.in/?format=%l:+%C+%t";

    fetch(url)
        .then(response => response.text())
        .then(text => {
            const weatherText = text.trim();

            const emoji = getWeatherEmoji(weatherText);

            widget.textContent = emoji + " " + weatherText;
        })
        .catch(err => {
            console.error("Błąd pobierania pogody:", err);
            widget.textContent = "❗ Błąd ładowania pogody";
        });
}

function getWeatherEmoji(weatherString) {
    const txt = weatherString.toLowerCase();

    if (txt.includes("sun") || txt.includes("clear") || txt.includes("slonecznie")) return "☀️";
    if (txt.includes("cloud") || txt.includes("cloudy") || txt.includes("pochmurnie")) return "☁️";
    if (txt.includes("partly") || txt.includes("czesciowo")) return "⛅";
    if (txt.includes("rain") || txt.includes("deszcz")) return "🌧️";
    if (txt.includes("storm") || txt.includes("burza")) return "⛈️";
    if (txt.includes("snow") || txt.includes("snieg")) return "❄️";
    if (txt.includes("fog") || txt.includes("mgla")) return "🌫️";

    return "🌍"; // domyślna ikona
}

