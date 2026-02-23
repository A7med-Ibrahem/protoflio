// Profile Photo Fallback
function handleImageError(img) {
    console.log('Profile image failed to load, using fallback');
    // Fallback will be handled by onerror attribute in HTML
}

// ===== 1. إصلاح زر Back to Top Button =====
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== 2. تفعيل أشرطة المهارات (Skills Bars) =====
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل أشرطة المهارات عند ظهور القسم
    const skillsSection = document.getElementById('skills');
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // تخزين القيم الأصلية من data-level
    skillLevels.forEach(level => {
        const levelValue = level.getAttribute('data-level');
        if (levelValue) {
            level.dataset.targetWidth = levelValue + '%';
        }
    });
    
    // مراقب ظهور قسم المهارات
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // تشغيل أنيميشن الأشرطة
                skillLevels.forEach((level, index) => {
                    if (level.dataset.targetWidth) {
                        // إضافة تأخير تدريجي لكل مهارة
                        setTimeout(() => {
                            // تعديل الـ pseudo-element عن طريق CSS variable
                            level.style.setProperty('--target-width', level.dataset.targetWidth);
                            level.classList.add('animate');
                            
                            // تطبيق العرض مباشرة كحل بديل
                            const style = document.createElement('style');
                            style.textContent = `
                                .skill-level[data-level="${level.getAttribute('data-level')}"]::before {
                                    width: ${level.dataset.targetWidth} !important;
                                }
                            `;
                            document.head.appendChild(style);
                        }, index * 100); // تأخير 100ms بين كل مهارة
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3, rootMargin: '0px' });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // بديل: لو المهارات ظاهرة من البداية
    setTimeout(() => {
        if (isElementInViewport(skillsSection)) {
            skillLevels.forEach((level, index) => {
                setTimeout(() => {
                    if (level.dataset.targetWidth) {
                        const style = document.createElement('style');
                        style.textContent = `
                            .skill-level[data-level="${level.getAttribute('data-level')}"]::before {
                                width: ${level.dataset.targetWidth} !important;
                            }
                        `;
                        document.head.appendChild(style);
                    }
                }, index * 100);
            });
        }
    }, 500);
});

// دالة مساعدة لفحص إذا كان العنصر ظاهر في الشاشة
function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Update current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // You can replace this with your own form submission logic
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            contactForm.reset();
            
            // Show success notification
            showNotification('Thank you! Your message has been sent successfully.', 'success');
        } catch (error) {
            console.error('Error:', error);
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Try Again';
            showNotification('Failed to send message. Please try again.', 'error');
        }
        
        // Reset button after 5 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 5000);
    });
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    `;
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Add fade-in animations to sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Image Lightbox
const profileImg = document.getElementById('profileImg');
const lightbox = document.getElementById('imageLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.close-lightbox');

if (profileImg && lightbox && lightboxImg && closeBtn) {
    profileImg.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = profileImg.src;
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}