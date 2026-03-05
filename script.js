// script.js - MUSCLE FLEX (MK Fitness) Interactivity

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initial Page Load Animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 1.5 Hero Image Slider Logic
    const slides = document.querySelectorAll('.hero-slide');
    const nextBtn = document.getElementById('sliderNext');
    const prevBtn = document.getElementById('sliderPrev');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const goToSlide = (index) => {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].style.zIndex = '0';
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            slides[currentSlide].style.zIndex = '1';
        };

        const nextSlide = () => goToSlide(currentSlide + 1);
        const prevSlide = () => goToSlide(currentSlide - 1);

        const startSlide = () => {
            slideInterval = setInterval(nextSlide, 2000); // 2-second auto-slide
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            // Pause for a moment after manual click, then restart
            setTimeout(startSlide, 3000);
        };

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });

            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }

        startSlide();
    }

    // 2. Scroll Navbar Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2.5 Active Navigation Link Logic
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(link => {
        // Skip the 'Join Now' button so it keeps its distinct styling
        if (link.classList.contains('btn')) return;

        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            // Ensure no other link has active state
            link.classList.remove('active');
        }
    });

    // 3. Mobile Navigation Scroll
    const navContainer = document.querySelector('.nav-scroll-container');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');

    if (navContainer && scrollLeftBtn && scrollRightBtn) {
        // Scroll amount per click
        const scrollAmount = 150;

        scrollLeftBtn.addEventListener('click', () => {
            navContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            navContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // Optional: Hide arrows if scroll isn't needed or at the ends
        const handleScrollBtns = () => {
            // Using a small buffer for precision
            const maxScrollLeft = navContainer.scrollWidth - navContainer.clientWidth;
            scrollLeftBtn.style.opacity = navContainer.scrollLeft > 0 ? "1" : "0.3";
            scrollRightBtn.style.opacity = navContainer.scrollLeft >= maxScrollLeft - 1 ? "0.3" : "1";
        };

        navContainer.addEventListener('scroll', handleScrollBtns);
        window.addEventListener('resize', handleScrollBtns);
        // Initial check
        setTimeout(handleScrollBtns, 100);
    }

    // 4. Scroll triggered fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach((section) => {
        observer.observe(section);
    });

    // 5. BMI Calculator Logic (Home Page)
    const bmiForm = document.getElementById('bmi-form');
    if (bmiForm) {
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const heightCm = parseFloat(document.getElementById('bmi-height').value);
            const weightKg = parseFloat(document.getElementById('bmi-weight').value);
            const resultBox = document.getElementById('bmi-result');

            if (heightCm > 0 && weightKg > 0) {
                const heightM = heightCm / 100;
                const bmi = (weightKg / (heightM * heightM)).toFixed(1);

                let category = '';
                let tip = '';

                if (bmi < 18.5) {
                    category = 'Underweight';
                    tip = 'Focus on caloric surplus and strength training.';
                } else if (bmi >= 18.5 && bmi <= 24.9) {
                    category = 'Normal';
                    tip = 'Maintain your balanced routine and healthy diet.';
                } else if (bmi >= 25 && bmi <= 29.9) {
                    category = 'Overweight';
                    tip = 'Incorporate daily cardio and a slight caloric deficit.';
                } else {
                    category = 'Obese';
                    tip = 'Consult with our trainers for a guided transformation plan.';
                }

                resultBox.innerHTML = `
                    <div style="background: rgba(211, 84, 0,0.1); border-left: 4px solid var(--accent-purple); padding: 15px; border-radius: 4px; margin-top: 15px;">
                        <span style="font-size: 24px; font-weight: 800; color: var(--text-white); display: block;">${bmi}</span>
                        <strong style="color: var(--accent-purple);">${category}</strong>
                        <p style="margin: 5px 0 0; font-size: 14px;">${tip}</p>
                    </div>
                `;
            }
        });
    }

    // 6. Contact Form Validation (Contact Page)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const phone = document.getElementById('contactPhone').value;
            const interest = document.getElementById('contactInterest').value;
            const message = document.getElementById('contactMessage').value;

            // Construct WhatsApp Message
            let waText = `Hi MK Fitness! I'm ${name}.\n\n`;
            waText += `*Phone:* ${phone}\n`;
            if (email) waText += `*Email:* ${email}\n`;
            waText += `*Interested In:* ${interest}\n\n`;
            waText += `*Message:*\n${message}`;

            const encodedText = encodeURIComponent(waText);
            const waCurrentOwnerNumber = "917980581070";
            const waUrl = `https://wa.me/${waCurrentOwnerNumber}?text=${encodedText}`;

            // Open WhatsApp in new tab
            window.open(waUrl, '_blank');

            // Reset Form and show success locally
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'REDIRECTING...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                contactForm.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 40px; background: rgba(211,84,0,0.1); border: 1px solid var(--accent-orange); border-radius: 4px;">
                        <i class="fas fa-check-circle" style="font-size: 48px; color: var(--accent-orange); margin-bottom: 20px;"></i>
                        <h3 class="text-white">WAITING FOR WHATSAPP</h3>
                        <p>If the chat didn't open automatically, <a href="${waUrl}" target="_blank" class="text-orange" style="text-decoration: underline;">click here</a>.</p>
                    </div>
                `;
            }, 1000);
        });
    }

    // 7. Lightbox for Gallery Images (Mobile & Desktop)
    const galleryContainer = document.querySelector('.gallery-grid') || document.querySelector('[style*="grid-template-columns: repeat(auto-fill"]');
    if (galleryContainer) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.95); z-index: 2000; display: none; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; flex-direction: column;';

        const lbImage = document.createElement('img');
        lbImage.style.cssText = 'max-width: 90vw; max-height: 80vh; border: 2px solid var(--accent-purple); box-shadow: 0 0 30px rgba(211, 84, 0,0.2); object-fit: contain;';

        const lbClose = document.createElement('div');
        lbClose.innerHTML = '<i class="fas fa-times"></i>';
        lbClose.style.cssText = 'position: absolute; top: 20px; right: 20px; font-size: 30px; color: white; cursor: pointer; padding: 10px; background: rgba(0,0,0,0.5); border-radius: 50%;';

        const controls = document.createElement('div');
        controls.style.cssText = 'display: flex; gap: 40px; margin-top: 20px;';
        controls.innerHTML = `
            <button id="lb-prev" style="background: none; border: none; color: white; font-size: 30px; cursor: pointer;"><i class="fas fa-chevron-left"></i></button>
            <button id="lb-next" style="background: none; border: none; color: white; font-size: 30px; cursor: pointer;"><i class="fas fa-chevron-right"></i></button>
        `;

        lightbox.appendChild(lbClose);
        lightbox.appendChild(lbImage);
        lightbox.appendChild(controls);
        document.body.appendChild(lightbox);

        const images = Array.from(galleryContainer.querySelectorAll('img'));
        let currentIndex = 0;

        // Open Lightbox
        images.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                currentIndex = index;
                lbImage.src = images[currentIndex].src;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                setTimeout(() => lightbox.style.opacity = '1', 10);
            });
        });

        const showImage = (index) => {
            if (index < 0) currentIndex = images.length - 1;
            else if (index >= images.length) currentIndex = 0;
            else currentIndex = index;

            lbImage.style.opacity = '0';
            setTimeout(() => {
                lbImage.src = images[currentIndex].src;
                lbImage.style.opacity = '1';
                lbImage.style.transition = 'opacity 0.2s';
            }, 200);
        };

        // Controls
        lightbox.querySelector('#lb-prev').addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
        lightbox.querySelector('#lb-next').addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });

        // Touch Swipe Support
        let touchstartX = 0;
        let touchendX = 0;
        lightbox.addEventListener('touchstart', e => { touchstartX = e.changedTouches[0].screenX; });
        lightbox.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            if (touchendX < touchstartX - 50) showImage(currentIndex + 1); // Swipe left
            if (touchendX > touchstartX + 50) showImage(currentIndex - 1); // Swipe right
        });

        // Close
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        };
        lbClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
});

