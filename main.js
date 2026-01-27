// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navList = document.querySelector('.nav-list');

if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileNavToggle.classList.toggle('active');
    });
}

// Nav background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Reveal animations on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal-on-scroll');
    observer.observe(section);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });

    // Modal Logic
    const modal = document.getElementById('leadModal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const resourceNameSpan = document.getElementById('resource-name');
    const leadForm = document.getElementById('leadForm');

    let currentResource = '';

    if (openModalBtns && modal) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentResource = btn.getAttribute('data-resource');
                if (resourceNameSpan) resourceNameSpan.textContent = currentResource;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scroll
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Lead Form Submission
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const email = document.getElementById('email').value;

            console.log(`Lead Captured: ${firstName} - ${email}`);

            // Test Mode: Trigger direct download if it's the ATS Guide
            if (currentResource === 'ATS Guide') {
                console.log('Initiating ATS Guide Download...');
                const link = document.createElement('a');
                link.href = '/ATS_Guide_2026.pdf';
                link.download = 'ATS_Guide_2026.pdf';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();

                // Small delay to ensure the browser registers the click before removal/redirect
                setTimeout(() => {
                    document.body.removeChild(link);
                    window.location.href = '/thank-you';
                }, 1500);
            } else {
                // For other resources, just redirect (or add more logic later)
                window.location.href = '/thank-you';
            }
        });
    }
});
