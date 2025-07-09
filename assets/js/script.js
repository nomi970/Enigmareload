{
  $(document).ready(function () {
    $("#nav-toggler").on("click", function () {
      $(this).toggleClass("fa-times");
      $(".nav-items").toggleClass("show");
    });
    $(window).on("scroll load", function () {
      if ($(window).scrollTop() > 0) {
        $(".main-nav").addClass("bgchange");
      } else {
        $(".main-nav").removeClass("bgchange");
      }
    });
  });
}
{
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault(); // Prevent default only if it's a scroll link
        targetElement.scrollIntoView({ behavior: "smooth" });
      }

      // Manage active class
      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

{
  var swiper = new Swiper(".mySwiper2", {
    speed: 1000,
    slidesPerView: 4,
    spaceBetween: 48,
    loop: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3.2,
        spaceBetween: 48,
      },
    },
    on: {
      reachEnd: function () {
        swiper.autoplay.stop();
        setTimeout(() => {
          swiper.slideTo(0);
          swiper.autoplay.start();
        }, 3000);
      }
    }
  });

}
{

  const heroSwiper = new Swiper('.heroSwiper', {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // Optional fade effect (if you want a smooth fade instead of slide)
    effect: 'fade',
    fadeEffect: { crossFade: true },
  });


}

$(document).ready(function () {
  const phoneInput = document.querySelector("#phone");

  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "us",
    nationalMode: false,
    autoPlaceholder: "polite",
    placeholderNumberType: "MOBILE",
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
  });

  const selectedFlag = phoneInput.closest(".iti").querySelector(".iti__selected-flag");

  function updateCountryDisplay() {
    const countryData = iti.getSelectedCountryData();
    const shortCode = countryData.iso2.toUpperCase();

    selectedFlag.innerHTML = `
      <span>${shortCode}</span>
      <div class="iti-arrow"></div>
    `;

    // ✅ REMOVE THIS (it's invalid!)
    // const placeholder = iti.getNumberPlaceholder();
    // phoneInput.setAttribute("placeholder", placeholder);
  }

  updateCountryDisplay();
  phoneInput.addEventListener("countrychange", updateCountryDisplay);

  $.validator.addMethod("validPhone", function (value, element) {
    return iti.isValidNumber();
  }, "Please enter a valid phone number");

  $(".contact_us_form").validate({
    rules: {
      name: { required: true, minlength: 2 },
      l_name: { required: true, minlength: 2 },
      email: { required: true, email: true },
      phone: { required: true, validPhone: true },
      message: { required: true, minlength: 10 },
      // checkbox: { required: true },
    },
    messages: {
      name: { required: "Please enter your first name" },
      l_name: { required: "Please enter your last name" },
      email: { required: "Please enter your email address" },
      phone: { required: "Please enter your phone number" },
      message: { required: "Please enter your message" },
      // checkbox: { required: "Please accept our terms" },
    },
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.addClass("error-message");
      if (element.attr("name") == "checkbox") {
        error.insertAfter(element.closest(".d-flex"));
      } else {
        error.insertAfter(element);
      }
    },
    highlight: function (element) {
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function (element) {
      $(element).removeClass("is-invalid").addClass("is-valid");
    },
    submitHandler: function (form) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your form has been submitted successfully!",
        showConfirmButton: false,
        timer: 4000,
      }).then(function () {
        form.submit();
      });
    },
  });
});

{
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      contents.forEach(content => {
        content.classList.remove("active");
      });

      const target = tab.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");
    });
  });
}

// Function to animate the counter
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(progress * target);

    if (suffix === 'M+') {
      el.textContent = current + 'M+';
    } else {
      el.textContent = suffix === '%' ? `${current}%` : `${current.toLocaleString()}${suffix}`;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function startCountersOnScroll() {
  const counters = document.querySelectorAll('.counter');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        animateCounter(el, target, suffix);
        el.classList.add('counted');
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', startCountersOnScroll);

