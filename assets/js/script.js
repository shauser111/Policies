document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // --- Video Scroll-to-Play and Manual Controls ---
    const videoSections = document.querySelectorAll('.video-section');
    videoSections.forEach((section, index) => {
        const video = section.querySelector('video');
        const playPauseBtn = section.querySelector('.play-pause-btn');
        if (!video || !playPauseBtn) return; 

        const playIcon = playPauseBtn.querySelector('.play-icon');
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');
        let manuallyPaused = false;
        
        if (!playIcon || !pauseIcon) return; 

        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => !manuallyPaused && video.play().catch(e => console.log(`Video ${index + 1} play error:`, e)),
            onLeave: () => video.pause(),
            onEnterBack: () => !manuallyPaused && video.play().catch(e => console.log(`Video ${index + 1} play error:`, e)),
            onLeaveBack: () => video.pause(),
        });

        video.addEventListener('play', () => {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        });

        video.addEventListener('pause', () => {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        });

        playPauseBtn.addEventListener('click', () => {
            manuallyPaused = video.paused; 
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });

    // --- ✅ REBUILT Top Image Carousel with SMOOTH SCROLL ---
    const carouselSection = document.querySelector('.carousel-section');
    if (carouselSection) {
        const scroller = carouselSection.querySelector('.carousel-slides');
        const indicator = carouselSection.querySelector('.carousel-progress .progress-indicator');
        const track = carouselSection.querySelector('.carousel-progress .progress-track');

        if (scroller && indicator && track) {
            let isDragging = false;

            const scrollImagesFromIndicator = (clientX) => {
                const trackRect = track.getBoundingClientRect();
                let percent = (clientX - trackRect.left) / trackRect.width;
                percent = Math.max(0, Math.min(1, percent));
                const scrollableWidth = scroller.scrollWidth - scroller.clientWidth;
                scroller.scrollLeft = percent * scrollableWidth;
            };

            track.addEventListener('mousedown', (e) => {
                isDragging = true;
                track.classList.add('dragging');
                scroller.style.scrollSnapType = 'none'; // Disable snap while dragging
                scrollImagesFromIndicator(e.clientX);
            });

            window.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    scrollImagesFromIndicator(e.clientX);
                }
            });

            window.addEventListener('mouseup', () => {
                isDragging = false;
                track.classList.remove('dragging');
                scroller.style.scrollSnapType = 'x mandatory'; // Re-enable snap on release
            });

            const updateIndicatorOnScroll = () => {
                const scrollableWidth = scroller.scrollWidth - scroller.clientWidth;
                if (scrollableWidth <= 0) {
                    indicator.style.left = `0%`;
                    indicator.style.width = `100%`;
                    return;
                };

                const indicatorWidth = (scroller.clientWidth / scroller.scrollWidth) * 100;
                indicator.style.width = `${indicatorWidth}%`;
                
                const scrollPercent = (scroller.scrollLeft / scrollableWidth) * 100;
                
                const moveableArea = 100 - indicatorWidth;
                const indicatorLeft = (scrollPercent / 100) * moveableArea;
                indicator.style.left = `${indicatorLeft}%`;
            };
            
            scroller.addEventListener('scroll', updateIndicatorOnScroll);

            const initScroller = () => setTimeout(updateIndicatorOnScroll, 100);
            window.addEventListener('resize', initScroller);
            initScroller();
        }
    }

    // --- Features Scroller with Smooth Drag-to-Scrub Progress Bar ---
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
        const scroller = featuresSection.querySelector('.features-scroller');
        const indicator = featuresSection.querySelector('.features-progress .progress-indicator');
        const track = featuresSection.querySelector('.features-progress .progress-track');

        if (scroller && indicator && track) {
            let isDragging = false;

            const scrollImagesFromIndicator = (clientX) => {
                const trackRect = track.getBoundingClientRect();
                let percent = (clientX - trackRect.left) / trackRect.width;
                percent = Math.max(0, Math.min(1, percent));
                const scrollableWidth = scroller.scrollWidth - scroller.clientWidth;
                scroller.scrollLeft = percent * scrollableWidth;
            };

            track.addEventListener('mousedown', (e) => {
                isDragging = true;
                track.classList.add('dragging');
                scrollImagesFromIndicator(e.clientX);
            });

            window.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    scrollImagesFromIndicator(e.clientX);
                }
            });

    window.addEventListener('mouseup', () => {
                isDragging = false;
                track.classList.remove('dragging');
                scroller.style.scrollSnapType = 'x mandatory'; // Re-enable snap on release
            });

            const updateIndicatorOnScroll = () => {


                const scrollableWidth = scroller.scrollWidth - scroller.clientWidth;
                 if (scrollableWidth <= 0) {
                    indicator.style.left = `0%`;
                    indicator.style.width = `100%`;
                    return;
                };

                const indicatorWidth = (scroller.clientWidth / scroller.scrollWidth) * 100;
                indicator.style.width = `${indicatorWidth}%`;

                const scrollPercent = (scroller.scrollLeft / scrollableWidth) * 100;
                const moveableArea = 100 - indicatorWidth;
                const indicatorLeft = (scrollPercent / 100) * moveableArea;
                indicator.style.left = `${indicatorLeft}%`;
            };

            scroller.addEventListener('scroll', updateIndicatorOnScroll);

            const initScroller = () => setTimeout(updateIndicatorOnScroll, 100);
            window.addEventListener('resize', initScroller);
            initScroller();
        }
    }

// --- ✅ GSAP Push-in Image Effect ---
    const zoomImageContainer = document.querySelector(".image-zoom-container");
    if (zoomImageContainer) {
        const image = zoomImageContainer.querySelector("img");

        gsap.to(image, {
            scale: 1.15, // Zoom in by 15%
            ease: "none",
            scrollTrigger: {
                trigger: zoomImageContainer, // The animation starts when this element enters the screen
                start: "top 80%", // Start when the top of the container is 80% down the viewport
                end: "bottom top", // End when the bottom of the container leaves the top of the viewport
                scrub: 1, // Smoothly links animation progress to scroll progress (1-second lag)
            },
        });
    }

    // ===============================================
    // --- ✅ NEW: GSAP 'LUCHA' ANIMATIONS ---
    // ===============================================

    // 1. Animate Text Reveals (Word by Word)
    document.querySelectorAll('[data-anim="text-reveal"]').forEach(el => {
        // Split text into words
        const words = el.textContent.split(' ').filter(word => word.length > 0);
        el.innerHTML = ''; // Clear original text
        let wordSpans = [];
    words.forEach(word => {
    const wordSpan = document.createElement('span');

    // --- FIX 1: For the animation to move up ---
    wordSpan.style.display = 'inline-block'; 

    // --- FIX 2: For the spaces between words ---
wordSpan.textContent = word + '\u00A0';

    el.appendChild(wordSpan);
    wordSpans.push(wordSpan);
});

        // Create ScrollTrigger animation
        gsap.from(wordSpans, {
            autoAlpha: 0, // Fades in
            y: 30, // Moves up
            rotateX: -90, // Flips in
            stagger: 0.25, // Stagger each word
            // This is the elegant timing fix
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Start animation when element is 85% from the top
                toggleActions: "play none none none" // Play once on enter
            }
        });
    });

    // 2. Animate Blurbs (Fly-in)
    document.querySelectorAll('[data-anim="fly-in-up"]').forEach(el => {
        gsap.from(el, {
            autoAlpha: 0,
            y: 50,
            // This is the elegant timing fix
            duration: 3,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });


}); // This should be the very last line of your file, closing the DOMContentLoaded event listener