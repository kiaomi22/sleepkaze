document.addEventListener('DOMContentLoaded', () => {

    // 1. NAVIGASI
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header');

    // Active link on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 // 60% section terlihat
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // 2. VANTA.JS - Interactive Background
    VANTA.NET({
        el: "#home",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x6f00ff,
        backgroundColor: 0x151525,
        points: 10.00,
        maxDistance: 25.00,
        spacing: 18.00
    });

    // 3. Typing Effect
    const typingElement = document.getElementById('typing-effect');
    const texts = ["Mobile Analyst", "Software Engineer", "Problem Solver"];
    let textIndex = 0, charIndex = 0;
    const type = () => { if (charIndex < texts[textIndex].length) { typingElement.textContent += texts[textIndex].charAt(charIndex++); setTimeout(type, 100); } else { setTimeout(erase, 2000); } };
    const erase = () => { if (charIndex > 0) { typingElement.textContent = texts[textIndex].substring(0, --charIndex); setTimeout(erase, 50); } else { textIndex = (textIndex + 1) % texts.length; setTimeout(type, 500); } };
    setTimeout(type, 1000);


    // 4. Scroll Reveal Animation
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => revealObserver.observe(el));


    // 5. Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') themeToggle.checked = true;
    }
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // 6. Scroll Indicator & Navbar Background Change
    window.addEventListener('scroll', () => {
        // Navbar background change
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll indicator update
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        document.getElementById('scroll-indicator').style.width = scrolled + '%';
    });


    // 7. Chart.js - SWOT & Porter
    // SWOT
    const swotCtx = document.getElementById('swotChart').getContext('2d');
    new Chart(swotCtx, {
        type: 'radar',
        data: {
            labels: ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'],
            datasets: [{ label: 'Impact Level', data: [9, 7, 9, 8], backgroundColor: 'rgba(74, 0, 224, 0.2)', borderColor: 'rgba(142, 45, 226, 1)', pointBackgroundColor: 'rgba(142, 45, 226, 1)', pointBorderColor: '#fff', pointHoverBackgroundColor: '#fff', pointHoverBorderColor: 'rgba(142, 45, 226, 1)' }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { r: { angleLines: { color: 'rgba(128,128,128,0.3)' }, grid: { color: 'rgba(128,128,128,0.3)' }, pointLabels: { font: { size: 13 }, color: getComputedStyle(document.body).getPropertyValue('--text-color') }, ticks: { backdropColor: 'transparent', stepSize: 2, min: 0, max: 10 } } }, plugins: { legend: { display: false } } }
    });
    // Porter
    const porterCtx = document.getElementById('porterChart').getContext('2d');
    new Chart(porterCtx, {
        type: 'bar',
        data: {
            labels: ['Buyer Power', 'Rivalry', 'New Entrants', 'Substitutes', 'Supplier Power'],
            datasets: [{ label: 'Threat Level', data: [9, 9, 8, 7, 6], backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(153, 102, 255, 0.6)'], borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)'], borderWidth: 1 }]
        },
        options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, max: 10, grid: { color: 'rgba(128,128,128,0.2)' } }, y: { grid: { color: 'rgba(128,128,128,0.1)' } } }, plugins: { legend: { display: false }, tooltip: { displayColors: false } } }
    });
});