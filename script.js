"use strict";

/* =====================================
   WEBSITE INITIALIZATION
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    initMobileMenu();
    initHeader();
    initYear();
    initBackToTop();
    initScrollAnimation();
    initSmoothScroll();
    initExternalLinks();

});


/* =====================================
   MOBILE MENU
===================================== */

function initMobileMenu() {

    const menuButton =
        document.getElementById("menuButton");

    const navigation =
        document.getElementById("navigation");


    if (!menuButton || !navigation) {
        return;
    }


    menuButton.addEventListener("click", function () {

        navigation.classList.toggle("open");

        const isOpen =
            navigation.classList.contains("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    const links =
        navigation.querySelectorAll("a");


    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navigation.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =====================================
   HEADER SCROLL EFFECT
===================================== */

function initHeader() {

    const header =
        document.getElementById("header");


    if (!header) {
        return;
    }


    function updateHeader() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();

}


/* =====================================
   CURRENT YEAR
===================================== */

function initYear() {

    const year =
        document.getElementById("year");


    if (!year) {
        return;
    }


    year.textContent =
        new Date().getFullYear();

}


/* =====================================
   BACK TO TOP
===================================== */

function initBackToTop() {

    const button =
        document.getElementById("backToTop");


    if (!button) {
        return;
    }


    function updateButton() {

        if (window.scrollY > 400) {

            button.classList.add("visible");

        } else {

            button.classList.remove("visible");

        }

    }


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    button.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateButton();

}


/* =====================================
   SCROLL ANIMATION
===================================== */

function initScrollAnimation() {

    const elements =
        document.querySelectorAll(
            ".card, .step, .requirement, .hero-card, .contact-item"
        );


    if (!elements.length) {
        return;
    }


    /*
        Jika browser tidak mendukung
        IntersectionObserver, tampilkan
        semua elemen seperti biasa.
    */

    if (!("IntersectionObserver" in window)) {

        elements.forEach(function (element) {

            element.classList.add("show");

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            function (
                entries,
                observerObject
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            observerObject.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    elements.forEach(
        function (element) {

            element.classList.add(
                "animate"
            );


            observer.observe(
                element
            );

        }
    );

}


/* =====================================
   SMOOTH SCROLL
===================================== */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const header =
                    document.getElementById(
                        "header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top
                    +
                    window.scrollY
                    -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =====================================
   EXTERNAL LINKS
===================================== */

function initExternalLinks() {

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(function (link) {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });

}


/* =====================================
   ESCAPE KEY
===================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        const navigation =
            document.getElementById(
                "navigation"
            );


        const menuButton =
            document.getElementById(
                "menuButton"
            );


        if (navigation) {

            navigation.classList.remove(
                "open"
            );

        }


        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =====================================
   WINDOW RESIZE
===================================== */

window.addEventListener(
    "resize",
    function () {

        const navigation =
            document.getElementById(
                "navigation"
            );

        const menuButton =
            document.getElementById(
                "menuButton"
            );


        /*
            Jika layar kembali besar,
            tutup menu mobile.
        */

        if (
            window.innerWidth > 720 &&
            navigation
        ) {

            navigation.classList.remove(
                "open"
            );

        }


        if (
            window.innerWidth > 720 &&
            menuButton
        ) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =====================================
   PREVENT DOUBLE CLICK
===================================== */

document.addEventListener(
    "dblclick",
    function (event) {

        if (
            event.target.closest(
                ".btn, .register-btn"
            )
        ) {

            event.preventDefault();

        }

    }
);
