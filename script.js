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

    // ==========================================================================
    // 6. Interactive Tour Player (Aegis & Aesthetic with Premium Neural Audio)
    // ==========================================================================
    const playerContainer = document.querySelector(".tour-player-container");
    const playBtn = document.getElementById("playerPlayBtn");
    const prevBtn = document.getElementById("playerPrevBtn");
    const nextBtn = document.getElementById("playerNextBtn");
    const volumeBtn = document.getElementById("playerVolumeBtn");
    const expandBtn = document.getElementById("playerExpandBtn");
    const progressBar = document.getElementById("playerProgressBar");
    const progressContainer = document.getElementById("playerProgressContainer");
    const currentTimeEl = document.getElementById("playerCurrentTime");
    const totalTimeEl = document.getElementById("playerTotalTime");
    const subtitlesContent = document.getElementById("subtitles-content");
    const scenes = document.querySelectorAll(".tour-scene");

    if (playerContainer && playBtn) {
        const subtitles = [
            "デザインの美しさと、強固な安全性を両立する。次世代Web制作イージス・アンド・エステティック。",
            "多くのWeb制作で放置されがちな脆弱性リスク。しかし、従来の検査手法では莫大なコストと時間がかかります。",
            "この課題を解決するのが、AIエージェント「Antigravity 2.0」による超高速実装。仕様書からコードを自律生成し、開発期間を大幅に短縮します。",
            "さらに、GitHub無償枠をフル活用した4層の自動防御網を装備。追加費用ゼロで恒常的な脆弱性診断を実現します。",
            "確かな性能は、実測データが証明します。Lighthouse最高クラスの表示速度と、すべてのセキュリティ自動診断の合格を実証済み。",
            "現在、実績公開にご協力いただける先着2社様限定の特別モニター枠を募集中です。安全で高速なWebサイトを、特別価格で構築しましょう。"
        ];

        // 6 scenes, loading pre-rendered neural Japanese voice MP3s
        const audioTracks = [];
        const sceneDurations = [5.6, 7.8, 10.0, 8.8, 8.5, 9.2]; // Accurate baseline estimations in seconds
        let cumulativeTimes = [0, 5.6, 13.4, 23.4, 32.2, 40.7, 49.9];
        let totalDuration = 49.9;
        
        let progress = 0; // Current progress in seconds
        let isPlaying = false;
        let playerInterval = null;
        let activeSceneIndex = 0;
        let isMuted = false;

        // Initialize Audio objects
        for (let i = 0; i < 6; i++) {
            const audio = new Audio(`assets/audio/scene_${i}.mp3`);
            audio.preload = "auto";
            audioTracks.push(audio);
            
            audio.addEventListener("loadedmetadata", () => {
                sceneDurations[i] = audio.duration;
                recalculateTimings();
            });
        }

        function recalculateTimings() {
            let current = 0;
            cumulativeTimes = [0];
            for (let i = 0; i < sceneDurations.length; i++) {
                current += sceneDurations[i];
                cumulativeTimes.push(current);
            }
            totalDuration = current;
            totalTimeEl.textContent = formatTime(totalDuration);
        }

        recalculateTimings(); // Initial run

        function formatTime(secs) {
            const m = Math.floor(secs / 60);
            const s = Math.floor(secs % 60);
            return `${m}:${s < 10 ? '0' : ''}${s}`;
        }

        function updateScene(index) {
            if (index < 0 || index >= scenes.length) return;
            activeSceneIndex = index;

            scenes.forEach((scene, idx) => {
                if (idx === index) {
                    scene.classList.add("active");
                } else {
                    scene.classList.remove("active");
                }
            });

            subtitlesContent.textContent = subtitles[index];
        }

        function updateUI() {
            // Update Progress Bar
            const ratio = progress / totalDuration;
            progressBar.style.width = `${ratio * 100}%`;

            // Update Time Display
            currentTimeEl.textContent = formatTime(progress);

            // Determine active scene based on progress
            let currentScene = 0;
            for (let i = 0; i < cumulativeTimes.length - 1; i++) {
                if (progress >= cumulativeTimes[i] && progress < cumulativeTimes[i + 1]) {
                    currentScene = i;
                    break;
                }
            }
            if (progress >= totalDuration) {
                currentScene = scenes.length - 1;
            }

            if (currentScene !== activeSceneIndex) {
                // Pause former audio
                const prevAudio = audioTracks[activeSceneIndex];
                if (prevAudio && isPlaying) {
                    prevAudio.pause();
                    prevAudio.currentTime = 0;
                }
                
                updateScene(currentScene);
                
                // Play new audio
                const nextAudio = audioTracks[currentScene];
                if (nextAudio && isPlaying) {
                    nextAudio.currentTime = 0;
                    nextAudio.volume = isMuted ? 0 : 1.0;
                    nextAudio.play().catch(e => console.log("Audio auto-play blocked/failed:", e));
                }
            }
        }

        // Setup audio ended listener for scene transitions
        audioTracks.forEach((audio, index) => {
            audio.addEventListener("ended", () => {
                if (isPlaying && activeSceneIndex === index) {
                    if (index < 5) {
                        const nextSceneIndex = index + 1;
                        progress = cumulativeTimes[nextSceneIndex];
                        updateScene(nextSceneIndex);
                        
                        const nextAudio = audioTracks[nextSceneIndex];
                        if (nextAudio) {
                            nextAudio.currentTime = 0;
                            nextAudio.volume = isMuted ? 0 : 1.0;
                            nextAudio.play().catch(e => console.log("Audio play failed/blocked:", e));
                        }
                    } else {
                        // Complete end of video
                        progress = totalDuration;
                        pause();
                        progress = 0;
                        updateUI();
                        // Reset all audio tracks to beginning
                        audioTracks.forEach(a => a.currentTime = 0);
                    }
                }
            });
        });

        function play() {
            isPlaying = true;
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            playerContainer.classList.add("playing");

            const activeAudio = audioTracks[activeSceneIndex];
            if (activeAudio) {
                activeAudio.volume = isMuted ? 0 : 1.0;
                activeAudio.play().catch(e => console.log("Audio play failed/blocked:", e));
            }

            playerInterval = setInterval(() => {
                const currentAudio = audioTracks[activeSceneIndex];
                if (currentAudio) {
                    progress = cumulativeTimes[activeSceneIndex] + currentAudio.currentTime;
                }
                updateUI();
            }, 50); // High frequency check for smooth animation syncing
        }

        function pause() {
            isPlaying = false;
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            playerContainer.classList.remove("playing");
            clearInterval(playerInterval);

            const activeAudio = audioTracks[activeSceneIndex];
            if (activeAudio) {
                activeAudio.pause();
            }
        }

        function togglePlay() {
            if (isPlaying) {
                pause();
            } else {
                play();
            }
        }

        // Play/Pause Event
        playBtn.addEventListener("click", togglePlay);

        // Previous Scene Event
        prevBtn.addEventListener("click", () => {
            const wasPlaying = isPlaying;
            pause();
            
            let targetScene = activeSceneIndex;
            const currentAudio = audioTracks[activeSceneIndex];
            const currentAudioTime = currentAudio ? currentAudio.currentTime : 0;
            
            if (currentAudioTime < 1.5 && activeSceneIndex > 0) {
                targetScene = activeSceneIndex - 1;
            }
            
            activeSceneIndex = targetScene;
            progress = cumulativeTimes[activeSceneIndex];
            
            audioTracks.forEach(a => a.currentTime = 0);
            
            updateUI();
            if (wasPlaying) play();
        });

        // Next Scene Event
        nextBtn.addEventListener("click", () => {
            const wasPlaying = isPlaying;
            pause();
            
            if (activeSceneIndex < scenes.length - 1) {
                activeSceneIndex++;
                progress = cumulativeTimes[activeSceneIndex];
                audioTracks.forEach(a => a.currentTime = 0);
            } else {
                progress = totalDuration;
            }
            
            updateUI();
            if (wasPlaying) play();
        });

        // Volume Button (Mute Toggle)
        volumeBtn.addEventListener("click", () => {
            isMuted = !isMuted;
            if (isMuted) {
                volumeBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
                volumeBtn.setAttribute("aria-label", "消音中（音は出ません）");
            } else {
                volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
                volumeBtn.setAttribute("aria-label", "音量ミュート");
            }
            
            audioTracks.forEach(audio => {
                audio.volume = isMuted ? 0 : 1.0;
            });
        });

        // Fullscreen/Expand Toggle
        expandBtn.addEventListener("click", () => {
            const isExpanded = playerContainer.classList.toggle("expanded");
            if (isExpanded) {
                expandBtn.innerHTML = '<i class="fa-solid fa-minimize"></i>';
                document.body.style.overflow = "hidden";
            } else {
                expandBtn.innerHTML = '<i class="fa-solid fa-maximize"></i>';
                document.body.style.overflow = "";
            }
        });

        // Timeline Scrubbing Event
        progressContainer.addEventListener("click", (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const ratio = Math.max(0, Math.min(1, clickX / rect.width));
            
            const wasPlaying = isPlaying;
            pause();
            
            progress = ratio * totalDuration;
            
            let targetScene = 0;
            for (let i = 0; i < cumulativeTimes.length - 1; i++) {
                if (progress >= cumulativeTimes[i] && progress < cumulativeTimes[i + 1]) {
                    targetScene = i;
                    break;
                }
            }
            
            activeSceneIndex = targetScene;
            const offset = progress - cumulativeTimes[activeSceneIndex];
            
            const activeAudio = audioTracks[activeSceneIndex];
            if (activeAudio) {
                activeAudio.currentTime = Math.max(0, Math.min(activeAudio.duration || 0, offset));
            }
            
            audioTracks.forEach((a, idx) => {
                if (idx !== activeSceneIndex) {
                    a.currentTime = 0;
                }
            });
            
            updateUI();
            if (wasPlaying) play();
        });
    }
});

