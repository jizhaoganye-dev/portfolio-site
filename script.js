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
        ".strength-card, .faq-item, .contact-card, .pain-points-list, .profile-card, " +
        ".benefit-card, .price-card, .partner-card"
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
            const isOpen = navToggle.classList.toggle("open");
            navMenu.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("open");
            navMenu.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });

    // ==========================================================================
    // 3. FAQ Accordion (Smooth Height Calculation Transition & ARIA Toggles)
    // ==========================================================================
    const faqQuestions = document.querySelectorAll(".faq-question");
    
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const faqItem = question.parentElement;
            const faqAnswer = question.nextElementSibling;
            
            // Toggle active state for other open items (accordion behavior)
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== faqItem && item.classList.contains("faq-open")) {
                    item.classList.remove("faq-open");
                    item.querySelector(".faq-answer").style.maxHeight = "0px";
                    item.querySelector(".faq-question").setAttribute("aria-expanded", "false");
                }
            });
            
            const isNowOpen = faqItem.classList.toggle("faq-open");
            question.setAttribute("aria-expanded", isNowOpen ? "true" : "false");
            
            if (isNowOpen) {
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
        
        lastScanDateEl.textContent = `${yyyy}-${mm}-${dd}`;
    }

    // ==========================================================================
    // 4.5. Case Study Drawer Toggles (Smooth Transition)
    // ==========================================================================
    const caseStudyBtns = document.querySelectorAll(".btn-case-study");

    caseStudyBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const drawer = document.getElementById(targetId);
            if (!drawer) return;

            const isOpen = drawer.classList.contains("open");
            
            // Close other drawers if open
            document.querySelectorAll(".case-study-drawer").forEach(d => {
                if (d !== drawer && d.classList.contains("open")) {
                    d.classList.remove("open");
                    d.style.maxHeight = "0px";
                    const associatedBtn = document.querySelector(`[data-target="${d.id}"]`);
                    if (associatedBtn) {
                        associatedBtn.setAttribute("aria-expanded", "false");
                    }
                }
            });

            if (isOpen) {
                drawer.classList.remove("open");
                drawer.style.maxHeight = "0px";
                btn.setAttribute("aria-expanded", "false");
            } else {
                drawer.classList.add("open");
                const contentHeight = drawer.querySelector(".case-study-content").scrollHeight;
                drawer.style.maxHeight = `${contentHeight + 48}px`; // padding buffer
                btn.setAttribute("aria-expanded", "true");
            }
        });
    });

    // ==========================================================================
    // 5. Formspree Submission & DevSecOps Validation Simulation
    // ==========================================================================
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> セキュア送信準備中...';
            
            // 1. Client-side DevSecOps Scan simulation (checking XSS / Script Injections)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fa-solid fa-shield-halved"></i> 送信チェック完了...';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane fa-bounce"></i> 送信中...';
                    
                    const actionUrl = contactForm.getAttribute("action");
                    const isPlaceholder = actionUrl.includes("placeholder_id");
                    
                    const handleSuccess = () => {
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                        
                        formFeedback.className = "form-feedback success";
                        formFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> お問い合わせありがとうございます。ご入力いただいた内容を安全に送信しました。確認後、折り返しご連絡いたします。';
                        
                        // Scroll feedback into view
                        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                        setTimeout(() => {
                            formFeedback.innerHTML = "";
                            formFeedback.className = "form-feedback";
                        }, 8000);
                    };

                    const handleFailure = (msg) => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                        
                        formFeedback.className = "form-feedback error";
                        formFeedback.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> 送信に失敗しました: ${msg || "サーバーエラーが発生しました。"}`;
                        
                        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    };

                    if (isPlaceholder) {
                        // Demo mode: simulate success after a delay
                        setTimeout(() => {
                            handleSuccess();
                        }, 1000);
                    } else {
                        // Real submit via fetch
                        fetch(actionUrl, {
                            method: "POST",
                            body: new FormData(contactForm),
                            headers: {
                                'Accept': 'application/json'
                            }
                        })
                        .then(response => {
                            if (response.ok) {
                                handleSuccess();
                            } else {
                                response.json().then(data => {
                                    handleFailure(data.error || "Formspreeでの送信エラー");
                                });
                            }
                        })
                        .catch(error => {
                            handleFailure(error.message);
                        });
                    }
                    
                }, 1000);
            }, 1200);
        });
    }
});
