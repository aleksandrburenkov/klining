/**
 * ========================================
   СКРИПТЫ - УЮТНАЯ УБОРКА
   Функциональность лендинга
   ========================================
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ПЛАВНАЯ ПРОКРУТКА К СЕКЦИЯМ =====
    const scrollLinks = document.querySelectorAll('[data-scroll]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Закрыть мобильное меню если открыто
                mobileMenu.classList.remove('active');
                burger.classList.remove('active');
            }
        });
    });
    
    // ===== МОБИЛЬНОЕ МЕНЮ (БУРГЕР) =====
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Добавляем класс для мобильного меню
    if (mobileMenu) {
        mobileMenu.classList.add('mobile-menu');
    }
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Блокируем скролл страницы при открытом меню
        document.body.classList.toggle('menu-open');
        
        // Анимация линий бургера
        const lines = this.querySelectorAll('.header__burger-line');
        if (this.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    });
    
    // Закрываем меню при клике на ссылку
    const mobileLinks = mobileMenu.querySelectorAll('.header__nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Сброс анимации бургера
            const lines = burger.querySelectorAll('.header__burger-line');
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        });
    });
    
    // ===== ИЗМЕНЕНИЕ ШАПКИ ПРИ СКРОЛЛЕ =====
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ===== АНИМАЦИИ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ =====
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
    
    // ===== КНОПКА НАВЕРХ =====
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== ВАЛИДАЦИЯ ФОРМЫ =====
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const phoneInput = this.querySelector('input[type="tel"]');
            const commentInput = this.querySelector('textarea');
            
            let isValid = true;
            
            // Валидация имени
            if (nameInput.value.trim().length < 2) {
                showError(nameInput, 'Введите корректное имя (минимум 2 символа)');
                isValid = false;
            } else {
                clearError(nameInput);
            }
            
            // Валидация телефона
            const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            const cleanPhone = phoneInput.value.replace(/[\s\-\(\)]/g, '');
            
            if (!phoneRegex.test(phoneInput.value) || cleanPhone.length < 11) {
                showError(phoneInput, 'Введите корректный номер телефона');
                isValid = false;
            } else {
                clearError(phoneInput);
            }
            
            if (isValid) {
                // Имитация отправки формы
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Отправка...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Спасибо за заявку! Наш менеджер свяжется с вами в ближайшее время.');
                    orderForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
        
        // Функция показа ошибки
        function showError(input, message) {
            input.style.borderColor = '#FF6B6B';
            input.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
            
            let error = input.parentElement.querySelector('.error-message');
            if (!error) {
                error = document.createElement('span');
                error.className = 'error-message';
                error.style.cssText = 'color: #FF6B6B; font-size: 12px; margin-top: 4px; display: block;';
                input.parentElement.appendChild(error);
            }
            error.textContent = message;
        }
        
        // Функция очистки ошибки
        function clearError(input) {
            input.style.borderColor = '#E5E7EB';
            input.style.backgroundColor = '';
            
            const error = input.parentElement.querySelector('.error-message');
            if (error) {
                error.remove();
            }
        }
        
        // Очистка ошибок при вводе
        const formInputs = orderForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }
    
    // ===== МАСКА ДЛЯ ТЕЛЕФОНА =====
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (this.value === '') {
                this.value = '+7 (';
            }
        });
        
        input.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = '7' + value.substring(1);
                } else {
                    value = '7' + value;
                }
            }
            
            let formattedValue = '+7 (';
            if (value.length > 1) {
                formattedValue += value.substring(1, 4);
            }
            if (value.length >= 4) {
                formattedValue += ') ' + value.substring(4, 7);
            }
            if (value.length >= 7) {
                formattedValue += '-' + value.substring(7, 9);
            }
            if (value.length >= 9) {
                formattedValue += '-' + value.substring(9, 11);
            }
            
            this.value = formattedValue;
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '+7 ()') {
                this.value = '';
            }
        });
    });
    
    // ===== АККОРДЕОН (ЕСЛИ ЕСТЬ) =====
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Закрываем все остальные
            accordionItems.forEach(i => i.classList.remove('active'));
            
            // Если не было активно, открываем текущее
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ===== ПАРАЛЛАКС ЭФФЕКТ ДЛЯ HERO =====
    const heroImage = document.querySelector('.hero__image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const heroSection = document.querySelector('.hero');
            
            if (scrolled < heroSection.offsetHeight) {
                heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // ===== СЧЕТЧИК ЦИФР (ДЛЯ ABOUT STATS) =====
    const statNumbers = document.querySelectorAll('.about__stat-number');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const hasPlus = text.includes('+');
                const hasK = text.includes('к');
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (!isNaN(number)) {
                    animateCounter(target, 0, number, 2000, hasPlus, hasK);
                    statsObserver.unobserve(target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
    
    function animateCounter(element, start, end, duration, hasPlus, hasK) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing функция
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            let displayValue = current.toString();
            if (hasK) displayValue += 'к';
            if (hasPlus) displayValue += '+';
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Финальное значение
                let finalValue = end.toString();
                if (hasK) finalValue += 'к';
                if (hasPlus) finalValue += '+';
                element.textContent = finalValue;
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // ===== ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ =====
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ===== КОНСОЛЬ ДЛЯ ОТЛАДКИ =====
    console.log('%c Уютная Уборка ', 'background: #2E8B57; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
    console.log('Лендинг успешно загружен! 🎉');
});

// ===== ДОПОЛНИТЕЛЬНЫЕ УТИЛИТЫ =====

// Debounce функция для оптимизации событий
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle функция для ограничения частоты вызовов
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
