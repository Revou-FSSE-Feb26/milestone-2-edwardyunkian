"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('header');
    const extraPadding = 20; // 20px
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href')?.substring(1);
            if (!targetId)
                return;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerHeight = header?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = (elementPosition + window.pageYOffset) - headerHeight - extraPadding;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
//# sourceMappingURL=index.js.map