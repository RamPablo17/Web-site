document.addEventListener('DOMContentLoaded', () => {
    
    // ===================================================
    // 1. MENU DESPLEGABLE MÓVIL (NAVBAR SUPERIOR)
    // ===================================================
    const navbarToggle = document.getElementById('navbarToggle');
    const navMenu = document.getElementById('navMenu');

    if (navbarToggle && navMenu) {
        navbarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('show');
            
            // Cambiar icono entre barra y cruz
            const icon = navbarToggle.querySelector('i');
            icon.className = navMenu.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
        });

        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && !navMenu.contains(e.target) && !navbarToggle.contains(e.target)) {
                navMenu.classList.remove('show');
                navbarToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    }

    // ===================================================
    // 2. DROPDOWNS: LECTURAS Y CURSOS (CORREGIDO)
    // ===================================================
    const lecturasToggle = document.getElementById('lecturasToggle');
    const lecturasDropdown = document.getElementById('lecturasDropdown');
    const cursosToggle = document.getElementById('CursosToggle');
    const cursosDropdown = document.getElementById('CursosDropdown');

    // Lógica para el menú de Lecturas
    if (lecturasToggle && lecturasDropdown) {
        lecturasToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Cerramos cursos si estuviera abierto
            if (cursosToggle && cursosDropdown) {
                cursosToggle.parentElement.classList.remove('open');
                cursosDropdown.classList.remove('show');
            }

            const parent = lecturasToggle.parentElement;
            parent.classList.toggle('open');
            lecturasDropdown.classList.toggle('show');
        });
    }

    // Lógica para el menú de Cursos
    if (cursosToggle && cursosDropdown) {
        cursosToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Cerramos lecturas si estuviera abierto
            if (lecturasToggle && lecturasDropdown) {
                lecturasToggle.parentElement.classList.remove('open');
                lecturasDropdown.classList.remove('show');
            }

            const parent = cursosToggle.parentElement;
            parent.classList.toggle('open');
            cursosDropdown.classList.toggle('show');
        });
    }

    // Cerrar CUALQUIER dropdown si se hace clic fuera en la pantalla
    document.addEventListener('click', () => {
        if (lecturasToggle && lecturasDropdown) {
            lecturasToggle.parentElement.classList.remove('open');
            lecturasDropdown.classList.remove('show');
        }
        if (cursosToggle && cursosDropdown) {
            cursosToggle.parentElement.classList.remove('open');
            cursosDropdown.classList.remove('show');
        }
    });

    // ===================================================
    // 3. SISTEMA DE ACORDEONES (NORMA GOB.MX V3)
    // ===================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.icon');
            
            header.classList.toggle('active');

            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.textContent = '−';
            } else {
                content.style.maxHeight = "0";
                if (icon) icon.textContent = '+';
            }
        });
    });

    // ===================================================
    // 4. CARRUSEL INFORMATIVO AUTOMATIZADO
    // ===================================================
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.getElementById('nextSlide');
    const prevButton = document.getElementById('prevSlide');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;

        const updateCarousel = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            currentIndex = index;
        };

        const nextSlide = () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            updateCarousel(nextIndex);
        };

        const prevSlide = () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = slides.length - 1;
            updateCarousel(prevIndex);
        };

        if (nextButton) nextButton.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
        if (prevButton) prevButton.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => { updateCarousel(index); resetAutoplay(); });
        });

        const startAutoplay = () => { slideInterval = setInterval(nextSlide, 5000); };
        const resetAutoplay = () => { clearInterval(slideInterval); startAutoplay(); };

        startAutoplay();

        const wrapper = document.querySelector('.carousel-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
            wrapper.addEventListener('mouseleave', startAutoplay);
        }
    }
});
