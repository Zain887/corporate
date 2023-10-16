function toggleAccordion(accordionId, imgRotateId) {
    var accordionContent = document.getElementById(accordionId);
    var imgWrapper = document.getElementById(imgRotateId);
    var allImageWrappers = document.querySelectorAll('.img-wrapper');
    for (var i = 0; i < allImageWrappers.length; i++) {
        allImageWrappers[i].style.transform = 'rotate(0deg)';
        allImageWrappers[i].style.transitionDuration = '0.3s'
    }
    var accordions = document.querySelectorAll('.accordian-content');
    for (var i = 0; i < accordions.length; i++) {
        if (accordions[i].id !== accordionId) {
            accordions[i].style.display = 'none';
        }
    }
    if (window.getComputedStyle(accordionContent).display === 'none') {
        accordionContent.style.display = 'block';
        imgWrapper.style.transform = 'rotate(180deg)';
    } else {
        accordionContent.style.display = 'none';
        imgWrapper.style.transform = 'rotate(0deg)';
    }
}

var sectionControllers = document.querySelectorAll('.section-controller');

function activateController(controller) {
    sectionControllers.forEach(function (c) {
        c.classList.remove('active');
        var imgWrapper2 = c.querySelector('.img-wrapper2');
        if (imgWrapper2) {
            imgWrapper2.classList.remove('active');
        }
    });

    controller.classList.add('active');
    var imgWrapper2 = controller.querySelector('.img-wrapper2');
    if (imgWrapper2) {
        imgWrapper2.classList.add('active');
    }
}

function scrollToContentTop(targetSection) {
    // Calculate the target scroll position with an offset of -240 pixels
    const headerHeight = 240;
    const targetScrollPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

    // Scroll to the target position
    window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth'
    });
}

// Add 'active' class to the first element by default
if (sectionControllers.length > 0) {
    activateController(sectionControllers[0]);
}

sectionControllers.forEach(function (controller) {
    controller.addEventListener('click', function () {
        activateController(controller);

        // Get the corresponding content section by its ID
        const targetId = controller.getAttribute('data-content');
        const targetSection = document.getElementById(targetId);

        // Check if the target section exists and scroll to its top with the -240 pixel offset
        if (targetSection) {
            scrollToContentTop(targetSection);
        }
    });
});



var leftSide = document.querySelector('.left-side');
var isFixed = false;
var content3 = document.getElementById('content3');
var lastScrollY = window.scrollY;

window.addEventListener('scroll', function () {
    var scrollY = this.scrollY;
    var rect = content3.getBoundingClientRect();
    var content3Position = rect.top;

    // Handle the fixed/absolute behavior for content3
    if (scrollY >= 1290 && scrollY < 3045) {
        if (!isFixed) {
            leftSide.classList.add('fixed');
            leftSide.classList.remove('absoluteAfterFixed'); // Revert to fixed
            isFixed = true;
        }
    } else if (content3Position <= -204) {
        leftSide.classList.remove('fixed');
        leftSide.classList.add('absoluteAfterFixed');
        isFixed = false;
    } else {
        leftSide.classList.remove('fixed', 'absoluteAfterFixed');
        isFixed = false;
    }

    // Handle the section controller behavior
    var sectionControllers = document.querySelectorAll('.section-controller');
    sectionControllers.forEach(function (sectionController) {
        var id = sectionController.getAttribute('data-content');
        var contentElement = document.getElementById(id);
        var rect = contentElement.getBoundingClientRect();
        var scrollTopValue = rect.top;

        if (scrollTopValue <= 120) {
            document.querySelectorAll('.section-controller.active').forEach(function (el) {
                el.classList.remove('active');
            });
            sectionController.classList.add('active');
        }
    });

    // Update the lastScrollY value
    lastScrollY = scrollY;
});








