// ================================
// MOBILE NAVBAR
// ================================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");

    if (nav.classList.contains("open")) {
      menuBtn.innerHTML = "✕";
    } else {
      menuBtn.innerHTML = "☰";
    }
  });

  // Close menu after clicking a link
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.innerHTML = "☰";
    });
  });
}


// ================================
// SCROLL REVEAL ANIMATION
// ================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});


// ================================
// ACTIVE NAV LINK
// ================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

  let currentSection = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") === "#" + currentSection
    ) {
      link.classList.add("active");
    }

  });

});


// ================================
// MESSAGE MODAL
// ================================

const messageBtn =
  document.querySelector(".floating-message");

const modal =
  document.querySelector(".modal");

const modalClose =
  document.querySelector(".modal-close");


if (messageBtn && modal) {

  messageBtn.addEventListener("click", () => {

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

  });

}


if (modalClose && modal) {

  modalClose.addEventListener("click", () => {

    modal.classList.remove("show");

    document.body.style.overflow = "";

  });

}


// Close modal by clicking outside

if (modal) {

  modal.addEventListener("click", (event) => {

    if (event.target === modal) {

      modal.classList.remove("show");

      document.body.style.overflow = "";

    }

  });

}


// Close modal with ESC

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape" && modal) {

    modal.classList.remove("show");

    document.body.style.overflow = "";

  }

});


// ================================
// CONTACT FORM
// ================================

const contactForm =
  document.querySelector("#contactForm");

const formSuccess =
  document.querySelector(".form-success");


if (contactForm) {

  contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
      document.querySelector("#name")?.value.trim();

    const email =
      document.querySelector("#email")?.value.trim();

    const phone =
      document.querySelector("#phone")?.value.trim();

    const destination =
      document.querySelector("#destination")?.value;

    const message =
      document.querySelector("#message")?.value.trim();


    // Basic validation

    if (!name || !email || !phone || !destination) {

      if (formSuccess) {

        formSuccess.textContent =
          "Please fill all required fields.";

        formSuccess.style.color = "#e31b23";

      }

      return;

    }


    // Success message

    if (formSuccess) {

      formSuccess.textContent =
        "Thank you! Your travel inquiry has been received.";

      formSuccess.style.color = "#159447";

    }


    // Reset form

    contactForm.reset();

  });

}


// ================================
// PACKAGE BUTTONS
// ================================

const packageButtons =
  document.querySelectorAll(".outline-btn");


packageButtons.forEach(button => {

  button.addEventListener("click", () => {

    const card =
      button.closest(".package-card");

    const packageName =
      card?.querySelector("h3")?.textContent ||
      "Travel Package";


    // Open contact section

    const contactSection =
      document.querySelector("#contact");

    if (contactSection) {

      contactSection.scrollIntoView({
        behavior: "smooth"
      });

    }


    // Select destination if dropdown exists

    const destinationSelect =
      document.querySelector("#destination");

    if (
      destinationSelect &&
      [...destinationSelect.options]
        .some(option =>
          option.text
            .toLowerCase()
            .includes(packageName.toLowerCase())
        )
    ) {

      const option =
        [...destinationSelect.options]
          .find(option =>
            option.text
              .toLowerCase()
              .includes(packageName.toLowerCase())
          );

      destinationSelect.value =
        option.value;

    }

  });

});


// ================================
// TRAVEL CARD MOUSE EFFECT
// ================================

const passportCard =
  document.querySelector(".passport-card");


if (passportCard && window.innerWidth > 900) {

  passportCard.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        passportCard.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;


      const rotateX =
        ((y / rect.height) - 0.5) * -8;

      const rotateY =
        ((x / rect.width) - 0.5) * 8;


      passportCard.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-5px)`;

    }
  );


  passportCard.addEventListener(
    "mouseleave",
    () => {

      passportCard.style.transform =
        "rotate(4deg)";

    }
  );

}


// ================================
// DESTINATION CARD TILT
// ================================

const destinationCards =
  document.querySelectorAll(".destination-card");


if (window.innerWidth > 900) {

  destinationCards.forEach(card => {

    card.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;


        const rotateY =
          ((x / rect.width) - 0.5) * 4;

        const rotateX =
          ((y / rect.height) - 0.5) * -4;


        card.style.transform =
          `perspective(700px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          "perspective(700px) rotateX(0) rotateY(0)";

      }
    );

  });

}


// ================================
// YEAR IN FOOTER
// ================================

const year =
  document.querySelector("#year");

if (year) {

  year.textContent =
    new Date().getFullYear();

}


// ================================
// SMOOTH SCROLL
// ================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", function (event) {

    const targetId =
      this.getAttribute("href");

    const target =
      document.querySelector(targetId);

    if (target) {

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


// ================================
// TRAVEL DESTINATION MESSAGE
// ================================

const destinationCards2 =
  document.querySelectorAll(".destination-card");


destinationCards2.forEach(card => {

  card.addEventListener("click", () => {

    const title =
      card.querySelector("h3")?.textContent;

    const destinationInput =
      document.querySelector("#destination");

    if (
      destinationInput &&
      title
    ) {

      const options =
        [...destinationInput.options];

      const matchingOption =
        options.find(option =>
          option.text
            .toLowerCase()
            .includes(title.toLowerCase())
        );

      if (matchingOption) {

        destinationInput.value =
          matchingOption.value;

      }

    }

  });

});


// ================================
// PAGE LOADED ANIMATION
// ================================

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

});


// ================================
// CONSOLE MESSAGE
// ================================

console.log(
  "Umme Abiha Travel & Tours website loaded successfully ✈️"
);