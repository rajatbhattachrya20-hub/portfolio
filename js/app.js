/* ==========================================================================
   RAJAT BHATTACHARYA - DIGITAL PORTFOLIO SCRIPTS
   Interactive Features: Canvas Particles, Typewriter, Theme Switcher,
   Mini DSA Visualizer, Developer Terminal CLI, Modal Manager & Toast System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all portfolio modules
  initThemeToggle();
  initNavbar();
  initTypewriter();
  initParticles();
  initSkillsFilter();
  initDsaVisualizer();
  initTerminal();
  initCertModal();
  initContactForm();
  initLiveClock();
  initCurrentYear();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark / Light Theme)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem('rajat-portfolio-theme') || 'dark';

  setTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('rajat-portfolio-theme', theme);
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'light') {
      icon.className = 'fa-solid fa-sun';
      icon.style.color = '#f59e0b';
    } else {
      icon.className = 'fa-solid fa-moon';
      icon.style.color = 'inherit';
    }
  }
}

/* ==========================================================================
   2. NAVBAR SCROLL EFFECT & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightCurrentSection();
  });

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  function highlightCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinkItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   3. TYPEWRITER HERO ANIMATION
   ========================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriter-text');
  const phrases = [
    'B.Tech CSE Undergrad @ LPU',
    'Algorithm Visualizer Creator',
    'Python & Automation Enthusiast',
    'Full-Stack Web Developer',
    'Problem Solver (CGPA 8.80)'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      element.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      element.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1800; // Pause at end of sentence
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing next sentence
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. CANVAS PARTICLE SYSTEM
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particlesCount = Math.min(Math.floor(window.innerWidth / 18), 65);
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particlesCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   5. SKILLS MATRIX FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE MINI DSA VISUALIZER ENGINE
   ========================================================================== */
function initDsaVisualizer() {
  const stage = document.getElementById('dsa-stage');
  const algoSelect = document.getElementById('dsa-algo-select');
  const generateBtn = document.getElementById('dsa-generate-btn');
  const startBtn = document.getElementById('dsa-start-btn');
  const resetBtn = document.getElementById('dsa-reset-btn');
  const statusText = document.getElementById('dsa-status-text');
  const comparisonsEl = document.getElementById('dsa-comparisons');
  const swapsEl = document.getElementById('dsa-swaps');
  const complexityEl = document.getElementById('dsa-complexity');

  let array = [];
  const arraySize = 12;
  let isSorting = false;
  let abortController = false;

  function generateArray() {
    if (isSorting) return;
    array = [];
    stage.innerHTML = '';
    for (let i = 0; i < arraySize; i++) {
      const val = Math.floor(Math.random() * 85) + 15;
      array.push(val);
      const bar = document.createElement('div');
      bar.className = 'dsa-bar';
      bar.style.height = `${val * 2}px`;
      bar.textContent = val;
      stage.appendChild(bar);
    }
    comparisonsEl.textContent = 'Comparisons: 0';
    swapsEl.textContent = 'Swaps: 0';
    statusText.innerHTML = 'Status: <strong>New array generated. Ready to sort.</strong>';
  }

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function bubbleSort() {
    isSorting = true;
    abortController = false;
    startBtn.disabled = true;
    generateBtn.disabled = true;
    algoSelect.disabled = true;

    complexityEl.textContent = 'Time: O(N²) | Space: O(1)';
    const bars = stage.children;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (abortController) break;

        bars[j].classList.add('comparing');
        bars[j + 1].classList.add('comparing');
        comparisons++;
        comparisonsEl.textContent = `Comparisons: ${comparisons}`;
        statusText.innerHTML = `Status: Comparing element <strong>${array[j]}</strong> with <strong>${array[j + 1]}</strong>`;

        await delay(320);

        if (array[j] > array[j + 1]) {
          bars[j].classList.add('swapping');
          bars[j + 1].classList.add('swapping');
          swaps++;
          swapsEl.textContent = `Swaps: ${swaps}`;

          // Swap logic
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;

          bars[j].style.height = `${array[j] * 2}px`;
          bars[j].textContent = array[j];
          bars[j + 1].style.height = `${array[j + 1] * 2}px`;
          bars[j + 1].textContent = array[j + 1];

          await delay(320);
          bars[j].classList.remove('swapping');
          bars[j + 1].classList.remove('swapping');
        }

        bars[j].classList.remove('comparing');
        bars[j + 1].classList.remove('comparing');
      }
      bars[array.length - i - 1].classList.add('sorted');
    }

    finishSorting();
  }

  async function selectionSort() {
    isSorting = true;
    abortController = false;
    startBtn.disabled = true;
    generateBtn.disabled = true;
    algoSelect.disabled = true;

    complexityEl.textContent = 'Time: O(N²) | Space: O(1)';
    const bars = stage.children;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < array.length; i++) {
      let minIdx = i;
      bars[minIdx].classList.add('comparing');

      for (let j = i + 1; j < array.length; j++) {
        if (abortController) break;
        bars[j].classList.add('comparing');
        comparisons++;
        comparisonsEl.textContent = `Comparisons: ${comparisons}`;
        statusText.innerHTML = `Status: Finding minimum. Checking <strong>${array[j]}</strong> against current min <strong>${array[minIdx]}</strong>`;

        await delay(250);

        if (array[j] < array[minIdx]) {
          bars[minIdx].classList.remove('comparing');
          minIdx = j;
          bars[minIdx].classList.add('comparing');
        } else {
          bars[j].classList.remove('comparing');
        }
      }

      if (minIdx !== i) {
        swaps++;
        swapsEl.textContent = `Swaps: ${swaps}`;
        let temp = array[i];
        array[i] = array[minIdx];
        array[minIdx] = temp;

        bars[i].style.height = `${array[i] * 2}px`;
        bars[i].textContent = array[i];
        bars[minIdx].style.height = `${array[minIdx] * 2}px`;
        bars[minIdx].textContent = array[minIdx];
      }

      if (bars[minIdx]) bars[minIdx].classList.remove('comparing');
      bars[i].classList.add('sorted');
      await delay(250);
    }

    finishSorting();
  }

  async function insertionSort() {
    isSorting = true;
    abortController = false;
    startBtn.disabled = true;
    generateBtn.disabled = true;
    algoSelect.disabled = true;

    complexityEl.textContent = 'Time: O(N²) | Space: O(1)';
    const bars = stage.children;
    let comparisons = 0;
    let swaps = 0;

    bars[0].classList.add('sorted');

    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;

      bars[i].classList.add('swapping');
      statusText.innerHTML = `Status: Inserting key <strong>${key}</strong> into sorted subarray`;
      await delay(320);

      while (j >= 0 && array[j] > key) {
        if (abortController) break;
        comparisons++;
        swaps++;
        comparisonsEl.textContent = `Comparisons: ${comparisons}`;
        swapsEl.textContent = `Swaps: ${swaps}`;

        array[j + 1] = array[j];
        bars[j + 1].style.height = `${array[j + 1] * 2}px`;
        bars[j + 1].textContent = array[j + 1];

        j = j - 1;
        await delay(250);
      }

      array[j + 1] = key;
      bars[j + 1].style.height = `${key * 2}px`;
      bars[j + 1].textContent = key;
      bars[i].classList.remove('swapping');

      for (let k = 0; k <= i; k++) {
        bars[k].classList.add('sorted');
      }
      await delay(200);
    }

    finishSorting();
  }

  function finishSorting() {
    isSorting = false;
    startBtn.disabled = false;
    generateBtn.disabled = false;
    algoSelect.disabled = false;
    statusText.innerHTML = 'Status: <strong style="color: #10b981;">✓ Sorting Complete! All elements ordered.</strong>';
  }

  generateBtn.addEventListener('click', generateArray);

  startBtn.addEventListener('click', () => {
    if (isSorting) return;
    const selectedAlgo = algoSelect.value;
    if (selectedAlgo === 'bubble') bubbleSort();
    else if (selectedAlgo === 'selection') selectionSort();
    else if (selectedAlgo === 'insertion') insertionSort();
  });

  resetBtn.addEventListener('click', () => {
    abortController = true;
    isSorting = false;
    startBtn.disabled = false;
    generateBtn.disabled = false;
    algoSelect.disabled = false;
    generateArray();
  });

  generateArray();
}

/* ==========================================================================
   7. INTERACTIVE DEVELOPER TERMINAL (CLI)
   ========================================================================== */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  const body = document.getElementById('terminal-body');

  if (!input || !output) return;

    help: () => `Available commands:<br>
      &nbsp;&nbsp;<span class="term-cmd">bio</span>         - About Rajat Bhattacharya<br>
      &nbsp;&nbsp;<span class="term-cmd">education</span>   - Academic credentials & CGPA<br>
      &nbsp;&nbsp;<span class="term-cmd">skills</span>      - Technical skill set summary<br>
      &nbsp;&nbsp;<span class="term-cmd">projects</span>    - Featured projects & details<br>
      &nbsp;&nbsp;<span class="term-cmd">certs</span>       - Training and certifications<br>
      &nbsp;&nbsp;<span class="term-cmd">cv / resume</span> - Open / Download official CV PDF<br>
      &nbsp;&nbsp;<span class="term-cmd">contact</span>     - Direct contact info & socials<br>
      &nbsp;&nbsp;<span class="term-cmd">hire</span>        - Fast-track email modal / connection<br>
      &nbsp;&nbsp;<span class="term-cmd">clear</span>       - Clear terminal output`,
    
    bio: () => `<strong>Rajat Bhattacharya</strong><br>
      B.Tech CSE undergraduate at Lovely Professional University.<br>
      Specialized in Algorithm Visualization, Python Automation, and Full-Stack Engineering.`,

    education: () => `🎓 <strong>Education:</strong><br>
      • Lovely Professional University (B.Tech CSE 2025-2029) - <strong>CGPA: 8.80</strong><br>
      • Higher Secondary Education (Medinipur, WB) - <strong>86%</strong><br>
      • Secondary Education (Medinipur, WB) - <strong>90%</strong>`,

    skills: () => `⚡ <strong>Core Stack:</strong><br>
      • Languages: Python, JavaScript (ES6+), C++, C<br>
      • Web: HTML5, CSS3, Modern Responsive UI<br>
      • Databases/Tools: MySQL, Git, GitHub, Figma<br>
      • Soft Skills: Problem Solving, Team Collaboration, Time Management`,

    projects: () => `🚀 <strong>Featured Projects:</strong><br>
      1. <strong>DSA Visualizer</strong>: 15 algorithms across Easy, Medium & Hard with step-by-step animations & time complexity.<br>
      2. <strong>Interactive Portfolio</strong>: Responsive glassmorphic developer showcase with mini lab & terminal.<br>
      3. <strong>Network Automation Toolkit</strong>: Automated Python scripts for network configuration and metrics.`,

    certs: () => `📜 <strong>Certifications:</strong><br>
      • Community Development Project (CDP)<br>
      • Introduction to Artificial Intelligence<br>
      • Master Network Automation with Python for Network Engineers<br>
      • Leadership Training Bundle`,

    cv: () => {
      window.open('assets/Rajat_Bhattacharya_Resume.pdf', '_blank');
      return `📄 Opening Rajat's official CV / Resume in a new tab (<a href="assets/Rajat_Bhattacharya_Resume.pdf" download="Rajat_Bhattacharya_Resume.pdf" style="color: var(--accent-cyan);">Click to Download</a>)...`;
    },

    resume: () => {
      window.open('assets/Rajat_Bhattacharya_Resume.pdf', '_blank');
      return `📄 Opening Rajat's official CV / Resume in a new tab (<a href="assets/Rajat_Bhattacharya_Resume.pdf" download="Rajat_Bhattacharya_Resume.pdf" style="color: var(--accent-cyan);">Click to Download</a>)...`;
    },

    contact: () => `📫 <strong>Contact Details:</strong><br>
      • Email: <a href="mailto:rajatbhattachrya20@gmail.com" style="color: var(--accent-cyan);">rajatbhattachrya20@gmail.com</a><br>
      • Phone: +91-7063454183<br>
      • LinkedIn: linkedin.com/in/rajat-bhattacharya-774a96394<br>
      • GitHub: github.com/rajatbhattachrya20-hub`,

    hire: () => {
      setTimeout(() => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }, 500);
      return `Redirecting you to the contact form to connect with Rajat... 🚀`;
    },

    clear: () => {
      output.innerHTML = '';
      return '';
    },

    'sudo hire rajat': () => {
      showToast('🎉 Offer accepted! Rajat is excited to build great products with you!');
      return `Access Granted! Rajat has been added to your candidate shortlist with top priority.`;
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = input.value.trim();
      const cmd = rawCmd.toLowerCase();
      input.value = '';

      if (!cmd) return;

      const cmdLine = document.createElement('div');
      cmdLine.className = 'term-line';
      cmdLine.innerHTML = `<span class="term-prompt">rajat@guest:~$</span> <span class="term-cmd">${rawCmd}</span>`;
      output.appendChild(cmdLine);

      if (cmd === 'clear') {
        commands.clear();
        return;
      }

      const resultLine = document.createElement('div');
      resultLine.className = 'term-line term-result';

      if (commands[cmd]) {
        resultLine.innerHTML = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
      } else {
        resultLine.innerHTML = `command not found: <code>${rawCmd}</code>. Type <span class="term-cmd">help</span> for a list of valid commands.`;
      }

      output.appendChild(resultLine);
      body.scrollTop = body.scrollHeight;
    }
  });
}

/* ==========================================================================
   8. CERTIFICATE MODAL MANAGER
   ========================================================================== */
function initCertModal() {
  const modal = document.getElementById('cert-modal');
  const titleEl = document.getElementById('modal-cert-title');
  const dateEl = document.getElementById('modal-cert-date');
  const bodyEl = document.getElementById('modal-cert-body');
  const closeBtn = document.getElementById('modal-close-btn');
  const doneBtn = document.getElementById('modal-done-btn');
  const triggers = document.querySelectorAll('.cert-modal-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const title = trigger.getAttribute('data-cert');
      const date = trigger.getAttribute('data-date');
      const details = trigger.getAttribute('data-details');

      titleEl.textContent = title;
      dateEl.textContent = date;
      bodyEl.textContent = details;

      modal.classList.add('active');
    });
  });

  const closeModal = () => modal.classList.remove('active');
  closeBtn.addEventListener('click', closeModal);
  doneBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* ==========================================================================
   9. CONTACT FORM SUBMISSION & TOAST NOTIFICATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject')?.value || 'New Portfolio Message';
    const message = document.getElementById('contact-message').value;

    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '<span>Send Message</span>';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending Message...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/rajatbhattacharya20@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: `[Portfolio Message] ${subject} from ${name}`,
          message: message
        })
      });

      const data = await response.json();

      if (response.ok || data.success === "true" || data.success === true) {
        showToast(`✓ Thank you, ${name}! Your message was delivered directly to Rajat's inbox.`);
        form.reset();
      } else {
        throw new Error(data.message || 'Failed to send message.');
      }
    } catch (err) {
      showToast(`⚠️ Message could not be sent automatically. Please email rajatbhattacharya20@gmail.com directly.`);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
    }
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 1.2rem;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function copyToClipboard(text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg);
  }).catch(() => {
    showToast(`Copied: ${text}`);
  });
}

// Attach to window so HTML inline onclicks can call it
window.copyToClipboard = copyToClipboard;

/* ==========================================================================
   10. LIVE IST CLOCK & CURRENT YEAR
   ========================================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('live-ist-clock');
  if (!clockEl) return;

  function updateClock() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    clockEl.textContent = new Intl.DateTimeFormat('en-US', options).format(new Date());
  }

  updateClock();
  setInterval(updateClock, 1000);
}

function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
