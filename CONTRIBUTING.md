# 🤝 Contribuyendo al Portfolio de César Bravo

¡Gracias por tu interés en contribuir al proyecto! Aunque este es un portfolio personal, las contribuciones son bienvenidas para mejorar el código, optimizar el rendimiento, o agregar nuevas características.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Estándares de Código](#estándares-de-código)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)

## 📜 Código de Conducta

Este proyecto adhiere al [Contributor Covenant](https://www.contributor-covenant.org/). Al participar, se espera que mantengas este código. Por favor reporta comportamientos inaceptables.

## 🚀 ¿Cómo puedo contribuir?

### Tipos de contribuciones que buscamos:

- 🐛 **Corrección de bugs**
- ⚡ **Optimizaciones de performance**
- 📱 **Mejoras de responsive design**
- ♿ **Mejoras de accesibilidad**
- 🎨 **Efectos visuales innovadores**
- 📝 **Documentación**
- 🧪 **Testing y QA**

### Lo que NO aceptamos:
- Cambios al contenido personal (textos sobre mí, proyectos, etc.)
- Modificaciones de branding o identidad visual personal
- Cambios que rompan la compatibilidad con navegadores modernos

## 🛠️ Configuración del Entorno

### Prerrequisitos
```bash
# Git
git --version

# Editor de código (recomendado)
# VS Code con extensiones:
# - Live Server
# - Prettier
# - ESLint
# - Auto Rename Tag
```

### Setup Local
1. **Fork del repositorio**
   ```bash
   # Click en "Fork" en GitHub
   ```

2. **Clonar tu fork**
   ```bash
   git clone https://github.com/TU_USERNAME/cesarbravoz.github.io.git
   cd cesarbravoz.github.io
   ```

3. **Configurar remotes**
   ```bash
   git remote add upstream https://github.com/cesarbravoz/cesarbravoz.github.io.git
   git remote -v
   ```

4. **Ejecutar localmente**
   ```bash
   # Opción 1: Live Server (VS Code)
   # Right-click en index.html > "Open with Live Server"
   
   # Opción 2: Python
   python -m http.server 8000
   
   # Opción 3: Node.js
   npx serve .
   ```

## 🔄 Flujo de Trabajo

### 1. Crear una rama de feature
```bash
git checkout main
git pull upstream main
git checkout -b feature/nombre-descriptivo
```

### 2. Hacer cambios
- Sigue los [estándares de código](#estándares-de-código)
- Haz commits pequeños y descriptivos
- Prueba en múltiples navegadores y dispositivos

### 3. Commit y Push
```bash
git add .
git commit -m "feat: descripción clara del cambio"
git push origin feature/nombre-descriptivo
```

### 4. Crear Pull Request
- Ve a tu fork en GitHub
- Click en "Compare & pull request"
- Llena la plantilla del PR completamente

## 💻 Estándares de Código

### HTML
```html
<!-- ✅ Bien: Semántico y accesible -->
<section class="about-section" aria-labelledby="about-title">
    <h2 id="about-title">Sobre Mí</h2>
    <p>Descripción accesible...</p>
</section>

<!-- ❌ Mal: No semántico -->
<div class="section">
    <div class="title">Sobre Mí</div>
    <div>Descripción...</div>
</div>
```

### CSS
```css
/* ✅ Bien: Mobile-first, variables CSS */
.component {
    /* Mobile styles */
    padding: var(--spacing-sm);
    background: var(--color-dark);
    
    /* Desktop enhancement */
    @media (min-width: 768px) {
        padding: var(--spacing-lg);
    }
}

/* ❌ Mal: Desktop-first, valores hardcoded */
.component {
    padding: 32px;
    background: #1a1a1a;
    
    @media (max-width: 767px) {
        padding: 16px;
    }
}
```

### JavaScript
```javascript
// ✅ Bien: Moderno, documentado, performance-conscious
/**
 * Anima el contador de estadísticas
 * @param {HTMLElement} element - Elemento del contador
 * @param {number} target - Valor objetivo
 */
const animateCounter = (element, target) => {
    const observer = new IntersectionObserver((entries) => {
        // Implementation...
    }, { threshold: 0.5 });
    
    observer.observe(element);
};

// ❌ Mal: Sintaxis antigua, no optimizado
function animateCounter(element, target) {
    setInterval(function() {
        // Inefficient animation...
    }, 16);
}
```

### Naming Conventions
```css
/* BEM Methodology */
.component { }
.component__element { }
.component--modifier { }

/* Ejemplos */
.hero-section { }
.hero-section__title { }
.hero-section--dark { }
```

## 🐛 Reportar Bugs

### Antes de reportar
1. Busca en [issues existentes](https://github.com/cesarbravoz/cesarbravoz.github.io/issues)
2. Reproduce el bug en la última versión
3. Verifica en múltiples navegadores

### Template de Bug Report
```markdown
## 🐛 Descripción del Bug
Descripción clara y concisa del problema.

## 🔄 Pasos para Reproducir
1. Ve a '...'
2. Click en '...'
3. Scroll hasta '...'
4. Ver error

## ✅ Comportamiento Esperado
Qué debería pasar normalmente.

## 📷 Screenshots
Si aplica, agregar screenshots.

## 🌍 Entorno
- OS: [e.g. Windows 10]
- Navegador: [e.g. Chrome 94]
- Dispositivo: [e.g. iPhone 12]
- Resolución: [e.g. 1920x1080]

## ℹ️ Contexto Adicional
Cualquier otra información relevante.
```

## 💡 Sugerir Mejoras

### Template de Feature Request
```markdown
## 🚀 Feature Request

### 📋 Descripción
Descripción clara de la funcionalidad propuesta.

### 💡 Problema que Resuelve
¿Qué problema específico soluciona esta feature?

### 🎯 Solución Propuesta
Describe cómo te imaginas que funcione.

### 🔄 Alternativas Consideradas
Otras formas de resolver el problema.

### 📊 Impacto
- Performance: [Positivo/Neutro/Negativo]
- Accesibilidad: [Mejora/No afecta]
- Mantenibilidad: [Mejora/No afecta]
```

## 🏆 Reconocimientos

Los contribuyentes serán reconocidos en:
- README.md del proyecto
- Comentarios en el código (si es apropiado)
- LinkedIn de César Bravo (para contribuciones significativas)

### Hall of Fame 🌟
<!-- Los contribuyentes aparecerán aquí -->

## 📞 ¿Tienes preguntas?

- 📧 Email: cesar.bravo@email.com
- 💼 LinkedIn: [César Bravo](https://www.linkedin.com/in/cesar-hamilton-bravo-naranjo)
- 🐱 GitHub: [@cesarbravoz](https://github.com/cesarbravoz)

---

¡Gracias por hacer que este proyecto sea mejor! 🚀✨