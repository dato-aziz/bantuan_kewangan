/* =========================================
   BANTUAN KEWANGAN
   DATO ABDUL AZIZ
   JAVASCRIPT
========================================= */

"use strict";


/* =========================================
   DOM READY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initMobileMenu();

        initSmoothScroll();

        initYear();

        initHeaderScroll();

        initBackToTop();

        initContactForm();

        initScrollAnimation();

        console.log(
            "Website Bantuan Kewangan berjaya dimuatkan."
        );

    }
);


/* =========================================
   1. MOBILE MENU
========================================= */

function initMobileMenu() {

    const menuButton =
        document.getElementById(
            "menuButton"
        );

    const navigation =
        document.getElementById(
            "navigation"
        );


    if (
        !menuButton ||
        !navigation
    ) {
        return;
    }


    menuButton.addEventListener(
        "click",
        function () {

            navigation.classList.toggle(
                "open"
            );


            const isOpen =
                navigation.classList.contains(
                    "open"
                );


            menuButton.setAttribute(
                "aria-expanded",
                isOpen
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


                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}


/* =========================================
   2. SMOOTH SCROLL
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

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


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
   3. YEAR
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
   4. HEADER SCROLL
========================================= */

function initHeaderScroll() {

    const header =
        document.querySelector(
            ".header"
        );


    if (!header) {
        return;
    }


    function checkScroll() {

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
        checkScroll
    );


    checkScroll();

}


/* =========================================
   5. BACK TO TOP
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
   6. CONTACT FORM
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


            const phone =
                document.getElementById(
                    "phone"
                );


            const message =
                document.getElementById(
                    "message"
                );


            const formMessage =
                document.getElementById(
                    "formMessage"
                );


            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            /* =============================
               GET VALUE
            ============================= */

            const nameValue =
                name.value.trim();


            const emailValue =
                email.value.trim();


            const phoneValue =
                phone.value.trim();


            const messageValue =
                message.value.trim();


            /* =============================
               VALIDASI NAMA
            ============================= */

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


            /* =============================
               VALIDASI EMAIL
            ============================= */

            if (
                !validateEmail(
                    emailValue
                )
            ) {

                showMessage(
                    formMessage,
                    "Sila masukkan alamat e-mel yang sah.",
                    "error"
                );

                email.focus();

                return;
            }


            /* =============================
               VALIDASI TELEFON
            ============================= */

            if (
                phoneValue !== "" &&
                phoneValue.length < 8
            ) {

                showMessage(
                    formMessage,
                    "Sila masukkan nombor telefon yang sah.",
                    "error"
                );

                phone.focus();

                return;
            }


            /* =============================
               VALIDASI MESEJ
            ============================= */

            if (
                messageValue.length < 10
            ) {

                showMessage(
                    formMessage,
                    "Mesej terlalu pendek. Sila tulis sekurang-kurangnya 10 aksara.",
                    "error"
                );

                message.focus();

                return;
            }


            /* =============================
               BUTTON LOADING
            ============================= */

            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Menghantar...";

            }


            /* =============================
               DEMO SUBMISSION
            ============================= */

            setTimeout(
                function () {

                    showMessage(
                        formMessage,
                        "Terima kasih " +
                        nameValue +
                        ". Pertanyaan anda telah diterima. Ini masih merupakan borang demo.",
                        "success"
                    );


                    form.reset();


                    if (
                        submitButton
                    ) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Hantar Pertanyaan";

                    }

                },
                1200
            );

        }
    );

}


/* =========================================
   7. VALIDATE EMAIL
========================================= */

function validateEmail(
    email
) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return pattern.test(
        email
    );

}


/* =========================================
   8. FORM MESSAGE
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
   9. SCROLL ANIMATION
========================================= */

function initScrollAnimation() {

    const elements =
        document.querySelectorAll(
            ".card, .step, .requirement, .hero-card"
        );


    if (
        !elements.length
    ) {
        return;
    }


    /* Browser tidak support observer */

    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            function (element) {

                element.classList.add(
                    "show"
                );

            }
        );

        return;
    }


    elements.forEach(
        function (element) {

            element.classList.add(
                "hidden"
            );

        }
    );


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


                            entry.target.classList.remove(
                                "hidden"
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

            observer.observe(
                element
            );

        }
    );

}


/* =========================================
   10. KEYBOARD ESCAPE
   TUTUP MENU MOBILE
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


        const menuButton =
            document.getElementById(
                "menuButton"
            );


        if (
            navigation
        ) {

            navigation.classList.remove(
                "open"
            );

        }


        if (
            menuButton
        ) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);
