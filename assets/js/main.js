// RestoreCraft Furniture Global JavaScript

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Active Nav State
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Desktop Nav
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-primary', 'font-semibold', 'border-b-2', 'border-primary');
            link.classList.remove('hover:text-primary');
        }
    });

    // Mobile Nav
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-primary', 'font-semibold');
            link.classList.remove('hover:text-primary');
        }
    });

    // 2. Dark Mode Toggle (Multiple toggles now)
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement;

    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    });

    // 3. LTR/RTL Toggle (Multiple toggles now)
    const dirToggleBtns = document.querySelectorAll('.dir-toggle');
    
    // Helper to set direction and update button text
    const setDirection = (dir) => {
        htmlElement.setAttribute('dir', dir);
        localStorage.setItem('dir', dir);
        dirToggleBtns.forEach(btn => {
            btn.innerHTML = dir === 'rtl' ? '<span class="text-xs">LTR</span>' : '<span class="text-xs">RTL</span>';
        });
    };

    // Forcing LTR once to fix the accidental flip, then relying on localstorage
    // Actually, let's just clear the localstorage if it's currently broken, or just set it to 'ltr' by default if this is the first load.
    // For now, let's always initialize to ltr to fix the user's issue, unless they explicitly click it again later.
    // To properly fix their current broken state without them having to click:
    setDirection('ltr'); 

    dirToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (htmlElement.getAttribute('dir') === 'ltr' || !htmlElement.hasAttribute('dir')) {
                setDirection('rtl');
            } else {
                setDirection('ltr');
            }
        });
    });

    // 4. Mobile Hamburger Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 5. Sticky Navbar
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled', 'glass');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('scrolled', 'glass');
                navbar.classList.add('bg-transparent');
            }
        });
    }

    // 6. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('hidden');
                scrollTopBtn.classList.add('opacity-100');
            } else {
                scrollTopBtn.classList.add('hidden');
                scrollTopBtn.classList.remove('opacity-100');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Fade-in Sections Observer
    const fadeElements = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));
});
