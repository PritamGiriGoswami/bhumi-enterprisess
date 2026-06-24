/* =============================================
   BHUMI ENTERPRISES - AI-Powered Interactive UI
   ============================================= */

(function () {
  'use strict';

  // ===================== PRELOADER =====================
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 600);
  });
  // Fallback: hide after 3s
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
    }
  }, 3000);

  // ===================== PROGRESS BAR =====================
  const progressBar = document.getElementById('progressBar');
  let tickingBar = false;
  window.addEventListener('scroll', () => {
    if (!tickingBar) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
        tickingBar = false;
      });
      tickingBar = true;
    }
  }, { passive: true });

  // Always light mode

  // ===================== MOBILE MENU =====================
  const menuToggle = document.getElementById('menuToggle');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');

  function openMenu() {
    menuToggle.classList.add('open');
    drawerBackdrop.classList.add('open');
    mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuToggle.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', () => {
    if (mobileDrawer.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  drawerBackdrop.addEventListener('click', closeMenu);
  drawerClose.addEventListener('click', closeMenu);
  mobileDrawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // ===================== NAV SCROLL =====================
  const siteHeader = document.getElementById('siteHeader');
  let tickingNav = false;
  window.addEventListener('scroll', () => {
    if (!tickingNav) {
      requestAnimationFrame(() => {
        siteHeader.classList.toggle('scrolled', window.scrollY > 40);
        tickingNav = false;
      });
      tickingNav = true;
    }
  }, { passive: true });

  // ===================== BACK TO TOP =====================
  const backToTopBtn = document.getElementById('backToTop');
  let tickingBTT = false;
  window.addEventListener('scroll', () => {
    if (!tickingBTT) {
      requestAnimationFrame(() => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 500);
        tickingBTT = false;
      });
      tickingBTT = true;
    }
  }, { passive: true });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===================== LIGHTBOX =====================
  function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lightboxImg').src = src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  window.openLightbox = openLightbox;

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
  window.closeLightbox = closeLightbox;
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ===================== PORTFOLIO FILTER =====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.style.display = match ? '' : 'none';
        if (match) {
          // Re-trigger reveal
          item.classList.remove('visible');
          requestAnimationFrame(() => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
            if (isVisible) item.classList.add('visible');
          });
        }
      });
    });
  });

  // ===================== COUNTER ANIMATION =====================
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const elText = el.textContent.trim();
      const countStr = el.dataset.count || elText.replace(/[^0-9]/g, '');
      const target = parseInt(countStr);
      if (isNaN(target)) return;

      const suffix = el.dataset.count && el.dataset.count.includes('%') ? '%' : '';
      const plus = el.dataset.count && el.dataset.count.includes('+') ? '+' : '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 50));
      const interval = setInterval(() => {
        current = Math.min(target, current + step);
        const suffixHtml = suffix ? '<small>%</small>' : '';
        el.innerHTML = current + suffixHtml + plus;
        if (current >= target) clearInterval(interval);
      }, 20);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // ===================== SCROLL REVEAL =====================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    const dir = el.dataset.reveal || 'up';
    el.classList.add('reveal', 'reveal-' + dir);
    revealObserver.observe(el);
  });
  document.querySelectorAll('[data-reveal-delay]').forEach(el => {
    el.classList.add('reveal-delay-' + el.dataset.revealDelay);
  });

  // ===================== HERO PARTICLE CANVAS (Three.js) =====================
  (function initHeroParticles() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || !window.THREE) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 15;

    // Particles
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;

      const shade = 0.3 + Math.random() * 0.4;
      colors[i * 3] = shade + 0.1;
      colors[i * 3 + 1] = shade + 0.05;
      colors[i * 3 + 2] = shade + (Math.random() > 0.7 ? 0.2 : 0);

      sizes[i] = 0.02 + Math.random() * 0.06;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Resize
    function resizeParticles() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resizeParticles();
    window.addEventListener('resize', resizeParticles);

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    let targetRotationX = 0;
    let targetRotationY = 0;

    function animateParticles() {
      targetRotationX += (mouseY * 0.05 - targetRotationX) * 0.02;
      targetRotationY += (mouseX * 0.05 - targetRotationY) * 0.02;

      particles.rotation.x = targetRotationX;
      particles.rotation.y = targetRotationY;

      const time = Date.now() * 0.0002;
      const pos = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += Math.sin(time + i * 0.01) * 0.001;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animateParticles);
    }

    // Only animate when visible
    const heroObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateParticles();
        heroObserver.disconnect();
      }
    }, { threshold: 0.1 });
    heroObserver.observe(document.getElementById('hero'));

    // Also start immediately if hero is visible
    const heroRect = document.getElementById('hero').getBoundingClientRect();
    if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
      animateParticles();
      heroObserver.disconnect();
    }
  })();

  // ===================== 3D VISION (from old index, adapted) =====================
  (function init3DVision() {
    const canvas = document.getElementById('visionCanvas');
    const stage = document.getElementById('vision-animation');
    if (!canvas || !stage || !window.THREE) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setClearColor(0x0b1120, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b1120, 14, 30);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(7.5, 4.8, 8.5);

    const hemiLight = new THREE.HemisphereLight(0xf8fafc, 0x0f172a, 1.6);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfcd34d, 3.0);
    sunLight.position.set(6, 10, 7);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const accentLight = new THREE.PointLight(0xdc2626, 16, 14);
    accentLight.position.set(-4.5, 2.5, 4.2);
    scene.add(accentLight);

    const concrete = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.42, metalness: 0.08 });
    const concreteDark = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6, metalness: 0.18 });
    const glass = new THREE.MeshStandardMaterial({
      color: 0x93c5fd, roughness: 0.08, metalness: 0.05, transparent: true, opacity: 0.62,
    });
    const warmGlass = new THREE.MeshStandardMaterial({
      color: 0xfbbf24, emissive: 0xf59e0b, emissiveIntensity: 0.24, roughness: 0.18, transparent: true, opacity: 0.78,
    });
    const steel = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.38, metalness: 0.55 });
    const accent = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, roughness: 0.34, metalness: 0.28, emissive: 0x7c2d12, emissiveIntensity: 0.2,
    });
    const lawn = new THREE.MeshStandardMaterial({ color: 0x164e3f, roughness: 0.85, metalness: 0.02 });

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(22, 22),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9, metalness: 0.08 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(20, 40, 0xf59e0b, 0x334155);
    gridHelper.position.y = 0.025;
    scene.add(gridHelper);

    const building = new THREE.Group();
    scene.add(building);

    function addBox(w, h, d, x, y, z, mat) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      building.add(mesh);
      return mesh;
    }

    function addCyl(rt, rb, h, x, y, z, mat, seg) {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 12), mat);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      building.add(mesh);
      return mesh;
    }

    // === MODERN LUXURY VILLA ===

    // Ground platform
    addBox(7.2, 0.12, 5.2, 0, 0.08, 0, concreteDark);

    // Main ground floor body
    addBox(5.6, 0.9, 3.8, -0.2, 0.58, 0.05, concrete);

    // Upper floor (slightly set back)
    addBox(4.8, 0.85, 3.2, 0.15, 1.5, 0.1, concrete);

    // Roof slab (floating effect)
    addBox(5.8, 0.1, 4.0, -0.2, 2.5, 0.05, concreteDark);
    addBox(5.0, 0.08, 3.4, 0.15, 2.52, 0.1, steel);

    // === GLASS WALLS ===

    // Ground floor front glass
    addBox(3.2, 0.8, 0.06, -0.1, 0.62, 1.9, glass);
    // Ground floor side glass
    addBox(0.06, 0.8, 1.6, -2.9, 0.62, 0.1, glass);
    // Upper floor front glass
    addBox(2.8, 0.76, 0.06, 0.25, 1.52, 1.65, glass);
    // Upper floor side glass tower
    addBox(0.06, 1.6, 1.4, 2.5, 1.48, 0.15, glass);

    // === WARM GLASS ACCENT (light glow) ===
    addBox(0.9, 0.5, 0.9, -2.1, 0.5, 1.35, warmGlass);
    addBox(0.9, 0.5, 0.9, -2.1, 1.35, 1.35, warmGlass);

    // === ENTRY CANOPY ===
    addBox(2.0, 0.06, 1.8, -2.2, 0.58, 2.4, accent);
    addCyl(0.04, 0.04, 0.6, -3.15, 0.32, 2.35, accent);
    addCyl(0.04, 0.04, 0.6, -1.25, 0.32, 2.35, accent);

    // === TOWER / STAIRCASE FEATURE ===
    addBox(1.2, 1.9, 1.2, 2.4, 1.08, -0.8, steel);
    addBox(1.1, 1.8, 1.1, 2.4, 1.03, -0.8, glass);

    // === CARPORT ===
    addBox(2.4, 0.06, 1.6, -0.4, 0.78, -1.8, accent);
    addCyl(0.035, 0.035, 0.8, -1.55, 0.42, -1.8, steel);
    addCyl(0.035, 0.035, 0.8, 0.75, 0.42, -1.8, steel);

    // === TERRACE RAILING ===
    for (let i = 0; i < 8; i++) addBox(0.035, 0.12, 0.035, -2.9 + i * 0.65, 2.05, 1.95, steel);
    for (let i = 0; i < 6; i++) addBox(0.035, 0.12, 0.035, 0.6 + i * 0.45, 2.05, 1.95, steel);

    // === SWIMMING POOL ===
    const poolMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.06, metalness: 0.1, transparent: true, opacity: 0.7 });
    addBox(1.8, 0.03, 1.0, -2.6, 0.12, -1.2, poolMat);
    addBox(0.06, 0.1, 1.0, -3.53, 0.15, -1.2, concrete);
    addBox(0.06, 0.1, 1.0, -1.67, 0.15, -1.2, concrete);
    addBox(1.8, 0.1, 0.06, -2.6, 0.15, -0.68, concrete);
    addBox(1.8, 0.1, 0.06, -2.6, 0.15, -1.72, concrete);

    // === DECK / PATIO ===
    addBox(0.08, 0.04, 1.0, -1.0, 0.06, -0.2, accent);
    addBox(0.08, 0.04, 1.0, -1.0, 0.06, 0.7, accent);

    // === LANDSCAPING: SHRUBS ===
    const shrubs = [
      [-3.6, 0.3, -2.5], [ -2.8, 0.3, -2.7], [ -1.0, 0.3, -2.5],
      [ 0.8, 0.3, -2.3], [ 2.2, 0.3, -2.0], [ 3.0, 0.3, -1.5],
      [-3.4, 0.3, 2.8], [ -2.0, 0.3, 2.7], [ 3.0, 0.3, 2.5],
      [ 3.6, 0.3, 2.0], [ 3.8, 0.3, 0.5], [ 3.8, 0.3, -0.8],
    ];
    shrubs.forEach(([x, y, z]) => {
      const s = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.45, 8), lawn);
      s.position.set(x, y, z);
      s.castShadow = true;
      building.add(s);
    });

    // === TREES ===
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x065f46, roughness: 0.8 });
    const treePositions = [[-3.2, 0.2, -2.9], [2.8, 0.2, -2.7], [-3.0, 0.2, 3.1], [3.5, 0.2, 2.8]];
    treePositions.forEach(([x, y, z]) => {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.7, 8), trunkMat);
      trunk.position.set(x, y + 0.35, z);
      trunk.castShadow = true;
      building.add(trunk);
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), leafMat);
      leaf.position.set(x, y + 0.85, z);
      leaf.castShadow = true;
      building.add(leaf);
    });

    // === WALKWAY ===
    const pathMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.7 });
    const pathPts = [
      new THREE.Vector3(-2.6, 0.04, 2.15),
      new THREE.Vector3(-1.8, 0.04, 2.0),
      new THREE.Vector3(-0.6, 0.04, 2.2),
      new THREE.Vector3(0.8, 0.04, 2.0),
      new THREE.Vector3(2.4, 0.04, 1.8),
    ];
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pathPts), pathMat));

    let pointerX = 0;
    let pointerY = 0;
    stage.addEventListener('pointermove', (e) => {
      const rect = stage.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    function resizeRenderer() {
      const rect = stage.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    }

    if ('ResizeObserver' in window) {
      new ResizeObserver(resizeRenderer).observe(stage);
    } else {
      window.addEventListener('resize', resizeRenderer);
    }
    resizeRenderer();

    const fallback = document.getElementById('visionFallback');
    if (fallback) fallback.style.opacity = '0';

    const lookAt = new THREE.Vector3(2.5, 1.2, -2.0);
    let animId;
    let isVisible = false;

    const visObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) animateVision3D(performance.now());
        else if (animId) { cancelAnimationFrame(animId); animId = null; }
      });
    }, { threshold: 0.1 });
    visObserver.observe(stage);

    function animateVision3D(time) {
      if (!isVisible) return;
      const sec = time * 0.001;
      building.rotation.y = sec * 0.22 + pointerX * 0.25;
      building.rotation.x = pointerY * 0.035;
      building.position.y = Math.sin(sec * 1.4) * 0.035;
      accentLight.intensity = 16 + Math.sin(sec * 2.2) * 3;
      camera.lookAt(lookAt);
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animateVision3D);
    }

    // Check if already visible
    const rect = stage.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      isVisible = true;
      animateVision3D(performance.now());
    }
  })();


  // ===================== CONTACT FORM =====================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(contactForm);
    const name = fd.get('name').trim();
    const phone = fd.get('phone').trim();
    const email = fd.get('email').trim();
    const service = fd.get('service');
    const message = fd.get('message').trim();

    if (!name || !phone || !message) {
      formStatus.textContent = 'Please fill in required fields.';
      formStatus.style.color = '#ef4444';
      return;
    }

    // Send via Email
    const subject = encodeURIComponent('New Enquiry from ' + name);
    const body = encodeURIComponent(
      'New Project Enquiry\n' +
      '==================\n' +
      'Name: ' + name + '\n' +
      'Phone: ' + phone + '\n' +
      'Email: ' + (email || 'N/A') + '\n' +
      'Service: ' + (service || 'N/A') + '\n' +
      'Message: ' + message + '\n'
    );
    window.open('mailto:booking@bhumienterprisess.com?subject=' + subject + '&body=' + body, '_blank');

    formStatus.textContent = 'Thanks ' + name + '! We\'ll get back to you within 24 hours.';
    formStatus.style.color = 'var(--gold)';
    contactForm.reset();
  });

  window.sendWhatsApp = function () {
    const name = contactForm.querySelector('[name="name"]').value.trim();
    const phone = contactForm.querySelector('[name="phone"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const service = contactForm.querySelector('[name="service"]').value;
    const message = contactForm.querySelector('[name="message"]').value.trim();

    if (!name || !phone || !message) {
      formStatus.textContent = 'Please fill in name, phone, and message.';
      formStatus.style.color = '#ef4444';
      return;
    }

    const text = encodeURIComponent(
      '*New Project Enquiry*\n' +
      '==================\n' +
      '*Name:* ' + name + '\n' +
      '*Phone:* ' + phone + '\n' +
      '*Email:* ' + (email || 'N/A') + '\n' +
      '*Service:* ' + (service || 'N/A') + '\n' +
      '*Message:* ' + message + '\n'
    );
    window.open('https://wa.me/919950608995?text=' + text, '_blank');
    formStatus.textContent = 'Redirecting to WhatsApp...';
    formStatus.style.color = 'var(--gold)';
  };

  // ===================== SMOOTH ANCHOR SCROLLING =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===================== RIPPLE EFFECT ON BUTTONS =====================
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--x', ((e.clientX - rect.left) / rect.width * 100) + '%');
      btn.style.setProperty('--y', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });
  });

  // ===================== ACTIVE NAV LINK HIGHLIGHT =====================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 200;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.style.color = 'rgba(255,255,255,0.7)';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--gold)';
      }
    });
  }, { passive: true });


  // ===================== PERFORMANCE: REDUCED MOTION =====================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
  }

  // ===================== AI CURSOR =====================
  (function initAICursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const cursor = document.createElement('div');
    cursor.className = 'ai-cursor';
    const dot = document.createElement('div');
    dot.className = 'ai-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(dot);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target;
      const isHover = target.closest('a, button, .ripple, .filter-btn, .card-link, .back-to-top, .social-float');
      cursor.classList.toggle('hover', !!isHover);
      dot.classList.toggle('hover', !!isHover);
    });

    function animateCursor() {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      dot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      dot.style.opacity = '1';
    });
  })();

  console.log('%c Bhumi Enterprises ', 'background:#dc2626;color:#ffffff;font-size:20px;font-weight:bold;padding:8px 12px;border-radius:6px;');
  console.log('%c AI-Powered Structural Design Platform ', 'font-size:14px;color:#94a3b8;');


})();
