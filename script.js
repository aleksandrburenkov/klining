/**
 * CleanPro - JavaScript для лендинга клининговой компании
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Мобильное меню (бургер) ---
    const burgerBtn = document.getElementById('burgerBtn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (burgerBtn) {
        burgerBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            burgerBtn.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burgerBtn.classList.remove('active');
            });
        });
    }
    
    // --- Плавная прокрутка к якорям ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- Подсветка активной секции в меню ---
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // --- Изменение шапки при скролле ---
    const header = document.getElementById('header');
    
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    
    // --- Модальное окно ---
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const openModalBtns = document.querySelectorAll('.open-modal');
    
    function openModal() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    // --- Маска для телефона ---
    const phoneInputs = document.querySelectorAll('.phone-mask');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length === 0) {
                e.target.value = '';
                return;
            }
            
            if (value[0] === '8' || value[0] === '7') {
                value = value.slice(1);
            }
            
            let formattedValue = '+7';
            if (value.length > 0) formattedValue += ' (' + value.slice(0, 3);
            if (value.length > 3) formattedValue += ') ' + value.slice(3, 6);
            if (value.length > 6) formattedValue += '-' + value.slice(6, 8);
            if (value.length > 8) formattedValue += '-' + value.slice(8, 10);
            
            e.target.value = formattedValue;
        });
        
        input.addEventListener('focus', () => {
            if (!input.value) {
                input.value = '+7 (';
            }
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '+7 ()' || input.value === '+7 (' || input.value === '') {
                input.value = '';
            }
        });
    });
    
    // --- Валидация форм ---
    const forms = [
        document.getElementById('calcForm'),
        document.getElementById('ctaForm'),
        document.getElementById('modalForm')
    ];
    
    forms.forEach(form => {
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                }
            });
            
            // Проверка телефона
            const phoneInput = form.querySelector('.phone-mask');
            if (phoneInput) {
                const phoneValue = phoneInput.value.replace(/\D/g, '');
                if (phoneValue.length < 11) {
                    isValid = false;
                    phoneInput.style.borderColor = '#e74c3c';
                    
                    setTimeout(() => {
                        phoneInput.style.borderColor = '';
                    }, 2000);
                }
            }
            
            if (isValid) {
                // Имитация отправки формы
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Отправлено!';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                    closeModal();
                    alert('Спасибо! Ваша заявка принята. Менеджер свяжется с вами в ближайшее время.');
                }, 1500);
            }
        });
    });
    
    // --- Слайдер отзывов ---
    const slider = document.getElementById('reviewsSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (slider && prevBtn && nextBtn) {
        let isDragging = false;
        let startX;
        let scrollLeft;
        
        // Автопрокрутка
        let autoScrollInterval = setInterval(() => {
            const maxScroll = slider.scrollWidth - slider.clientWidth;
            if (slider.scrollLeft >= maxScroll) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: 420, behavior: 'smooth' });
            }
        }, 5000);
        
        // Остановка автопрокрутки при взаимодействии
        slider.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        slider.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => {
                const maxScroll = slider.scrollWidth - slider.clientWidth;
                if (slider.scrollLeft >= maxScroll) {
                    slider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    slider.scrollBy({ left: 420, behavior: 'smooth' });
                }
            }, 5000);
        });
        
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -420, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: 420, behavior: 'smooth' });
        });
        
        // Drag для мыши
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = 'grabbing';
        });
        
        slider.addEventListener('mouseleave', () => {
            isDragging = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mouseup', () => {
            isDragging = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }
    
    // --- Анимация появления элементов при скролле ---
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
    
    // --- Активная навигация при загрузке ---
    highlightNavLink();
});
