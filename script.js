document.addEventListener("DOMContentLoaded", function () {
  // ----------------------------------------
  // 1) DATA FOR TAB-CONTROLLED SLIDERS
  // ----------------------------------------
  const productsData = {
    gaming: [
      {
        title: "HP Pavilion Gaming Desktop TG01",
        price: "₹74,466",
        img: "https://image-cdn.ubuy.com/hp-pavilion-gaming-desktop-tg01-1120/220_220_100/6504f25219cfaf056f205e3f.jpg",
        rating: 4.5,
      },
      {
        title: "HP Gaming PC Ryzen 5",
        price: "₹92,954",
        img: "https://image-cdn.ubuy.com/hp-pavilion-gaming-desktop-intel-core/220_220_100/68a57f59a134198798055791.jpg",
        rating: 3.7,
      },
      {
        title: "HP Omen Gaming Desktop",
        price: "₹1,24,999",
        img: "https://image-cdn.ubuy.com/hp-omen-gaming-desktop/220_220_100/66f1a0f3a1b2c3d4e5f60708.jpg",
        rating: 4.2,
      },
    ],

    tower: [
      {
        title: "HP Tower Desktop i5",
        price: "₹85,219",
        img: "https://image-cdn.ubuy.com/hp-pavilion-i5/220_220_100/6685b11bb4d4e1569a395705.jpg",
        rating: 3.0,
      },
      {
        title: "HP Tower Desktop i3",
        price: "₹52,000",
        img: "https://image-cdn.ubuy.com/hp-pavilion-desktop-tower-intel-core/220_220_100/688a50df04877828660ced79.jpg",
        rating: 4.2,
      },
      {
        title: "HP Slim Tower Desktop",
        price: "₹61,500",
        img: "https://image-cdn.ubuy.com/hp-slim-tower-desktop/220_220_100/67a1b2c3d4e5f60718293a4b.jpg",
        rating: 4.0,
      },
    ],

    allinone: [
      {
        title: "HP All-in-One Slim Desktop",
        price: "₹60,000",
        img: "https://image-cdn.ubuy.com/hp-eliteone-p5v05ut-aba-23-inch/220_220_100/69ba484fe429e0989608c816.jpg",
        rating: 4.0,
      },
      {
        title: "HP All-in-One 24 Desktop",
        price: "₹72,000",
        img: "https://image-cdn.ubuy.com/hp-all-in-one-24/220_220_100/66b7c8d9e0f1122334455667.jpg",
        rating: 4.3,
      },
    ],
  };

  // ----------------------------------------
  // 2) HELPER: CREATE STAR STRING
  // ----------------------------------------
  function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    let stars = "";
    for (let i = 0; i < fullStars; i++) {
      stars += "⭐";
    }
    if (hasHalfStar) {
      stars += "⭐";
    }
    return stars;
  }

  // ----------------------------------------
  // 3) RENDER PRODUCTS INSIDE ONE SLIDER
  // ----------------------------------------
  function renderProducts(category, wrapper, productSwiper, viewMoreBtn, tabLabel) {
    wrapper.innerHTML = "";

    const products = productsData[category] || [];

    if (products.length === 0) {
      wrapper.innerHTML = `<div class="swiper-slide"><p class="p-3 mb-0">No products found</p></div>`;
      productSwiper.update();
      return;
    }

    const fragment = document.createDocumentFragment();

    products.forEach((item) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      slide.innerHTML = `
        <div class="product-card">
          <img src="${item.img}" alt="${item.title}" class="img-fluid" />
          <div class="product-card-child" >
          <h4 class="product-title">${item.title}</h4>
          <div class="rating">
            ${generateStars(item.rating)}
            <span>(${item.rating})</span>
          </div>
          <p class="price mb-0">${item.price}</p>
          </div>
        </div>
      `;

      fragment.appendChild(slide);
    });

    wrapper.appendChild(fragment);

    productSwiper.update();
    productSwiper.slideTo(0);

    if (viewMoreBtn && tabLabel) {
      viewMoreBtn.textContent = `View More ${tabLabel}`;
    }
  }

  // ----------------------------------------
  // 4) INITIALIZE ALL TAB-CONTROLLED SLIDERS
  // ----------------------------------------
  function initAllTabSliders() {
    document.querySelectorAll(".Tab-slider").forEach((sliderEl) => {
      const catEl = sliderEl.querySelector(".categorySwiper");
      const prodEl = sliderEl.querySelector(".productSwiper");
      const wrapper = sliderEl.querySelector(".productWrapper");
      const viewMoreBtn = sliderEl.querySelector(".view-more-btn");

      if (!catEl || !prodEl || !wrapper) return;

      // Product swiper for this one section only
      const prodSwiper = new Swiper(prodEl, {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: false,
        breakpoints: {
          0: { slidesPerView: 1.2, spaceBetween: 12 },
          576: { slidesPerView: 2, spaceBetween: 14 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1200: { slidesPerView: 4, spaceBetween: 20 },
        },
      });

      // Category swiper for this one section only
      new Swiper(catEl, {
        slidesPerView: "auto",
        spaceBetween: 12,
        freeMode: true,
      });

      const tabs = catEl.querySelectorAll(".swiper-slide");

      tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          if (tab.classList.contains("active")) return;

          tabs.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");

          const category = tab.dataset.category;
          const tabLabel = tab.textContent.trim();

          renderProducts(category, wrapper, prodSwiper, viewMoreBtn, tabLabel);
        });
      });

      const defaultTab = catEl.querySelector(".swiper-slide.active") || tabs[0];

      if (defaultTab) {
        renderProducts(
          defaultTab.dataset.category,
          wrapper,
          prodSwiper,
          viewMoreBtn,
          defaultTab.textContent.trim()
        );
      }
    });
  }

  // ----------------------------------------
  // 5) INITIALIZE ALL SIMPLE SWIPER CAROUSELS
  // ----------------------------------------
  function initSimpleSwipers() {
    document.querySelectorAll(".brand-product-slider .swiper").forEach((swiperEl) => {
      new Swiper(swiperEl, {
        loop: true,
        spaceBetween: 16,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          576: {
            slidesPerView: 3,
            spaceBetween: 14,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
      });
    });
  }

  // ----------------------------------------
  // 6) READ MORE TOGGLE
  //    (This page has repeated IDs in HTML,
  //     so we safely use only the first match.)
  // ----------------------------------------
  function initReadMore() {
    const readText = document.getElementById("readText");
    const readToggle = document.getElementById("readToggle");

    if (!readText || !readToggle) return;

    let expanded = false;

    readToggle.addEventListener("click", function () {
      expanded = !expanded;

      if (expanded) {
        readText.style.webkitLineClamp = "unset";
        readText.style.display = "block";
        readToggle.textContent = "Read less";
      } else {
        // You can control this in CSS too, but this keeps it working in JS.
        readText.style.display = "-webkit-box";
        readText.style.webkitBoxOrient = "vertical";
        readText.style.webkitLineClamp = "3";
        readToggle.textContent = "Read more";
      }
    });
  }





function initExploreSlider() {
  const swiperEl = document.querySelector(".explore-swiper");

  if (!swiperEl) return;

  new Swiper(swiperEl, {
    spaceBetween: 16,
    loop: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    breakpoints: {
      // Mobile
      0: {
        slidesPerView: 1.2,
      },

      // Tablet
      576: {
        slidesPerView: 2,
      },

      // Desktop
      992: {
        slidesPerView: 4,
        loop: false,       
        autoplay: false,   
      },
    },
  });
}function initExploreSlider() {
  const swiperEl = document.querySelector(".explore-swiper");

  if (!swiperEl) return;

  new Swiper(swiperEl, {
    spaceBetween: 16,
    loop: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    breakpoints: {
      // Mobile
      0: {
        slidesPerView: 1.2,
      },

      // Tablet
      576: {
        slidesPerView: 2,
      },

      // Desktop
      992: {
        slidesPerView: 4,
        loop: false,       
        autoplay: false,   
      },
    },
  });
}function initExploreSlider() {
  const swiperEl = document.querySelector(".explore-swiper");

  if (!swiperEl) return;

  new Swiper(swiperEl, {
    spaceBetween: 16,
    loop: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    breakpoints: {
      // Mobile
      0: {
        slidesPerView: 2,
      },

      // Tablet
      576: {
        slidesPerView: 2,
      },

      // Desktop
      992: {
        slidesPerView: 4,
        loop: false,       
        autoplay: false,
      },
    },
  });
}
  // ----------------------------------------
  // 7) RUN EVERYTHING
  // ----------------------------------------
  initAllTabSliders();
  initSimpleSwipers();
  initReadMore();


  initExploreSlider();
});



// const swiper = new Swiper(".productSwiper", {
//   loop: true,
//   spaceBetween: 16,

//   autoplay: {
//     delay: 2500,
//     disableOnInteraction: false,
//   },

//  breakpoints: {
//     // 480px and up
//     320: {
//       slidesPerView: 2,
//       spaceBetween: 12,
//     },
//     // 576px and up
//     576: {
//       slidesPerView: 3,
//       spaceBetween: 14,
//     },
//     // 768px and up
//     768: {
//       slidesPerView: 4,
//       spaceBetween: 16,
//     },
//     // 1024px and up
//     1024: {
//       slidesPerView: 4,
//       spaceBetween: 20,
//     },
//     // 1280px and up
//     1280: {
//       slidesPerView: 4,
//       spaceBetween: 24,
//     },
//   },

// });




document.addEventListener("DOMContentLoaded", () => {
  const exploreMenu = document.querySelector(".explore-menu");
  const middleColumn = document.querySelector(".explore-middle");
  const rightColumn = document.querySelector(".explore-right");
  
  const leftItems = document.querySelectorAll(".explore-left .dropdown-item");
  const middleItems = document.querySelectorAll(".explore-middle .dropdown-item");
  
  const middlePanels = document.querySelectorAll(".submenu-panel");
  const rightPanels = document.querySelectorAll(".subsubmenu-panel");

  // Reset the menu so it collapses back to 1 column
  function resetMenu() {
    middleColumn.classList.remove("show-col");
    rightColumn.classList.remove("show-col");
    leftItems.forEach(i => i.classList.remove("active"));
    middleItems.forEach(i => i.classList.remove("active"));
  }

  // Optional: Reset menu when mouse leaves the entire dropdown area
  if (exploreMenu) {
    exploreMenu.addEventListener("mouseleave", resetMenu);
  }

  // Listen to Bootstrap's native dropdown close event to reset
  const dropdownElement = document.querySelector('.explore-btn-nav');
  if (dropdownElement) {
    dropdownElement.addEventListener('hidden.bs.dropdown', resetMenu);
  }

  // --- Logic for 1st Column (Left) Hover ---
  leftItems.forEach(item => {
    item.addEventListener("mouseenter", function () {
      // 1. Expand menu to show middle column, hide right column
      middleColumn.classList.add("show-col");
      rightColumn.classList.remove("show-col");

      // 2. Reset active states on left items
      leftItems.forEach(i => i.classList.remove("active"));
      this.classList.add("active");

      // 3. Hide all middle panels, reset active middle items
      middlePanels.forEach(p => p.classList.remove("active"));
      middleItems.forEach(i => i.classList.remove("active"));

      // 4. Show the targeted middle panel
      const targetId = this.getAttribute("data-target");
      const targetPanel = document.getElementById(targetId);
      
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });

  // --- Logic for 2nd Column (Middle) Hover ---
  middleItems.forEach(item => {
    item.addEventListener("mouseenter", function () {
      // 1. Expand menu to show right column
      rightColumn.classList.add("show-col");

      // 2. Reset active states on sibling middle items
      const parentPanel = this.closest('.submenu-panel');
      const siblings = parentPanel.querySelectorAll(".dropdown-item");
      siblings.forEach(i => i.classList.remove("active"));
      this.classList.add("active");

      // 3. Hide all right panels
      rightPanels.forEach(p => p.classList.remove("active"));

      // 4. Show the targeted right panel
      const targetId = this.getAttribute("data-subtarget");
      const targetPanel = document.getElementById(targetId);
      
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });


  const exploreWrap = document.querySelector(".explore-dropdown-wrap");
  const exploreBtn = document.querySelector(".explore-btn-nav");

  if (exploreWrap && exploreBtn) {
    const dropdown = new bootstrap.Dropdown(exploreBtn);

    let timeout;

    exploreWrap.addEventListener("mouseenter", () => {
      clearTimeout(timeout);
      dropdown.show();
    });

    exploreWrap.addEventListener("mouseleave", () => {
      timeout = setTimeout(() => {
        dropdown.hide();
      }, 150);
    });
  }


}
);


// ================================
// COUNTRY DROPDOWN (SCOPED SAFE)
// ================================
const countryDropdown = document.querySelector(".country-dropdown");

if (countryDropdown) {
  const countryBtn = countryDropdown.querySelector(".country-btn");
  const countryItems = countryDropdown.querySelectorAll(".dropdown-item");

  countryItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove old active
      countryItems.forEach((i) => i.classList.remove("active"));

      // Add active to selected
      this.classList.add("active");

      // Update button (flag + text)
      const img = this.querySelector("img").src;
      const text = this.textContent.trim();

      countryBtn.innerHTML = `<img src="${img}" /> ${text}`;

      // Close dropdown
      const dropdown = bootstrap.Dropdown.getInstance(countryBtn);
      if (dropdown) dropdown.hide();
    });
  });
}

// ==============================================================
const countryNavDropdown = document.querySelector(".country-nav");

if (countryNavDropdown) {
  const countryBtn = countryNavDropdown.querySelector(".country-nav-btn");
  const shortText = countryBtn.querySelector(".short-text");
  const longText = countryBtn.querySelector(".long-text");
  const countryItems = countryNavDropdown.querySelectorAll(".country-nav-menu .dropdown-item");

  function updateCountryLabel(shortName, longName) {
    shortText.textContent = shortName;
    longText.textContent = longName;
  }

  countryItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      const shortName = this.dataset.short || "";
      const longName = this.dataset.long || this.textContent.trim();

      updateCountryLabel(shortName, longName);

      countryItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      const dropdown = bootstrap.Dropdown.getInstance(countryBtn);
      if (dropdown) dropdown.hide();
    });
  });

  const activeItem = countryNavDropdown.querySelector(".dropdown-item.active") || countryItems[1];
  if (activeItem) {
    updateCountryLabel(activeItem.dataset.short, activeItem.dataset.long);
  }
}


// =============================================================================================
document.addEventListener("DOMContentLoaded", () => {
  const forwardButtons = document.querySelectorAll(".menu-row[data-target]");
  const backButtons = document.querySelectorAll(".menu-back");

  forwardButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const currentPanel = btn.closest(".menu-panel");
      const targetPanel = document.getElementById(targetId);

      currentPanel.classList.remove("active");
      currentPanel.classList.add("slide-left");
      targetPanel.classList.add("active");
    });
  });

  backButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const backId = btn.getAttribute("data-back");
      const currentPanel = btn.closest(".menu-panel");
      const backPanel = document.getElementById(backId);

      currentPanel.classList.remove("active");
      backPanel.classList.remove("slide-left");
      backPanel.classList.add("active");
    });
  });
});




//===========================================
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestionsBox");
const searchOverlay = document.getElementById("searchOverlay");

const suggestions = [
  "ppf film for car",
  "ppe equipment",
  "aa battery",
  "ppe gowns disposable",
  "bb cream",
  "cctv camera",
  "ddr5 ram",
  "pp",
  "ppe gloves",
  "ppf film",
];

function openSearchUI() {
  searchOverlay.classList.add("active");
}

function closeSearchUI() {
  suggestionsBox.style.display = "none";
  searchOverlay.classList.remove("active");
}

searchInput.addEventListener("focus", () => {
  if (searchInput.value.trim()) {
    openSearchUI();
    suggestionsBox.style.display = "block";
  }
});

searchInput.addEventListener("input", function () {
  const value = this.value.trim().toLowerCase();
  suggestionsBox.innerHTML = "";

  if (!value) {
    suggestionsBox.style.display = "none";
    closeSearchUI();
    return;
  }

  const filtered = suggestions.filter((item) =>
    item.toLowerCase().includes(value)
  );

  filtered.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.textContent = item;

    div.addEventListener("click", () => {
      searchInput.value = item;
      closeSearchUI();
    });

    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = filtered.length ? "block" : "none";
  openSearchUI();
});

searchOverlay.addEventListener("click", closeSearchUI);

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-wrapper")) {
    closeSearchUI();
  }
});
