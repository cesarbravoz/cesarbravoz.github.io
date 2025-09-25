/**
 * ===============================================
 * 🚀 CÉSAR BRAVO - PORTFOLIO TECNOLÓGICO
 * ===============================================
 * 
 * @file main.js
 * @description JavaScript principal para efectos interactivos y animaciones
 * @version 3.0
 * @author César Bravo
 * 
 * Funcionalidades:
 * - Efectos de escritura automática (typewriter)
 * - Contadores animados con IntersectionObserver
 * - Barras de progreso de habilidades
 * - Navegación suave y scroll effects
 * - Slider de proyectos con controles táctiles
 * - Menú móvil responsive
 * - Optimizaciones de performance
 * 
 * Dependencias:
 * - Intersection Observer API
 * - CSS Custom Properties
 * - Modern ES6+ features
 * ===============================================
 */

'use strict';

// ===== CONFIGURACIÓN TECNOLÓGICA =====
const CONFIG = {
    TYPEWRITER_SPEED: 100,
    COUNTER_DURATION: 2000,
    PROGRESS_DURATION: 2000,
    SCROLL_THRESHOLD: 100,
    BREAKPOINTS: {
        MOBILE: 768,
        TABLET: 1024,
        DESKTOP: 1200
    }
};

// ===== UTILIDADES =====
const Utils = {
    // Debounce para optimizar eventos
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle para scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Detectar si un elemento está en el viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Animación de números (contador)
    animateNumber(element, target, duration = CONFIG.COUNTER_DURATION) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
};

// ===== CLASE PRINCIPAL TECH HERO =====
class TechHero {
    constructor() {
        this.titles = [
            'Analista de Sistemas',
            'Desarrollador Web',
            'Programador con IA',
            'Especialista en eCommerce'
        ];
        this.currentTitleIndex = 0;
        this.typewriterElement = document.getElementById('typewriter');
        this.statsAnimated = false;
        this.progressAnimated = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startTypewriter();
        this.setupIntersectionObservers();
        this.animateSkills();
    }

    setupEventListeners() {
        // Scroll para efectos
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
        }, 16));

        // Resize para responsive
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));
    }

    setupTouchEvents() {
        this.container.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        }, { passive: true });

        this.container.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        }, { passive: true });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.container.matches(':hover') || this.container.contains(document.activeElement)) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.goToPrevious();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.goToNext();
                        break;
                    case ' ': // Spacebar
                        e.preventDefault();
                        this.toggleAutoSlide();
                        break;
                }
            }
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.goToNext(); // Swipe left - next image
            } else {
                this.goToPrevious(); // Swipe right - previous image
            }
            this.pauseAutoSlide();
        }
    }

    showImage(index) {
        this.images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        this.currentIndex = index;
        
        // Actualizar ARIA
        this.updateAriaLabels();
    }

    updateAriaLabels() {
        this.prevBtn?.setAttribute('aria-label', `Imagen anterior. Imagen ${this.currentIndex + 1} de ${this.images.length}`);
        this.nextBtn?.setAttribute('aria-label', `Siguiente imagen. Imagen ${this.currentIndex + 1} de ${this.images.length}`);
    }

    goToNext() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(this.currentIndex);
    }

    goToPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(this.currentIndex);
    }

    startAutoSlide() {
        if (this.autoSlideInterval) return;
        
        this.autoSlideInterval = setInterval(() => {
            this.goToNext();
        }, CONFIG.SLIDER_INTERVAL);
        this.isPlaying = true;
    }

    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
            this.isPlaying = false;
        }
    }

    resumeAutoSlide() {
        if (!this.isPlaying) {
            this.startAutoSlide();
        }
    }

    toggleAutoSlide() {
        if (this.isPlaying) {
            this.pauseAutoSlide();
        } else {
            this.resumeAutoSlide();
        }
    }

    openFullscreen() {
        const activeImg = this.container.querySelector('.slider-img.active');
        if (activeImg) {
            FullscreenModal.open(activeImg);
        }
    }
}

// ===== MODAL FULLSCREEN =====
class FullscreenModal {
    static init() {
        this.modal = document.getElementById('fullscreen-slider-modal');
        this.closeBtn = this.modal?.querySelector('.close-fullscreen-slider');
        this.sliderContainer = this.modal?.querySelector('.slider-fullscreen');

        if (!this.modal) return;

        this.setupEventListeners();
    }

    static setupEventListeners() {
        // Botón cerrar
        this.closeBtn?.addEventListener('click', () => this.close());

        // Cerrar al hacer clic fuera
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });

        // Prevenir scroll del body cuando el modal está abierto
        this.modal.addEventListener('wheel', (e) => {
            if (this.modal.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    static open(imageElement) {
        if (!this.modal || !imageElement) return;

        const clone = imageElement.cloneNode(true);
        clone.classList.add('active');
        
        this.sliderContainer.innerHTML = '';
        this.sliderContainer.appendChild(clone);
        
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        
        // Enfocar el botón de cerrar para accesibilidad
        setTimeout(() => {
            this.closeBtn?.focus();
        }, 100);

        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }

    static close() {
        if (!this.modal) return;

        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        this.sliderContainer.innerHTML = '';
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
    }
}

// ===== NAVEGACIÓN MÓVIL =====
class MobileNavigation {
    constructor() {
        this.header = document.querySelector('.container-header');
        this.navbar = document.querySelector('.navbar');
        this.menuBtn = document.querySelector('.mobile-menu-btn');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.isOpen = false;
        this.init();
    }

    init() {
        if (!this.menuBtn || !this.navbar) return;

        this.setupEventListeners();
        this.setupResponsiveHandling();
    }

    setupEventListeners() {
        // Toggle menú móvil
        this.menuBtn.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Cerrar menú al hacer clic en un enlace
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.header.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    setupResponsiveHandling() {
        const handleResize = Utils.debounce(() => {
            if (window.innerWidth > CONFIG.BREAKPOINTS.MOBILE && this.isOpen) {
                this.closeMenu();
            }
        }, 250);

        window.addEventListener('resize', handleResize);
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.navbar.classList.add('active');
        this.menuBtn.setAttribute('aria-expanded', 'true');
        this.isOpen = true;
        
        // Enfocar el primer enlace
        setTimeout(() => {
            this.navLinks[0]?.focus();
        }, 100);
    }

    closeMenu() {
        this.navbar.classList.remove('active');
        this.menuBtn.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
    }
}

// ===== NAVEGACIÓN SUAVE =====
class SmoothNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupActiveNavigation();
        this.setupScrollToTop();
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    Utils.scrollToElement(targetElement);
                    
                    // Actualizar URL sin scroll
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    }
                }
            });
        });
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        if (sections.length === 0) return;

        const updateActiveNav = Utils.throttle(() => {
            const scrollPosition = window.scrollY + 150;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Remover active de todos los enlaces
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Agregar active al enlace correspondiente
                    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                    activeLink?.classList.add('active');
                }
            });
        }, 100);

        window.addEventListener('scroll', updateActiveNav);
    }

    setupScrollToTop() {
        // Crear botón scroll to top
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Volver al inicio');
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 2rem;
            width: 5rem;
            height: 5rem;
            border: none;
            border-radius: 50%;
            background: var(--color-orange);
            color: var(--color-black);
            font-size: 2rem;
            font-weight: bold;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-normal);
            box-shadow: 0 4px 20px rgba(252, 214, 2, 0.3);
        `;

        document.body.appendChild(scrollBtn);

        // Mostrar/ocultar botón basado en scroll
        const toggleScrollBtn = Utils.throttle(() => {
            if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        }, 100);

        window.addEventListener('scroll', toggleScrollBtn);

        // Scroll to top functionality
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== ANIMACIONES DE SCROLL =====
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.skill-item, .education-item, .portfolio-item');
        this.init();
    }

    init() {
        if (!('IntersectionObserver' in window)) {
            // Fallback para navegadores sin soporte
            this.elements.forEach(el => el.classList.add('fade-in-up'));
            return;
        }

        this.setupObserver();
    }

    setupObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
class PerformanceOptimizer {
    static init() {
        this.lazyLoadImages();
        this.preloadCriticalImages();
        this.optimizeAnimations();
    }

    static lazyLoadImages() {
        if ('loading' in HTMLImageElement.prototype) {
            // Navegador soporta lazy loading nativo
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.loading = 'lazy';
            });
        } else {
            // Fallback con Intersection Observer
            const images = document.querySelectorAll('img[loading="lazy"]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    static preloadCriticalImages() {
        const criticalImages = [
            'img/Clipped_image_20240809_183904.png',
            'img/fondo-header.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    static optimizeAnimations() {
        // Reducir animaciones si el usuario lo prefiere
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        }
    }
}

// ===== INICIALIZACIÓN PRINCIPAL =====
class App {
    static init() {
        // Asegurar que el DOM esté cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    static initializeApp() {
        try {
            // Inicializar componentes
            new ModernSlider('.project-slider');
            FullscreenModal.init();
            new MobileNavigation();
            new SmoothNavigation();
            new ScrollAnimations();
            PerformanceOptimizer.init();

            console.log('✅ Sitio web de César Bravo inicializado correctamente');
            
            // Opcional: Analytics o métricas
            this.trackPerformance();
            
        } catch (error) {
            console.error('❌ Error al inicializar la aplicación:', error);
        }
    }

    static trackPerformance() {
        // Medir tiempo de carga
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.now();
                console.log(`⚡ Tiempo de carga: ${Math.round(loadTime)}ms`);
            });
        }
    }
}

// ===== INICIAR APLICACIÓN =====
App.init();