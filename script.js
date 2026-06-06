/**
 * Aegis & Aesthetic - Premium Interaction & UX Logic
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. Scroll-driven Animations (Intersection Observer)
    // ==========================================================================
    const revealTargets = document.querySelectorAll(
        ".problem-card, .table-wrapper, .workflow-step, .security-card, " +
        ".dashboard-widget, .tech-box, .feature-item, .portfolio-card, " +
        ".strength-card, .faq-item, .contact-card"
    );
    
    // Add base reveal class programmatically to keep HTML clean
    revealTargets.forEach(el => el.classList.add("reveal"));
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Unobserve after activation to optimize rendering performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });
    
    revealTargets.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // 2. Navigation Header Effects & Responsive Menu
    // ==========================================================================
    const header = document.querySelector(".header");
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link, .nav-btn");
    
    // Dynamic blur & background opacity on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = "rgba(9, 9, 11, 0.85)";
            header.style.padding = "10px 0";
            header.style.height = "70px";
        } else {
            header.style.backgroundColor = "rgba(9, 9, 11, 0.7)";
            header.style.padding = "0";
            header.style.height = "80px";
        }
        
        // Active link highlight based on scroll position
        let currentSectionId = "";
        const sections = document.querySelectorAll("section");
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 120;
            if (window.scrollY >= secTop) {
                currentSectionId = sec.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("open");
            navMenu.classList.toggle("open");
        });
    }
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("open");
            navMenu.classList.remove("open");
        });
    });

    // ==========================================================================
    // 3. FAQ Accordion (Smooth Height Calculation Transition)
    // ==========================================================================
    const faqQuestions = document.querySelectorAll(".faq-question");
    
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const faqItem = question.parentElement;
            const faqAnswer = question.nextElementSibling;
            
            // Toggle active state for other open items (accordion behavior)
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== faqItem && item.classList.contains("active")) {
                    item.classList.remove("active");
                    item.querySelector(".faq-answer").style.maxHeight = "0px";
                }
            });
            
            faqItem.classList.toggle("active");
            
            if (faqItem.classList.contains("active")) {
                // Calculate content height and apply to max-height for smooth transition
                faqAnswer.style.maxHeight = `${faqAnswer.scrollHeight}px`;
            } else {
                faqAnswer.style.maxHeight = "0px";
            }
        });
    });

    // ==========================================================================
    // 4. Security Dashboard Dynamic Date Updater
    // ==========================================================================
    const lastScanDateEl = document.getElementById("lastScanDate");
    if (lastScanDateEl) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0
        let dd = today.getDate();
        
        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;
        
        // Output format: YYYY-MM-DD (matches the current simulation time)
        lastScanDateEl.textContent = `${yyyy}-${mm}-${dd}`;
    }

    // ==========================================================================
    // 5. Elegant Form Validation & Simulated DevSecOps Pipeline Feedback
    // ==========================================================================
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Change button to scanning state
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> セキュア送信準備中...';
            
            // Simulate automated client form input scan for security injection (XSS/SQLi defense simulation)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fa-solid fa-shield-halved"></i> 送信チェック完了...';
                
                setTimeout(() => {
                    // Reset form and show success message
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    
                    formFeedback.className = "form-feedback success";
                    formFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> お問い合わせ内容を安全に送信しました。無料オンライン相談をご希望の場合は、上記カレンダーリンクからも直接日程をご予約いただけます。';
                    
                    // Clear success message after 10 seconds
                    setTimeout(() => {
                        formFeedback.innerHTML = "";
                    }, 10000);
                    
                }, 1500);
            }, 1500);
        });
    }
});
