document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const searchBtn = document.getElementById("searchBtn");
  const searchPanel = document.getElementById("searchPanel");
  const searchInput = document.getElementById("searchInput");
  const cartCount = document.getElementById("cartCount");
  const toast = document.getElementById("toast");
  const announcement = document.querySelector(".announcement");
  const closeAnnouncement = document.getElementById("closeAnnouncement");

  // Mobile menu
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  // Search panel
  searchBtn.addEventListener("click", () => {
    searchPanel.classList.toggle("open");
    if (searchPanel.classList.contains("open")) searchInput.focus();
  });

  // Demo search feedback
  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) showToast(`Buscando "${query}"...`);
    }
  });

  // Close announcement
  closeAnnouncement.addEventListener("click", () => {
    announcement.style.display = "none";
  });

  // Cart
  let cart = 0;
  document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
      cart++;
      cartCount.textContent = cart;
      showToast(`${button.dataset.name} fue agregado al carrito ♡`);
    });
  });

  document.getElementById("cartBtn").addEventListener("click", () => {
    if (cart === 0) {
      showToast("Tu carrito está vacío ✦");
    } else {
      showToast(`Tienes ${cart} producto${cart > 1 ? "s" : ""} en tu carrito`);
    }
  });

  // Favorites
  document.querySelectorAll(".heart").forEach(button => {
    button.addEventListener("click", e => {
      e.stopPropagation();
      button.classList.toggle("liked");
      button.textContent = button.classList.contains("liked") ? "♥" : "♡";
      showToast(button.classList.contains("liked") ? "Agregado a favoritos ♡" : "Eliminado de favoritos");
    });
  });

  document.getElementById("favoritesBtn").addEventListener("click", () => {
    showToast("Aquí aparecerán tus favoritos ♡");
  });

  // Category filters
  const pills = document.querySelectorAll(".pill");
  const products = document.querySelectorAll(".product-card");

  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const filter = pill.dataset.filter;
      products.forEach(product => {
        const match = filter === "todos" || product.dataset.category === filter;
        product.style.display = match ? "" : "none";
        if (match) {
          product.animate(
            [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 280, easing: "ease-out" }
          );
        }
      });
    });
  });

  // Newsletter
  document.getElementById("newsletterForm").addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("emailInput").value;
    const message = document.getElementById("formMessage");
    message.textContent = `¡Listo! ${email} ya forma parte del HUSH Club ♡`;
    e.target.reset();
  });

  // Sell CTA
  document.getElementById("sellBtn").addEventListener("click", e => {
    e.preventDefault();
    showToast("Próximamente: formulario para publicar tu prenda ✦");
  });

  // Brand buttons
  document.querySelectorAll(".brand").forEach(brand => {
    brand.addEventListener("click", () => {
      showToast(`Explorando ${brand.textContent.trim()}...`);
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Active navigation on scroll
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove("active"));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => sectionObserver.observe(section));

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
  }
});
