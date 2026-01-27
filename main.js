// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
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
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
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

    document.querySelectorAll('section, .reveal').forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
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
    });

    // Modal Logic
    const modal = document.getElementById('leadModal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const resourceNameSpan = document.getElementById('resource-name');
    const leadForm = document.getElementById('leadForm');

    let currentResource = '';

    if (openModalBtns && modal) {
        console.log('Modal system initialized');
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('Open modal clicked for:', btn.getAttribute('data-resource'));
                currentResource = btn.getAttribute('data-resource');
                if (resourceNameSpan) resourceNameSpan.textContent = currentResource;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
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

            if (currentResource === 'ATS Guide') {
                console.log('Initiating ATS Guide Download...');
                const link = document.createElement('a');
                link.href = '/ATS_Guide_2026.pdf';
                link.download = 'ATS_Guide_2026.pdf';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();

                setTimeout(() => {
                    document.body.removeChild(link);
                    window.location.href = '/thank-you';
                }, 1500);
            } else if (currentResource === 'Clarity Workbook') {
                console.log('Initiating Career Clarity Workbook Download...');
                const link = document.createElement('a');
                link.href = '/Career_Clarity_Workbook.html';
                link.download = 'Career_Clarity_Workbook.html';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();

                setTimeout(() => {
                    document.body.removeChild(link);
                    window.location.href = '/thank-you';
                }, 1500);
            } else if (currentResource === 'Interview Deck') {
                console.log('Initiating Interview Prep Deck Download...');
                const link = document.createElement('a');
                link.href = '/Interview_Prep_Deck.html';
                link.download = 'Interview_Prep_Deck.html';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();

                setTimeout(() => {
                    document.body.removeChild(link);
                    window.location.href = '/thank-you';
                }, 1500);
            } else {
                window.location.href = '/thank-you';
            }
        });
    }

    // Stripe Checkout for Resume Audit
    const stripeButton = document.getElementById('resume-audit-checkout');
    if (stripeButton) {
        stripeButton.addEventListener('click', () => {
            console.log('Initiating Stripe Checkout for Resume Audit...');

            // NOTE: You must replace 'pk_test_...' with your actual Publishable Key from Stripe
            const stripe = Stripe('pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY');
            const priceId = 'price_1Su9gdENnK9pfvcMZd7URRw2';

            stripe.redirectToCheckout({
                lineItems: [{ price: priceId, quantity: 1 }],
                mode: 'payment',
                successUrl: window.location.origin + '/thank-you',
                cancelUrl: window.location.origin + '/coaching',
            }).then((result) => {
                if (result.error) {
                    alert(result.error.message);
                }
            });
        });
    }
});
