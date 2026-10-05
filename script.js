/* =====================================================
   ROSHDY MOTORS
   JAVASCRIPT
===================================================== */


/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 900);

});


/* =====================================================
   HEADER
===================================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("open");

});


document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   CAR FILTER
===================================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const carCards = document.querySelectorAll(".car-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        carCards.forEach(card => {

            const type = card.dataset.type;

            if (
                filter === "all" ||
                type === filter
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* =====================================================
   SEARCH
===================================================== */

const searchInput = document.getElementById("searchInput");
const brandSelect = document.getElementById("brandSelect");
const typeSelect = document.getElementById("typeSelect");
const searchBtn = document.getElementById("searchBtn");


function performSearch() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const brandValue =
        brandSelect.value;

    const typeValue =
        typeSelect.value;


    carCards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const brand =
            card.dataset.brand;

        const type =
            card.dataset.type;


        const matchesSearch =
            !searchValue ||
            name.includes(searchValue);

        const matchesBrand =
            brandValue === "all" ||
            brand === brandValue;

        const matchesType =
            typeValue === "all" ||
            type === typeValue;


        if (
            matchesSearch &&
            matchesBrand &&
            matchesType
        ) {

            card.classList.remove("hidden");

        } else {

            card.classList.add("hidden");

        }

    });


    document
        .getElementById("cars")
        .scrollIntoView({
            behavior: "smooth"
        });

}


searchBtn.addEventListener(
    "click",
    performSearch
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            performSearch();

        }

    }
);


/* =====================================================
   FAVORITES
===================================================== */

document
    .querySelectorAll(".favorite-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("active");

            if (button.classList.contains("active")) {

                button.textContent = "♥";

                showToast("Added to favorites.");

            } else {

                button.textContent = "♡";

            }

        });

    });


/* =====================================================
   QUICK VIEW
===================================================== */

const modal =
    document.getElementById("quickViewModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalClose =
    document.getElementById("modalClose");

const modalOverlay =
    document.querySelector(".modal-overlay");


document
    .querySelectorAll(".quick-view")
    .forEach(button => {

        button.addEventListener("click", () => {

            const carName =
                button.dataset.car;

            modalTitle.textContent =
                carName;

            modal.classList.add("show");

            document.body.classList.add("modal-open");

        });

    });


function closeModal() {

    modal.classList.remove("show");

    document.body.classList.remove("modal-open");

}


modalClose.addEventListener(
    "click",
    closeModal
);

modalOverlay.addEventListener(
    "click",
    closeModal
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeModal();

        }

    }
);


/* =====================================================
   BOOKING FORM
===================================================== */

const bookingForm =
    document.getElementById("bookingForm");


bookingForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const car =
            document.getElementById("carSelect").value;


        if (!name || !phone || !car) {

            showToast(
                "Please complete the required fields."
            );

            return;

        }


        showToast(
            "Appointment request submitted."
        );


        bookingForm.reset();

    }
);


/* =====================================================
   BOOK FROM MODAL
===================================================== */

document
    .querySelector(".modal-book")
    .addEventListener("click", () => {

        closeModal();

        setTimeout(() => {

            document
                .getElementById("booking")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 150);

    });


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters =
    document.querySelectorAll("[data-count]");


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter =
                    entry.target;

                const target =
                    Number(counter.dataset.count);

                let current = 0;

                const increment =
                    Math.max(
                        1,
                        Math.ceil(target / 60)
                    );


                const updateCounter = () => {

                    current += increment;

                    if (current >= target) {

                        counter.textContent =
                            target;

                        return;

                    }

                    counter.textContent =
                        current;

                    requestAnimationFrame(
                        updateCounter
                    );

                };


                updateCounter();

                counterObserver.unobserve(counter);

            });

        },
        {
            threshold: 0.6
        }
    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".car-card, .service-card, .brand-item, .about-content, .about-image"
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

                revealObserver.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   TOAST
===================================================== */

const toast =
    document.getElementById("toast");

let toastTimer;


function showToast(message) {

    toast.querySelector("p").textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =====================================================
   BACK TO TOP
===================================================== */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 700) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =====================================================
   BOOK CAR
===================================================== */

document
    .querySelectorAll(".quick-view")
    .forEach(button => {

        button.addEventListener("dblclick", () => {

            const carName =
                button.dataset.car;

            const carSelect =
                document.getElementById("carSelect");


            for (
                let i = 0;
                i < carSelect.options.length;
                i++
            ) {

                if (
                    carSelect.options[i].text ===
                    carName
                ) {

                    carSelect.selectedIndex = i;

                    break;

                }

            }

        });

    });