// Smooth Scroll Animation  -------------------------------------------------------------------------

const renderSmoothScroll = () => {

    // Quadratic ease-in-out animation values (acceleration until halfway, then deceleration) - src: http://www.gizma.com/easing/#quad3
    // t = current time / b = start value / c = chang in value / d = animation duration
    const easeInOutQuad = (t, b, c, d) => {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

    const SCROLL_ANIMATION_DUR = 500;
    const scrollLinks = document.querySelectorAll(`[target="_self"]`);

    scrollLinks.forEach( (link) => {
        link.addEventListener('click', (e) => {
            // stops the clicked link from changing the window position
            e.preventDefault();

            // get the position of the element that the clicked link is targeting
            const targetPosition = document.getElementById(e.currentTarget.getAttribute('href').slice(1)).offsetTop;

            // get the animation start values
            const startPosition = window.pageYOffset;
            const distance = (targetPosition - startPosition);
            const duration = SCROLL_ANIMATION_DUR;
            let startTime = null;
            // creat the (recursive) animation function
            function smoothScrollAnimation(currentTime) {
                if ( startTime === null )
                    startTime = currentTime;
                const progress = currentTime - startTime;
                window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
                if ( progress < duration )
                    window.requestAnimationFrame(smoothScrollAnimation);
            }

            // lunching the animation
            window.requestAnimationFrame(smoothScrollAnimation);
        } );
    } );
}

//
const renderNavBarEffects = () => {
    const OFFSET = 80; // px
    const nav = document.querySelector("nav");
    const navList = nav.querySelector('ul');
    const navMobile = nav.querySelector('.nav-mobile');
    const navMobileIcon = nav.querySelector('.nav-mobile span');
    
    // navbar links indicates page location
    const pageSections = Array.from( nav.querySelectorAll("ul a") );
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        pageSections.forEach( (section) => {
            const currentSection = document.getElementById(section.getAttribute("href").replace('#',''));
            const currentSectionHeight = ~~(currentSection.getBoundingClientRect().height);
            const breakPoint = ~~(currentSection.offsetTop) - OFFSET;
            if ( (scrollPosition > breakPoint) && (scrollPosition <= breakPoint + currentSectionHeight) ) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        } );
    } );

    // mobile nav 
    navMobile.onclick = () => {
        navList.classList.toggle('open');
        navMobileIcon.classList.toggle('active');
    }
}



// ------------------------------------------------------------------------------------------------
// --- main ---------------------------------------------------------------------------------------

( () => {
    
    renderNavBarEffects();
    renderSmoothScroll();

})();
