/**
 * César Bravo - Sitio Web Tecnológico
 * JavaScript moderno con efectos futuristas y animaciones avanzadas
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

    // ===== EFECTO TYPEWRITER =====
    startTypewriter() {
        if (!this.typewriterElement) return;

        const typeText = (text, callback) => {
            let i = 0;
            this.typewriterElement.textContent = '';
            
            const type = () => {
                if (i < text.length) {
                    this.typewriterElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, CONFIG.TYPEWRITER_SPEED);
                } else {
                    setTimeout(() => {
                        this.eraseText(callback);
                    }, 2000);
                }
            };
            type();
        };

        const eraseText = (callback) => {
            const currentText = this.typewriterElement.textContent;
            let i = currentText.length;
            
            const erase = () => {
                if (i > 0) {
                    this.typewriterElement.textContent = currentText.substring(0, i - 1);
                    i--;
                    setTimeout(erase, CONFIG.TYPEWRITER_SPEED / 2);
                } else {
                    callback();
                }
            };
            erase();
        };

        this.eraseText = eraseText;

        const cycleText = () => {
            const currentTitle = this.titles[this.currentTitleIndex];
            typeText(currentTitle, () => {
                this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
                setTimeout(cycleText, 500);
            });
        };

        cycleText();
    }

    // ===== CONTADORES ANIMADOS =====
    animateCounters() {
        if (this.statsAnimated) return;
        
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            Utils.animateNumber(stat, target);
        });
        
        this.statsAnimated = true;
    }

    // ===== BARRAS DE PROGRESO =====
    animateProgressBars() {
        if (this.progressAnimated) return;
        
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach((bar, index) => {
            const skill = bar.getAttribute('data-skill');
            setTimeout(() => {
                bar.style.width = skill + '%';
            }, index * 200);
        });
        
        this.progressAnimated = true;
    }

    // ===== ANIMACIÓN DE HABILIDADES =====
    animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('animate-in');
        });
    }

    // ===== INTERSECTION OBSERVERS =====
    setupIntersectionObservers() {
        // Observer para estadísticas
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats-panel');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Observer para barras de progreso
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressBars();
                }
            });
        }, { threshold: 0.5 });

        const terminalSection = document.querySelector('.info-panel');
        if (terminalSection) {
            progressObserver.observe(terminalSection);
        }

        // Observer para secciones
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // ===== MANEJO DE SCROLL =====
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efecto parallax sutil en el fondo
        const techBackground = document.querySelector('.tech-background');
        if (techBackground) {
            const parallaxSpeed = scrollTop * 0.5;
            techBackground.style.transform = `translateY(${parallaxSpeed}px)`;
        }

        // Actualizar header
        const header = document.querySelector('.container-header');
        if (header) {
            if (scrollTop > CONFIG.SCROLL_THRESHOLD) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // ===== MANEJO DE RESIZE =====
    handleResize() {
        // Recalcular animaciones si es necesario
        const width = window.innerWidth;
        
        if (width <= CONFIG.BREAKPOINTS.MOBILE) {
            // Ajustes para móvil
            this.optimizeForMobile();
        } else if (width <= CONFIG.BREAKPOINTS.TABLET) {
            // Ajustes para tablet
            this.optimizeForTablet();
        } else {
            // Ajustes para desktop
            this.optimizeForDesktop();
        }
    }

    optimizeForMobile() {
        // Reducir animaciones en móvil
        document.documentElement.style.setProperty('--transition-normal', '0.2s ease');
    }

    optimizeForTablet() {
        // Ajustes para tablet
        document.documentElement.style.setProperty('--transition-normal', '0.25s ease');
    }

    optimizeForDesktop() {
        // Restaurar animaciones completas
        document.documentElement.style.setProperty('--transition-normal', '0.3s ease');
    }
}

// ===== NAVEGACIÓN MODERNA =====
class ModernNavigation {
    constructor() {
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isMenuOpen = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSmoothScrolling();
    }

    setupEventListeners() {
        // Menú móvil
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Cerrar menú al hacer clic en un enlace
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !e.target.closest('.navbar') && !e.target.closest('.mobile-menu-btn')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.navbar.classList.add('mobile-active');
        this.mobileMenuBtn.classList.add('active');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
        this.isMenuOpen = true;
    }

    closeMobileMenu() {
        this.navbar.classList.remove('mobile-active');
        this.mobileMenuBtn.classList.remove('active');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        this.isMenuOpen = false;
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.container-header').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// ===== EFECTOS ESPECIALES =====
class SpecialEffects {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
        this.setupHoverEffects();
    }

    createParticles() {
        // Crear partículas adicionales si es necesario
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        // Agregar más partículas dinámicamente
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--color-neon-green);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation: matrix ${8 + Math.random() * 4}s linear infinite;
                animation-delay: ${Math.random() * 8}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    setupHoverEffects() {
        // Efectos de hover para las tarjetas de habilidades
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.createHoverEffect(item);
            });
        });
    }

    createHoverEffect(element) {
        // Crear efecto de brillo temporal
        const glowEffect = document.createElement('div');
        glowEffect.className = 'hover-glow';
        glowEffect.style.cssText = `
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            background: linear-gradient(45deg, var(--color-orange), var(--color-neon-green));
            border-radius: 20px;
            opacity: 0.3;
            z-index: -1;
            animation: glowPulse 0.5s ease-out;
        `;
        
        element.style.position = 'relative';
        element.appendChild(glowEffect);
        
        setTimeout(() => {
            if (glowEffect.parentNode) {
                glowEffect.remove();
            }
        }, 500);
    }
}

// ===== INICIALIZACIÓN =====
class WebsiteManager {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Inicializar componentes principales
            this.components.techHero = new TechHero();
            this.components.navigation = new ModernNavigation();
            this.components.effects = new SpecialEffects();
            
            console.log('🚀 Sitio web tecnológico de César Bravo inicializado correctamente');
        } catch (error) {
            console.error('❌ Error al inicializar el sitio web:', error);
        }
    }

    // Método para destruir componentes si es necesario
    destroy() {
        Object.values(this.components).forEach(component => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
    }
}

// ===== AGREGAR ESTILOS CSS DINÁMICOS =====
const dynamicStyles = `
    @keyframes glowPulse {
        0% { transform: scale(0.9); opacity: 0; }
        50% { transform: scale(1.05); opacity: 0.5; }
        100% { transform: scale(1); opacity: 0; }
    }
    
    .section-visible {
        animation: slideInUp 0.8s ease-out;
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    .container-header.scrolled {
        background: rgba(0, 0, 0, 0.98);
        backdrop-filter: blur(15px);
    }
    
    @media (max-width: 768px) {
        .navbar.mobile-active {
            display: flex !important;
            position: fixed;
            top: 7rem;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 2rem;
            border-top: 1px solid var(--color-hologram);
        }
    }
`;

// Inyectar estilos dinámicos
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// ===== INICIAR APLICACIÓN =====
const app = new WebsiteManager();

// Exportar para uso global si es necesario
window.CesarBravoTech = {
    app,
    Utils,
    CONFIG
};