"use strict";


/* =========================================
   WEBSITE READY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initMobileMenu();

        initSmoothScroll();

        initHeader();

        initYear();

        initBackToTop();

        initContactForm();

        initCardsAnimation();

        console.log(
            "Website Bantuan Kewangan berjaya dimuatkan."
        );

    }
);


/* =========================================
   MOBILE MENU
========================================= */

function initMobileMenu() {

    const button =
        document.getElementById(
            "menuButton"
        );

    const navigation =
        document.getElementById(
            "navigation"
        );


    if (!button || !navigation) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            navigation.classList.toggle(
                "open"
            );


            const open =
                navigation.classList.contains(
                    "open"
                );


            button.setAttribute(
                "aria-expanded",
                open
                    ? "true"
                    : "false"
            );

        }
    );


    const links =
        navigation.querySelectorAll(
            "a"
        );


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    navigation.classList.remove(
                        "open"
                    );


                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}


/* =========================================
   SMOOTH SCROLL
========================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const id =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );

}


/* =========================================
   HEADER SCROLL
========================================= */

function initHeader() {

    const header =
        document.getElementById(
            "header"
        );


    if (!header) {
        return;
    }


    function updateHeader() {

        if (
            window.scrollY > 40
        ) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader
    );


    updateHeader();

}


/* =========================================
   YEAR
========================================= */

function initYear() {

    const year =
        document.getElementById(
            "year"
        );


    if (!year) {
        return;
    }


    year.textContent =
        new Date().getFullYear();

}


/* =========================================
   BACK TO TOP
========================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) {
        return;
    }


    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 400
            ) {

                button.classList.add(
                    "visible"
                );

            } else {

                button.classList.remove(
                    "visible"
                );

            }

        }
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

}


/* =========================================
   CONTACT FORM
========================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                );


            const email =
                document.getElementById(
                    "email"
                );


            const message =
                document.getElementById(
                    "message"
                );


            const formMessage =
                document.getElementById(
                    "formMessage"
                );


            const button =
                form.querySelector(
                    'button[type="submit"]'
                );


            const nameValue =
                name.value.trim();


            const emailValue =
                email.value.trim();


            const messageValue =
                message.value.trim();


            /* VALIDASI NAMA */

            if (
                nameValue.length < 3
            ) {

                showMessage(
                    formMessage,
                    "Sila masukkan nama yang sah.",
                    "error"
                );

                name.focus();

                return;
            }


            /* VALIDASI EMAIL */

            if (
                !isValidEmail(
                    emailValue
                )
            ) {

                showMessage(
                    formMessage,
                    "Sila masukkan e-mel yang sah.",
                    "error"
                );

                email.focus();

                return;
            }


            /* VALIDASI MESEJ */

            if (
                messageValue.length < 10
            ) {

                showMessage(
                    formMessage,
                    "Sila tulis mesej sekurang-kurangnya 10 aksara.",
                    "error"
                );

                message.focus();

                return;
            }


            /* LOADING */

            if (button) {

                button.disabled = true;

                button.textContent =
                    "Menghantar...";

            }


            /* DEMO */

            setTimeout(
                function () {

                    showMessage(
                        formMessage,
                        "Terima kasih " +
                        nameValue +
                        ". Pertanyaan anda telah diterima. Ini masih borang demo.",
                        "success"
                    );


                    form.reset();


                    if (button) {

                        button.disabled =
                            false;

                        button.textContent =
                            "Hantar Pertanyaan";

                    }

                },
                1200
            );

        }
    );

}


/* =========================================
   EMAIL VALIDATION
========================================= */

function isValidEmail(
    email
) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return pattern.test(
        email
    );

}


/* =========================================
   FORM MESSAGE
========================================= */

function showMessage(
    element,
    message,
    type
) {

    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.classList.remove(
        "success",
        "error"
    );


    element.classList.add(
        type
    );


    setTimeout(
        function () {

            element.classList.remove(
                type
            );

        },
        6000
    );

}


/* =========================================
   CARD ANIMATION
========================================= */

function initCardsAnimation() {

    const elements =
        document.querySelectorAll(
            ".card, .step, .requirement, .hero-card"
        );


    if (
        !elements.length
    ) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        return;
    }


    const observer =
        new IntersectionObserver(
            function (
                entries,
                observerInstance
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";


                            observerInstance.unobserve(
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

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity .6s ease, transform .6s ease";


            observer.observe(
                element
            );

        }
    );

}


/* =========================================
   ESCAPE = CLOSE MOBILE MENU
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        const navigation =
            document.getElementById(
                "navigation"
            );


        const button =
            document.getElementById(
                "menuButton"
            );


        if (navigation) {

            navigation.classList.remove(
                "open"
            );

        }


        if (button) {

            button.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);
