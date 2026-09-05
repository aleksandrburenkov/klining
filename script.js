/**
 * CleanPro - Скрипты для лендинга клининговой компании
 * Включает: навигацию, анимации, слайдер, форму, модальное окно
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // Мобильное меню (бургер)
    // ============================================
    
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', function() {
            burgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ============================================
    // Плавная прокрутка к секциям
    // ============================================
    
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const sectionPosition = section.offsetTop - headerHeight;
            
            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });
        }
    };
    
    // ============================================
    // Изменение шапки при скролле
    // ============================================
    
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ============================================
    // Анимация элементов при скролле
    // ============================================
    
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const checkAnimation = function() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    };
    
    // Проверка при загрузке и при скролле
    checkAnimation();
    window.addEventListener('scroll', checkAnimation);
    
    // ============================================
    // Активная ссылка в навигации
    // ============================================
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // ============================================
    // Слайдер отзывов
    // ============================================
    
    const reviewsTrack = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const reviewsDots = document.getElementById('reviewsDots');
    
    if (reviewsTrack && prevBtn && nextBtn) {
        let currentSlide = 0;
        const reviewCards = reviewsTrack.querySelectorAll('.review-card');
        const totalSlides = reviewCards.length;
        
        // Создание точек навигации
        if (reviewsDots) {
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.classList.add('reviews-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                reviewsDots.appendChild(dot);
            }
        }
        
        const dots = reviewsDots ? reviewsDots.querySelectorAll('.reviews-dot') : [];
        
        function updateSlider() {
            const cardWidth = reviewCards[0].offsetWidth + 32; // 32px gap
            reviewsTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
            
            // Обновление точек
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }
        
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
        
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
        
        // Автопереключение каждые 5 секунд
        let autoSlide = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
        
        // Остановка автопереключения при наведении
        reviewsTrack.addEventListener('mouseenter', () => clearInterval(autoSlide));
        reviewsTrack.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            }, 5000);
        });
        
        // Пересчет при изменении размера окна
        window.addEventListener('resize', updateSlider);
    }
    
    // ============================================
    // Форма обратной связи
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Валидация имени
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (nameInput && nameInput.value.trim().length < 2) {
                nameInput.classList.add('error');
                if (nameError) nameError.textContent = 'Введите корректное имя (минимум 2 символа)';
                isValid = false;
            } else if (nameInput) {
                nameInput.classList.remove('error');
                if (nameError) nameError.textContent = '';
            }
            
            // Валидация телефона
            const phoneInput = document.getElementById('phone');
            const phoneError = document.getElementById('phoneError');
            const phoneValue = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
            if (phoneValue.length < 11) {
                phoneInput.classList.add('error');
                if (phoneError) phoneError.textContent = 'Введите корректный номер телефона';
                isValid = false;
            } else if (phoneInput) {
                phoneInput.classList.remove('error');
                if (phoneError) phoneError.textContent = '';
            }
            
            // Валидация согласия
            const agreementInput = document.getElementById('agreement');
            if (agreementInput && !agreementInput.checked) {
                alert('Необходимо согласие на обработку персональных данных');
                isValid = false;
            }
            
            if (isValid) {
                // Имитация отправки формы
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Отправка...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
        
        // Удаление ошибки при вводе
        const formInputs = contactForm.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorElement = this.parentElement.querySelector('.form-error');
                if (errorElement) errorElement.textContent = '';
            });
        });
    }
    
    // ============================================
    // Маска для телефона
    // ============================================
    
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (!this.value) {
                this.value = '+7 (';
            }
        });
        
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.startsWith('7')) {
                value = value.substring(1);
            }
            
            if (value.length > 10) value = value.substring(0, 10);
            
            let formattedValue = '+7 (';
            if (value.length > 0) formattedValue += value.substring(0, 3);
            if (value.length > 3) formattedValue += ') ' + value.substring(3, 6);
            if (value.length > 6) formattedValue += '-' + value.substring(6, 8);
            if (value.length > 8) formattedValue += '-' + value.substring(8, 10);
            
            this.value = formattedValue;
        });
    });
    
    // ============================================
    // Модальное окно обратного звонка
    // ============================================
    
    const callbackBtn = document.getElementById('callbackBtn');
    const callbackModal = document.getElementById('callbackModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const callbackForm = document.getElementById('callbackForm');
    
    if (callbackBtn && callbackModal) {
        callbackBtn.addEventListener('click', function() {
            callbackModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (modalOverlay && modalClose) {
        [modalOverlay, modalClose].forEach(element => {
            element.addEventListener('click', closeModal);
        });
    }
    
    function closeModal() {
        if (callbackModal) {
            callbackModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Обработка формы модального окна
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('callbackName');
            const phoneInput = document.getElementById('callbackPhone');
            
            if (nameInput && phoneInput && nameInput.value.trim() && phoneInput.value.trim()) {
                const submitBtn = callbackForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Отправка...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Спасибо! Мы перезвоним вам в ближайшее время.');
                    callbackForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    closeModal();
                }, 1500);
            }
        });
    }
    
    // ============================================
    // Параллакс эффект для hero секции
    // ============================================
    
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }
    
    // ============================================
    // Счетчик чисел в статистике
    // ============================================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = function(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = number / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current).toLocaleString('ru-RU');
            if (hasPlus) displayValue += '+';
            if (hasPercent) displayValue += '%';
            
            element.textContent = displayValue;
        }, stepTime);
    };
    
    // Запуск счетчика когда статистика видна
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
    
    console.log('CleanPro скрипты загружены успешно!');
});
