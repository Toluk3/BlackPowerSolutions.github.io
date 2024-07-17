document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.presentation-container-1, .presentation-container, .containergen3');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 500); // delay each subsequent element by 500ms
                observer.unobserve(entry.target); // Dejar de observar después de la animación
            }
        });
    }, {
        threshold: 0.1 // 10% visible
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});

