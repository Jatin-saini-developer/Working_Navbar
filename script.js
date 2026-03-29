
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
  const dropdownElement = document.querySelector('.explore-btn');
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
  const exploreBtn = document.querySelector(".explore-btn");

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

  countryItems.forEach(item => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      const selectedCountry = this.innerHTML;

      // Update button text
      countryBtn.innerHTML = selectedCountry;

      // Active state (only inside country dropdown)
      countryItems.forEach(i => i.classList.remove("active"));
      this.classList.add("active");

      // Close dropdown
      const dropdown = bootstrap.Dropdown.getInstance(countryBtn);
      if (dropdown) {
        dropdown.hide();
      }
    });
  });
}


// ==============================================================

const countryNavDropdown = document.querySelector(".country-nav");

if (countryNavDropdown) {
  const countryBtn = countryNavDropdown.querySelector(".country-nav-btn");
  const countryItems = countryNavDropdown.querySelectorAll(".country-nav-menu .dropdown-item");

  countryItems.forEach(item => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      const selectedCountry = this.textContent;

      // Update button text
      countryBtn.textContent = selectedCountry;

      // Active state (only inside country dropdown)
      countryItems.forEach(i => i.classList.remove("active"));
      this.classList.add("active");

      // Close dropdown
      const dropdown = bootstrap.Dropdown.getInstance(countryBtn);
      if (dropdown) {
        dropdown.hide();
      }
    });
  });
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