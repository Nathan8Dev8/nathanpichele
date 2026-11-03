// Portfolio Nathan Pichele — tout le JS du site, sans framework.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const isMobile = () => innerWidth <= 900;

/* ================= DONNÉES (pour ajouter un projet : une entrée dans PROJECTS) ================= */
const SKILLS = [
  { ico: '◧', t: ['Front-end', 'Front-end'], d: ['Interfaces rapides, accessibles et animées.', 'Fast, accessible, animated interfaces.'],
    c: ['HTML5', 'CSS3', 'Sass', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'GSAP', 'Three.js', 'Responsive design', ['Accessibilité', 'Accessibility']] },
  { ico: '⚙', t: ['Back-end', 'Back-end'], d: ["Des API robustes et sécurisées, de la logique métier à l'authentification.", 'Robust, secure APIs, from business logic to authentication.'],
    c: ['Python', 'Django', 'Django REST', 'FastAPI', 'Node.js', 'Express', 'NestJS', 'PHP / Laravel', 'Java', 'API REST', 'GraphQL', 'WebSockets', 'JWT / OAuth'] },
  { ico: '▣', t: ['Mobile', 'Mobile'], d: ['Applications mobiles multiplateformes, Android et iOS.', 'Cross-platform mobile apps for Android and iOS.'],
    c: ['Flutter', 'Dart', 'React Native', 'PWA', 'Firebase'] },
  { ico: '⛁', t: ['Bases de données', 'Databases'], d: ['Modélisation, requêtes et performances.', 'Modeling, queries and performance.'],
    c: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis', 'Prisma', 'Django ORM', 'Mongoose'] },
  { ico: '✦', hl: 1, t: ['Agents IA', 'AI Agents'], d: ['Des agents qui raisonnent, utilisent des outils et automatisent le travail.', 'Agents that reason, use tools and automate work.'],
    c: ['Claude Code', 'IMARA', ['API Claude & OpenAI', 'Claude & OpenAI APIs'], 'Tool use & MCP', 'RAG', ['Bases vectorielles', 'Vector databases'], 'LangChain', 'n8n / Make', 'Prompt engineering', 'Chatbots'] },
  { ico: '☁', hl: 1, t: ['Cloud & DevOps', 'Cloud & DevOps'], d: ['Conteneurs, déploiement continu et mise en production.', 'Containers, continuous delivery and production.'],
    c: ['Docker', 'Docker Compose', 'Kubernetes', 'GitHub Actions', 'GitLab CI', 'AWS', 'Google Cloud', 'Vercel', 'Netlify', 'Linux', 'Nginx', 'Terraform', 'Monitoring'] },
  { ico: '⌘', t: ['Outils & méthodes', 'Tools & methods'], d: ['Travail en équipe, qualité et suivi.', 'Teamwork, quality and tracking.'],
    c: ['Git / GitHub', 'Figma', 'Postman', 'Jest / Vitest', 'Pytest', 'Agile / Scrum', ['Analyse de données', 'Data analysis']] },
];

const PROJECTS = [
  { id: 'devis', title: ['Devis en ligne', 'Online Quotes'], meta: ['2024 · Application web', '2024 · Web app'],
    role: ['Stage chez Allo Training · développement fullstack', 'Internship at Allo Training · fullstack development'],
    desc: ['Un devis professionnel en quelques clics : fiches clients, lignes de prestations, calcul automatique HT, TVA et TTC, et un PDF prêt à envoyer.',
           'A professional quote in a few clicks: client records, service lines, automatic tax totals and a PDF ready to send.'],
    tags: ['Python', 'Django', 'SQLite', 'HTML / CSS', 'JavaScript'], img: null, url: null },
  { id: 'kreads', title: ['Kreads', 'Kreads'], meta: ['Site vitrine · Studio publicitaire', 'Showcase site · Ad studio'],
    desc: ["Le site du studio KREADS, qui conçoit des publicités vidéo pensées pour vendre. Il présente la méthode, les réalisations et les offres, et transforme les visiteurs en demandes d'audit.",
           'The website of KREADS, a studio making video ads built to sell. It presents the method, past work and packages, and turns visitors into audit requests.'],
    tags: ['Site vitrine', 'Animations', 'Responsive', 'Vercel'], img: 'assets/img/kreads.webp', url: 'https://www.kreadsvideo.com/' },
  { id: 'axso', title: ['Axso', 'Axso'], meta: ['SaaS e-commerce · Afrique', 'E-commerce SaaS · Africa'],
    desc: ["Une plateforme qui permet à n'importe quel commerçant d'ouvrir sa boutique en ligne en 3 minutes, d'encaisser par Orange Money, MTN MoMo ou à la livraison, et de suivre chaque commande.",
           'A platform that lets any merchant open an online store in 3 minutes, get paid by Orange Money, MTN MoMo or cash on delivery, and track every order.'],
    tags: ['Next.js', 'React', 'Mobile Money', 'Vercel'], img: 'assets/img/axso.webp', url: 'https://axsoafrica.com/' },
  { id: 'axe', title: ['Axe Digital', 'Axe Digital'], meta: ["Site d'entreprise · Agence IA", 'Company website · AI agency'],
    desc: ["Le site de l'agence Axe Digital, qui conçoit des agents IA, des applications métier et des solutions numériques pensées pour les entreprises africaines.",
           'The website of Axe Digital, an agency building AI agents, business apps and digital solutions designed for African companies.'],
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'], img: 'assets/img/axe.webp', url: 'https://www.axedigital.agency/' },
];

const SERVICES = [
  { t: ['Sites web sur mesure', 'Custom websites'],
    d: ["Un site qui donne envie de vous contacter. Responsive, rapide, bien référencé sur Google, avec des animations et de la 3D quand elles servent votre image.",
        'A website that makes people want to contact you. Responsive, fast, well ranked on Google, with animation and 3D when they serve your brand.'],
    tags: ['Next.js', 'React', 'GSAP', 'Three.js', 'SEO'] },
  { t: ['Boutiques en ligne et Mobile Money', 'Online stores and Mobile Money'],
    d: ['Vendez en ligne jour et nuit et encaissez par Orange Money, MTN MoMo, carte bancaire ou paiement à la livraison. Suivi des commandes et des stocks inclus.',
        'Sell online day and night and get paid by Orange Money, MTN MoMo, card or cash on delivery. Order and stock tracking included.'],
    tags: ['Next.js', 'Orange Money', 'MTN MoMo', 'Stripe'] },
  { t: ['Applications métier', 'Business applications'],
    d: ['Remplacez les fichiers Excel et les papiers par un outil fait pour votre activité : devis, facturation, stock, clients, tableaux de bord. Chaque collaborateur accède à ce dont il a besoin.',
        'Replace spreadsheets and paperwork with a tool built for your business: quotes, invoicing, stock, clients, dashboards. Each team member sees exactly what they need.'],
    tags: ['Django', 'Node.js', 'PostgreSQL', ['Tableaux de bord', 'Dashboards']] },
  { t: ['Applications mobiles', 'Mobile apps'],
    d: ['Une application Android et iOS pour vos clients ou vos équipes sur le terrain, développée une seule fois avec Flutter pour les deux plateformes.',
        'An Android and iOS app for your customers or field teams, built once with Flutter for both platforms.'],
    tags: ['Flutter', 'Dart', 'Firebase'] },
  { t: ['Agents IA', 'AI agents'],
    d: ['Un assistant qui répond à vos clients, prépare vos documents, trie vos demandes et se charge des tâches répétitives. Vos équipes se concentrent sur ce qui rapporte.',
        'An assistant that answers your customers, drafts your documents, sorts incoming requests and handles repetitive work. Your teams focus on what brings in revenue.'],
    tags: ['Claude', 'OpenAI', 'RAG', 'MCP'] },
  { t: ['Chatbots WhatsApp et automatisation', 'WhatsApp chatbots and automation'],
    d: ['Vos clients sont sur WhatsApp. Répondez-leur automatiquement, prenez commandes et rendez-vous, et reliez chaque échange à vos outils internes.',
        'Your customers are on WhatsApp. Reply automatically, take orders and bookings, and connect every conversation to your internal tools.'],
    tags: ['WhatsApp Business', 'n8n', 'Make'] },
  { t: ['Applications de bureau', 'Desktop applications'],
    d: ['Des logiciels installés sur vos postes Windows, macOS ou Linux, qui continuent de fonctionner quand la connexion coupe : caisse, gestion, outils de production.',
        'Software installed on your Windows, macOS or Linux machines that keeps running when the connection drops: point of sale, management, production tools.'],
    tags: ['Flutter', 'Electron', 'Python'] },
  { t: ['Intégrations et API', 'Integrations and APIs'],
    d: ['Vos outils ne se parlent pas ? Je connecte paiement, CRM, comptabilité et e-mails pour supprimer la double saisie et les erreurs qui vont avec.',
        "Your tools don't talk to each other? I connect payments, CRM, accounting and email to end double entry and the mistakes that come with it."],
    tags: ['API REST', 'GraphQL', 'Webhooks'] },
  { t: ['Refonte de site', 'Website redesign'],
    d: ["Votre site a vieilli, il est lent ou s'affiche mal sur mobile ? Je le modernise, je l'accélère et je garde ce qui fonctionne déjà.",
        "Is your site dated, slow or awkward on mobile? I modernise it, speed it up and keep what already works."],
    tags: ['UX', 'Performance', 'SEO'] },
  { t: ['Hébergement et maintenance', 'Hosting and maintenance'],
    d: ["Mise en ligne, nom de domaine, sauvegardes, mises à jour de sécurité et petites évolutions, dans un forfait mensuel. Votre site reste en ligne et vous n'avez plus à vous en occuper.",
        "Deployment, domain name, backups, security updates and small improvements in one monthly plan. Your site stays online and off your to-do list."],
    tags: ['Docker', 'Vercel', 'AWS', 'Nginx'] },
];

const PATH = [
  { when: ['2025 – 2026 · en cours', '2025 – 2026 · ongoing'], t: ['2ème année Génie Logiciel', '2nd year, Software Engineering'],
    where: 'ISP', url: 'https://piderc.org/', d: ['Formation en génie logiciel, en parallèle de missions freelance.', 'Software engineering studies alongside freelance work.'], tag: ['Formation', 'Education'] },
  { when: ['Avr. – Sept. 2025', 'Apr. – Sept. 2025'], t: ['Stage développeur fullstack', 'Fullstack developer intern'],
    where: 'PEHE BRAINY TECH', d: ["Application web et mobile de location d'automobiles avec Flutter, Next.js et MongoDB.", 'Web and mobile car rental app with Flutter, Next.js and MongoDB.'], tag: ['Expérience', 'Experience'] },
  { when: ['2024 – 2025', '2024 – 2025'], t: ['1ère année Génie Logiciel (DQP)', '1st year, Software Engineering (DQP)'],
    where: 'ISP', url: 'https://piderc.org/', d: ["DQP en Développement d'applications : mobile (Dart / Flutter) et backend (Node.js, Express, MongoDB).", 'Professional diploma (DQP) in app development: mobile (Dart / Flutter) and backend (Node.js, Express, MongoDB).'], tag: ['Diplôme', 'Diploma'] },
  { when: ['Juin – Oct. 2024', 'June – Oct. 2024'], t: ['Stage développeur', 'Developer intern'],
    where: 'Allo Training', url: 'https://allotraining.com/', d: ['Application web de gestion des devis en ligne avec Python / Django.', 'Online quote management web app with Python / Django.'], tag: ['Expérience', 'Experience'] },
  { when: ['2023 – 2024', '2023 – 2024'], t: ['Formation professionnelle Python / Django', 'Python / Django professional training'],
    where: 'Allo Training', url: 'https://allotraining.com/', d: ["Attestation de formation : bases solides en Python et développement d'applications robustes.", 'Training certificate: solid Python foundations and robust application development.'], tag: ['Attestation', 'Certificate'] },
];

/* ================= TRADUCTION (le français est lu dans le HTML) ================= */
const EN = {
  'nav.about': 'About', 'nav.services': 'Services', 'nav.skills': 'Skills', 'nav.work': 'Work', 'nav.path': 'Background', 'nav.cta': 'Contact me',
  'hero.kicker': 'Fullstack developer in Douala, Cameroon',
  'hero.sub': 'I build the websites, apps and AI agents that save businesses time and win them customers. From the first meeting to launch, you deal with one person.',
  'hero.cta1': "Let's discuss your project", 'hero.cta2': 'See my work',
  'hero.scroll': 'Scroll down, the laptop is about to open ↓',
  'chap.n1': 'Step 1 of 4', 'chap.1t': 'You have an idea', 'chap.1': "A specific need, a problem that costs you time, or the wish to sell online. We talk it through, plainly, no jargon.",
  'chap.n2': 'Step 2 of 4', 'chap.2t': 'We shape it together', 'chap.2': 'Goals, budget, timeline: I propose a clear, costed solution before writing a single line of code.',
  'chap.n3': 'Step 3 of 4', 'chap.3t': 'I build it', 'chap.3': 'You follow progress at every stage, with a live test version you can try.',
  'chap.n4': 'Step 4 of 4', 'chap.4t': 'You launch it', 'chap.4': 'Going live, onboarding your team and support after delivery. Your tool starts working for you.',
  'about.t': "Hi, I'm Nathan.",
  'about.text': "For 4 years I've been building tools with a concrete purpose: selling online, producing a quote in two minutes, automating a task that eats hours every week. I learned the trade at Allo Training and PEHE BRAINY TECH, and I'm pursuing a software engineering degree at ISP. I use AI agents every day, which lets me deliver faster without compromising on quality.",
  'about.p1': '<b>You talk to the developer.</b> No middleman between your needs and the code.',
  'about.p2': '<b>You follow the progress.</b> Regular check-ins and a live test version.',
  'about.p3': '<b>Everything is yours.</b> The code, the accounts and the domain name are in your name.',
  'about.cv': 'Download my CV', 'about.talk': "Let's talk about your project",
  'services.t': 'What I can do for you',
  'services.lead': "Small business, start-up or large group: I adapt to your size, your tools and your deadlines. Don't see what you need? Write to me and we'll talk.",
  'skills.t': 'Skills', 'skills.lead': 'The technologies I use to ship solid products, from interface to server, from mobile to AI, all the way to production.',
  'work.t': 'Projects', 'work.lead': 'Live products, used every day by real businesses.', 'path.t': 'Background',
  'contact.t': "Let's talk about your project", 'contact.text': "A site to build, an app to launch, a task to automate? Describe what you need in a few lines. I'll come back to you with focused questions and a first estimate.",
  'form.name': 'Name', 'form.email': 'Email', 'form.subject': 'Subject', 'form.msg': 'Message', 'form.send': 'Send my request',
  'form.note': 'The button opens your email app with the message pre-filled.',
  'foot.made': 'Designed and coded in Douala.', 'foot.top': 'Back to top ↑',
};
const FR = {};
$$('[data-i18n]').forEach(el => (FR[el.dataset.i18n] = el.innerHTML));
let lang = localStorage.getItem('lang') || (navigator.language || 'fr').slice(0, 2);
if (lang !== 'en') lang = 'fr';
const L = v => (Array.isArray(v) ? v[lang === 'en' ? 1 : 0] : v);

function setLang(l) {
  lang = l; localStorage.setItem('lang', l); document.documentElement.lang = l;
  const dict = l === 'en' ? EN : FR;
  $$('[data-i18n]').forEach(el => { const v = dict[el.dataset.i18n]; if (v) el.innerHTML = v; });
  renderServices(); renderSkills(); renderProjects(); renderPath();
  revealObserve();
}
$('#lang').addEventListener('click', () => setLang(lang === 'fr' ? 'en' : 'fr'));

/* ================= RENDU DES LISTES ================= */
function renderSkills() {
  $('#skillsGrid').innerHTML = SKILLS.map(s => `
    <article class="skill glass rv${s.hl ? ' hl' : ''}">
      <h3>${L(s.t)}</h3><p>${L(s.d)}</p>
      <div class="chips">${s.c.map(c => `<span>${L(c)}</span>`).join('')}</div>
    </article>`).join('');
}

function renderProjects() {
  const visit = lang === 'en' ? 'Visit the site' : 'Voir le site';
  const nolink = lang === 'en' ? 'Internal app, no public link' : 'Application interne, pas de lien public';
  $('#workTrack').innerHTML = PROJECTS.map(p => `
    <article class="card glass" data-id="${p.id}">
      <div class="shot">${p.img ? `<img src="${p.img}" alt="${L(p.title)}" loading="lazy">` : ''}</div>
      <div class="card-body">
        <div class="card-top"><h3>${L(p.title)}</h3><span class="year">${L(p.meta)}</span></div>
        ${p.role ? `<p class="role">${L(p.role)}</p>` : ''}
        <p>${L(p.desc)}</p>
        <div class="chips">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        ${p.url ? `<a class="btn btn-sm magnetic" href="${p.url}" target="_blank" rel="noopener">${visit} ↗</a>` : `<span class="nolink">${nolink}</span>`}
      </div>
    </article>`).join('');
  $('#workTotal').textContent = String(PROJECTS.length).padStart(2, '0');
  // Le visuel du projet de devis = une copie de l'appli construite dans l'ordinateur.
  $$('.card .shot:empty').forEach(shot => {
    const mini = $('#app').cloneNode(true);
    mini.removeAttribute('id'); mini.className = 'app mini'; mini.style.opacity = 1;
    $$('.b', mini).forEach(b => b.classList.add('in', 'skin'));
    shot.append(mini);
    new ResizeObserver(() => (mini.style.transform = `scale(${shot.clientWidth / 1280})`)).observe(shot);
  });
  bindInteractive();
}

function renderServices() {
  const ask = lang === 'en' ? 'Request a quote' : 'Demander un devis';
  $('#servicesList').innerHTML = SERVICES.map(s => `
    <article class="service rv">
      <h3>${L(s.t)}</h3>
      <div><p>${L(s.d)}</p><div class="chips">${s.tags.map(t => `<span>${L(t)}</span>`).join('')}</div></div>
      <a class="go magnetic" href="#contact" data-subject="${L(s.t)}">${ask} →</a>
    </article>`).join('');
  bindInteractive();
}
// « Demander un devis » préremplit le sujet du formulaire
document.addEventListener('click', e => { const a = e.target.closest('[data-subject]'); if (a) $('#form [name=subject]').value = a.dataset.subject; });

function renderPath() {
  $$('.step', $('#timeline')).forEach(s => s.remove());
  $('#timeline').insertAdjacentHTML('beforeend', PATH.map(s => `
    <article class="step glass rv">
      <span class="when">${L(s.when)}</span><h3>${L(s.t)}</h3>
      <div class="where">${s.url ? `<a href="${s.url}" target="_blank" rel="noopener">${s.where}</a>` : s.where}</div>
      <p>${L(s.d)}</p><span class="tag">${L(s.tag)}</span>
    </article>`).join(''));
}

/* ================= RÉVÉLATIONS & COMPTEURS ================= */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in'); io.unobserve(e.target);
  $$('[data-count]', e.target).forEach(countUp);
  if (e.target.matches('[data-count]')) countUp(e.target);
}), { threshold: .15, rootMargin: '0px 0px -8% 0px' });
function revealObserve() { $$('.rv:not(.in), .giant:not(.in)').forEach(el => io.observe(el)); }
function countUp(el) {
  const n = +el.dataset.count, t0 = performance.now();
  const tick = t => { const k = clamp((t - t0) / 1400); el.textContent = Math.round(n * (1 - (1 - k) ** 3)) + (el.dataset.suffix || ''); if (k < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}

// Grand nom du footer, lettre par lettre
const giant = $('.giant');
giant.innerHTML = [...'Nathan Pichele'].map((c, i) => `<span style="transition-delay:${i * 40}ms">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
$('#year').textContent = new Date().getFullYear();

/* ================= SCÈNES ÉPINGLÉES ================= */
const pins = $$('.pin').map(el => ({ el, pin: +el.dataset.pin }));
function sizePins() { pins.forEach(p => (p.el.style.height = (p.el.id === 'work' && isMobile()) ? 'auto' : `calc(${p.pin} * 100svh)`)); }
const progressOf = el => { const r = el.getBoundingClientRect(); return clamp(-r.top / (r.height - innerHeight || 1)); };

/* ---------- ordinateur 3D (modèle « Laptop » d'Aullwen, CC BY 4.0) ---------- */
// L'écran HTML (#screen) est posé sur la dalle du modèle par CSS3DRenderer : il suit la charnière et la caméra.
const DISPLAY = { w: .294, h: .17, cx: 0, cy: .1004, z: .0043 }; // zone d'affichage, repère local du nœud « Screen »
const hero3d = { p: 0, ready: false };

function makeStudio(THREE, renderer) {
  const studio = new THREE.Scene();
  const panel = (c, i, x, y, z, w, h) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(i), side: THREE.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); studio.add(m); };
  panel('#ffffff', 5, 0, 6, 4, 8, 2); panel('#ffffff', 3, 6, -3, 5, 2, 5); panel('#9b7bf0', 4, -7, 0, 2, 3, 8); panel('#c9b6ff', 2.5, 7, 2, -2, 3, 6); panel('#6b3fc9', 3, 0, -6, -4, 10, 2);
  return new THREE.PMREMGenerator(renderer).fromScene(studio, .04).texture;
}

async function initHero3D() {
  const THREE = await import('three');
  const { GLTFLoader } = await import('./assets/vendor/jsm/loaders/GLTFLoader.js');
  const { CSS3DRenderer, CSS3DObject } = await import('./assets/vendor/jsm/renderers/CSS3DRenderer.js');
  const stage = $('#stage3d'), screenEl = $('#screen');

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const css = new CSS3DRenderer(); css.domElement.className = 'css3d';
  stage.prepend(renderer.domElement); stage.append(css.domElement);

  const scene = new THREE.Scene();
  scene.environment = makeStudio(THREE, renderer);
  const camera = new THREE.PerspectiveCamera(30, 1, .01, 100);
  const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(3, 5, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(0x9b7bf0, 3); rim.position.set(-4, 2, -3); scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, .25));
  const screenLight = new THREE.PointLight(0xcfe2ff, 0, 4, 2); scene.add(screenLight);

  const model = (await new GLTFLoader().loadAsync('assets/models/laptop/scene.gltf')).scene;
  // Taille : 3 unités de large, posé sur y = 0, centré
  let box = new THREE.Box3().setFromObject(model);
  model.scale.setScalar(3 / box.getSize(new THREE.Vector3()).x);
  box = new THREE.Box3().setFromObject(model);
  const c = box.getCenter(new THREE.Vector3());
  model.position.set(-c.x, -box.min.y, -c.z);
  const rig = new THREE.Group(); rig.add(model); scene.add(rig);

  const mats = [];
  model.traverse(o => { if (o.isMesh) { o.material.metalness = .55; o.material.roughness = .38; mats.push(o.material); } });
  const lid = model.getObjectByName('Screen');
  const lidMat = lid.children[0].material; lidMat.emissiveIntensity = 0;
  const kbMat = model.getObjectByName('Frame_ComputerFrame_0').material;

  // Charnière : on calcule la rotation qui rabat l'écran à plat vers l'avant
  scene.updateMatrixWorld(true);
  const openQ = lid.quaternion.clone();
  const parentQ = lid.parent.getWorldQuaternion(new THREE.Quaternion());
  const lidQ = lid.getWorldQuaternion(new THREE.Quaternion());
  const up = new THREE.Vector3(0, 1, 0).applyQuaternion(lidQ);
  const normal = new THREE.Vector3(0, 0, -1).applyQuaternion(lidQ);
  const front = new THREE.Vector3(normal.x, 0, normal.z).normalize();
  const toParent = parentQ.clone().invert();
  const closeDelta = new THREE.Quaternion().setFromUnitVectors(up.clone().applyQuaternion(toParent), front.clone().applyQuaternion(toParent));
  const closedQ = closeDelta.multiply(openQ.clone());

  // L'écran HTML collé sur la dalle
  const obj = new CSS3DObject(screenEl);
  obj.position.set(DISPLAY.cx, DISPLAY.cy, DISPLAY.z - .0003);
  obj.scale.set(DISPLAY.w / 1280, DISPLAY.h / 740, 1);
  lid.add(obj);
  scene.updateMatrixWorld(true);
  // Orientation : face visible vers l'avant de la dalle, et texte non inversé
  const face = new THREE.Vector3(0, 0, 1).transformDirection(obj.matrixWorld);
  if (face.dot(normal) < 0) obj.rotation.y = Math.PI;
  scene.updateMatrixWorld(true);
  const xw = new THREE.Vector3(1, 0, 0).transformDirection(obj.matrixWorld), yw = new THREE.Vector3(0, 1, 0).transformDirection(obj.matrixWorld);
  if (new THREE.Vector3().crossVectors(xw, yw).dot(normal) < 0) obj.scale.x *= -1;

  // Ombre douce au sol
  const sh = document.createElement('canvas'); sh.width = sh.height = 128;
  const sg = sh.getContext('2d'), rg = sg.createRadialGradient(64, 64, 0, 64, 64, 64);
  rg.addColorStop(0, 'rgba(0,0,0,.7)'); rg.addColorStop(1, 'rgba(0,0,0,0)'); sg.fillStyle = rg; sg.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 3.4), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sh), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -.01; rig.add(shadow);

  const resize = () => { const w = stage.clientWidth, h = stage.clientHeight; renderer.setSize(w, h, false); css.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); };
  resize(); new ResizeObserver(resize).observe(stage);

  const center = new THREE.Vector3(), nrm = new THREE.Vector3(), look = new THREE.Vector3(), pos = new THREE.Vector3(), zoomPos = new THREE.Vector3();
  const loop = t => {
    requestAnimationFrame(loop);
    const r = stage.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    const p = hero3d.p, open = smooth(.04, .2, p), power = smooth(.2, .28, p), z = smooth(.84, 1, p), zz = z * z * (3 - 2 * z);
    lid.quaternion.slerpQuaternions(closedQ, openQ, open);
    screenEl.style.opacity = smooth(.35, .7, open);
    kbMat.emissiveIntensity = .15 + power * .9;
    rig.position.y = isMobile() ? 0 : Math.sin(t / 900) * .05 * (1 - z);
    rig.rotation.y = lerp(-.55, -.12, smooth(0, .5, p)) * (1 - zz);
    scene.updateMatrixWorld(true);

    // Point de vue en orbite, puis plongée dans l'écran
    obj.getWorldPosition(center); nrm.set(0, 0, -1).transformDirection(lid.matrixWorld);
    const az = .35 + mx * .25, el = lerp(.75, .32, smooth(0, .3, p)) - my * .12, R = 7.8 * Math.max(1, .95 / camera.aspect);
    pos.set(Math.sin(az) * Math.cos(el) * R, .7 + Math.sin(el) * R, Math.cos(az) * Math.cos(el) * R);
    look.set(0, .75, 0);
    const half = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const worldH = DISPLAY.h * lid.matrixWorld.getMaxScaleOnAxis() * 1.0, worldW = worldH * DISPLAY.w / DISPLAY.h;
    const dist = Math.min(worldH / 2 / half, worldW / 2 / (half * camera.aspect)) * .97;
    zoomPos.copy(center).addScaledVector(nrm, dist);
    camera.position.lerpVectors(pos, zoomPos, zz);
    camera.lookAt(look.lerp(center, zz));
    // Décale l'ordi à droite sur grand écran, plus bas sur mobile
    const w = stage.clientWidth, h = stage.clientHeight;
    camera.setViewOffset(w, h, isMobile() ? 0 : -w * .17 * (1 - zz), isMobile() ? -h * .04 * (1 - zz) : 0, w, h);

    screenLight.position.copy(center).addScaledVector(nrm, .6);
    screenLight.intensity = power * 3;
    renderer.render(scene, camera); css.render(scene, camera);
  };
  requestAnimationFrame(loop);
  stage.classList.add('ready'); hero3d.ready = true;
}

/* ---------- terminal tapé au scroll ---------- */
const TERM = [
  ['pr', '$ '], ['', 'git clone github.com/Nathan8Dev8/devis-en-ligne\n'],
  ['pr', '$ '], ['', 'pip install -r requirements.txt\n'], ['ok', '✓ 23 paquets installés\n'],
  ['pr', '$ '], ['', 'python manage.py migrate\n'], ['ok', '✓ base de données prête\n'],
  ['pr', '$ '], ['', 'docker compose up -d --build\n'], ['ok', '✓ build terminé en 2.4 s\n'],
  ['pr', '$ '], ['', 'deploy --prod\n'], ['ok', '✓ application en ligne 🚀'],
];
const TERM_LEN = TERM.reduce((n, [, t]) => n + [...t].length, 0);
const typed = $('#typed'); let typedN = -1;
function typeTo(n) {
  if (n === typedN) return; typedN = n; let left = n, html = '';
  for (const [c, t] of TERM) { if (left <= 0) break; const s = [...t].slice(0, left).join(''); left -= [...t].length; html += c ? `<span class="${c}">${s}</span>` : s; }
  typed.innerHTML = html;
}

/* ---------- scène du hero ---------- */
const H = { title: $('.hero-title'), chaps: $$('.chap'), rail: $('.rail'), rails: $$('.rail li'), glow: $('.hero-glow'),
  off: $('.off'), crt: $('.crt'), term: $('.term'), app: $('#app'), blocks: $$('#app .b'), sticky: $('#hero .sticky') };
let mx = 0, my = 0, tmx = 0, tmy = 0;
function heroScene(p, t) {
  H.title.style.opacity = 1 - smooth(.02, .1, p);
  H.title.style.transform = `translateY(${-smooth(0, .12, p) * 80}px)`;
  hero3d.p = p;
  const ch = p < .04 ? -1 : p < .2 ? 0 : p < .31 ? 1 : p < .53 ? 2 : 3;
  H.chaps.forEach((c, i) => c.classList.toggle('on', i === ch && p < .86));
  H.rail.classList.toggle('on', p > .04 && p < .86);
  [[.04, .2], [.2, .31], [.31, .53], [.53, .82]].forEach(([a, b], i) => H.rails[i].style.setProperty('--f', clamp((p - a) / (b - a))));
  const power = smooth(.2, .28, p);
  H.glow.style.setProperty('--power', power);
  H.off.style.opacity = 1 - smooth(.21, .22, p);
  H.crt.style.opacity = p < .2 ? 0 : p < .26 ? 1 : 1 - smooth(.26, .31, p);
  H.crt.style.transform = `scale(${lerp(.2, 1, smooth(.23, .26, p))},${lerp(.004, 1, smooth(.21, .25, p))})`;
  H.term.style.opacity = smooth(.27, .31, p) * (1 - smooth(.52, .56, p));
  typeTo(Math.round(smooth(.31, .5, p) * TERM_LEN));
  H.app.style.opacity = smooth(.53, .56, p);
  H.blocks.forEach((b, i) => { const a = .55 + i * .03; b.classList.toggle('in', p > a); b.classList.toggle('skin', p > a + .05); });
  H.sticky.style.opacity = 1 - smooth(.95, 1, p);
}

/* ---------- autres scènes ---------- */
const track = $('#workTrack'), workIdx = $('#workIdx');
const ink = $('#ink'), tl = $('#timeline'), tlFill = $('#tlFill'), bar = $('#progress');
function scenes(t) {
  heroScene(progressOf($('#hero')), t);

  if (!isMobile()) {
    const wp = progressOf($('#work'));
    track.style.transform = `translateX(${-wp * Math.max(0, track.scrollWidth - innerWidth)}px)`;
    workIdx.textContent = String(Math.min(PROJECTS.length, 1 + Math.floor(wp * PROJECTS.length))).padStart(2, '0');
  }

  const ir = ink.getBoundingClientRect();
  ink.style.setProperty('--ink', clamp((innerHeight * .85 - ir.top) / (ir.height + innerHeight * .3)) * 100 + '%');
  const tr = tl.getBoundingClientRect();
  tlFill.style.transform = `scaleY(${clamp((innerHeight * .6 - tr.top) / tr.height)})`;
  bar.style.transform = `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight || 1)})`;
}

/* ================= DÉFILEMENT FLUIDE (molette) ================= */
let target = scrollY, cur = scrollY, gliding = false;
const maxScroll = () => document.documentElement.scrollHeight - innerHeight;
if (!reduced) {
  addEventListener('wheel', e => {
    if (e.ctrlKey || document.body.classList.contains('loading')) return;
    e.preventDefault();
    if (!gliding) { cur = target = scrollY; gliding = true; }
    target = clamp(target + e.deltaY * (e.deltaMode === 1 ? 40 : 1), 0, maxScroll());
  }, { passive: false });
  addEventListener('scroll', () => { if (!gliding) cur = target = scrollY; });
}
function glide() {
  if (!gliding) return;
  cur = lerp(cur, target, .09);
  if (Math.abs(target - cur) < .5) { cur = target; gliding = false; }
  scrollTo(0, cur);
}
// Ancres : on glisse jusqu'à la section
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const el = $(a.getAttribute('href')); if (!el) return;
  e.preventDefault();
  const y = a.getAttribute('href') === '#hero' ? 0 : el.getBoundingClientRect().top + scrollY;
  if (reduced) return scrollTo(0, y);
  if (!gliding) { cur = scrollY; gliding = true; } target = clamp(y, 0, maxScroll());
});

// Lien actif dans le menu
const navIO = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) $$('#top nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -45% 0px' });
$$('main > section').forEach(s => navIO.observe(s));

/* ================= CURSEUR, BOUTONS MAGNÉTIQUES, TILT ================= */
const cursor = $('#cursor'), dot = $('.c-dot'), ring = $('.c-ring');
let px = innerWidth / 2, py = innerHeight / 2, rx = px, ry = py;
const trail = [];
addEventListener('pointermove', e => {
  px = e.clientX; py = e.clientY;
  tmx = px / innerWidth * 2 - 1; tmy = py / innerHeight * 2 - 1;
  if (e.pointerType === 'mouse') trail.push({ x: px, y: py, life: 1 });
}, { passive: true });
if (finePointer && !reduced) document.body.classList.add('has-cursor');

function bindInteractive() {
  $$('.btn:not([data-bound])').forEach(b => {
    b.dataset.bound = 1;
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.setProperty('--x', e.clientX - r.left + 'px'); b.style.setProperty('--y', e.clientY - r.top + 'px'); });
  });
  if (!finePointer || reduced) return;
  $$('.magnetic:not([data-mag])').forEach(m => {
    m.dataset.mag = 1;
    m.addEventListener('pointermove', e => { const r = m.getBoundingClientRect(); m.style.translate = `${(e.clientX - r.left - r.width / 2) * .3}px ${(e.clientY - r.top - r.height / 2) * .4}px`; });
    m.addEventListener('pointerleave', () => (m.style.translate = ''));
  });
  $$('.card:not([data-tilt]), .tilt:not([data-tilt])').forEach(c => {
    c.dataset.tilt = 1;
    c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.setProperty('--rx', `${-y * 8}deg`); c.style.setProperty('--ry', `${x * 10}deg`);
      if (c.classList.contains('tilt')) c.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg)`; });
    c.addEventListener('pointerleave', () => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); c.style.transform = ''; });
  });
}
document.addEventListener('pointermove', e => {
  const s = e.target.closest?.('.skill'); if (s) { const r = s.getBoundingClientRect(); s.style.setProperty('--mx', e.clientX - r.left + 'px'); s.style.setProperty('--my', e.clientY - r.top + 'px'); }
  cursor.classList.toggle('hover', !!e.target.closest?.('a, button, .card, .chips span, input, textarea'));
}, { passive: true });

/* ================= EXPLOSIONS AU CLIC + TRAÎNÉE ================= */
const fx = $('#fx'), ctx = fx.getContext('2d');
const COLORS = ['#9b7bf0', '#6b3fc9', '#c9b6ff', '#ffffff', '#9a9aa8', '#3b1f7a'];
const parts = [], waves = [];
function explode(x, y, big) {
  const n = big ? 70 : 34;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, v = (big ? 5 : 3) + Math.random() * (big ? 11 : 7);
    parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.5, life: 1, decay: .012 + Math.random() * .02,
      size: 2 + Math.random() * (big ? 6 : 4), color: COLORS[i % COLORS.length], spark: Math.random() < .35, rot: Math.random() * 6 });
  }
  waves.push({ x, y, r: 4, life: 1, max: big ? 220 : 120 });
  if (big) waves.push({ x, y, r: 2, life: 1.3, max: 340 });
}
function sizeFx() { const d = Math.min(devicePixelRatio, 2); fx.width = innerWidth * d; fx.height = innerHeight * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
function drawFx() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.globalCompositeOperation = 'lighter';
  for (let i = waves.length; i--;) {
    const w = waves[i]; w.r += (w.max - w.r) * .12; w.life -= .035;
    if (w.life <= 0) { waves.splice(i, 1); continue; }
    ctx.strokeStyle = `rgba(155,123,240,${Math.min(1, w.life) * .8})`; ctx.lineWidth = 3 * w.life;
    ctx.beginPath(); ctx.arc(w.x, w.y, w.r, 0, 7); ctx.stroke();
    if (w.life > .75) { const g = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, w.r); g.addColorStop(0, `rgba(255,255,255,${(w.life - .75) * 2})`); g.addColorStop(1, 'rgba(107,63,201,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(w.x, w.y, w.r, 0, 7); ctx.fill(); }
  }
  for (let i = parts.length; i--;) {
    const p = parts[i]; p.vx *= .95; p.vy = p.vy * .95 + .18; p.x += p.vx; p.y += p.vy; p.life -= p.decay; p.rot += .2;
    if (p.life <= 0) { parts.splice(i, 1); continue; }
    ctx.globalAlpha = p.life; ctx.fillStyle = ctx.strokeStyle = p.color;
    if (p.spark) { ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3); ctx.stroke(); }
    else { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillRect(-p.size / 2, -p.size / 2, p.size * p.life, p.size * p.life); ctx.restore(); }
  }
  ctx.globalAlpha = 1;
  // traînée lumineuse du curseur
  for (let i = trail.length; i--;) { trail[i].life -= .06; if (trail[i].life <= 0) trail.splice(i, 1); }
  if (trail.length > 1) {
    for (let i = 1; i < trail.length; i++) {
      const a = trail[i - 1], b = trail[i];
      ctx.strokeStyle = `rgba(155,123,240,${b.life * .55})`; ctx.lineWidth = b.life * 6; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
  }
  ctx.globalCompositeOperation = 'source-over';
}
if (!reduced) addEventListener('pointerdown', e => {
  const btn = e.target.closest?.('.btn, .lang, button, a');
  explode(e.clientX, e.clientY, !!btn && (btn.dataset.boom === 'big' || btn.classList.contains('btn')));
  if (btn) { btn.classList.remove('boom'); void btn.offsetWidth; btn.classList.add('boom'); }
});

/* ================= FORMULAIRE → messagerie ================= */
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = f.get('subject') || (lang === 'en' ? 'Project from the portfolio' : 'Projet depuis le portfolio');
  const body = `${f.get('msg')}\n\n— ${f.get('name')} (${f.get('email')})`;
  location.href = `mailto:nathan.pichele8456@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

/* ================= BOUCLE PRINCIPALE ================= */
function frame(t) {
  glide();
  mx = lerp(mx, tmx, .06); my = lerp(my, tmy, .06);
  rx = lerp(rx, px, .18); ry = lerp(ry, py, .18);
  dot.style.transform = `translate(${px}px,${py}px)`; ring.style.transform = `translate(${rx}px,${ry}px)`;
  scenes(t);
  drawFx();
  requestAnimationFrame(frame);
}

/* ================= VERRE 3D (Three.js, moteur du skill premium-3d-glass) ================= */
async function initGlass() {
  const THREE = await import('three');
  const canvas = $('#gl');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, .1, 100); camera.position.z = 12;

  // Fond : gris très sombre et halos violets (c'est lui que le verre réfracte)
  const bg = document.createElement('canvas'); bg.width = 1024; bg.height = 1024;
  const g = bg.getContext('2d'); g.fillStyle = '#14131a'; g.fillRect(0, 0, 1024, 1024);
  [[260, 300, 420, 'rgba(107,63,201,.6)'], [800, 760, 460, 'rgba(80,45,160,.65)'], [820, 200, 260, 'rgba(155,123,240,.35)'], [520, 520, 200, 'rgba(201,182,255,.18)'], [200, 860, 300, 'rgba(90,90,110,.25)']]
    .forEach(([x, y, r, c]) => { const rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, c); rg.addColorStop(1, 'rgba(20,19,26,0)'); g.fillStyle = rg; g.fillRect(0, 0, 1024, 1024); });
  const bgTex = new THREE.CanvasTexture(bg); bgTex.colorSpace = THREE.SRGBColorSpace;
  scene.background = bgTex;

  scene.environment = makeStudio(THREE, renderer);

  const glass = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: .03, transmission: 1, thickness: .8, ior: 1.46,
    iridescence: .7, iridescenceIOR: 1.3, clearcoat: 1, clearcoatRoughness: .05, attenuationColor: new THREE.Color('#b9a2ff'), attenuationDistance: 5, envMapIntensity: 3.2, specularIntensity: 1, emissive: new THREE.Color('#3a1d86'), emissiveIntensity: .55 });
  // Objets du métier en verre : balise de code, nuage, engrenage, base de données, curseur, étincelle (IA)
  const { SVGLoader } = await import('./assets/vendor/jsm/loaders/SVGLoader.js');
  const icon = async name => {
    const data = await new SVGLoader().loadAsync(`assets/shapes/${name}.svg`);
    const geo = new THREE.ExtrudeGeometry(data.paths.flatMap(p => SVGLoader.createShapes(p)),
      { depth: 150, bevelEnabled: true, bevelThickness: 28, bevelSize: 16, bevelSegments: 5, curveSegments: 8 });
    geo.center(); geo.rotateX(Math.PI); // le SVG a l'axe Y vers le bas
    geo.computeBoundingBox(); const sz = geo.boundingBox.getSize(new THREE.Vector3());
    geo.scale(...Array(3).fill(2 / Math.max(sz.x, sz.y)));
    return new THREE.Mesh(geo, glass);
  };
  const database = () => {
    const g = new THREE.Group();
    for (let i = 0; i < 3; i++) { const d = new THREE.Mesh(new THREE.CylinderGeometry(.75, .75, .42, 64), glass); d.position.y = (i - 1) * .55; g.add(d); }
    return g;
  };
  const objs = await Promise.all(['cloud', 'code', 'gear', 'cursor', 'spark'].map(icon));
  objs.splice(3, 0, database());
  const shapes = objs.map((m, i) => {
    const pos = [[-7.2, 3.4, -3], [6.4, -2.4, -2], [5.8, 3.2, -4], [-5.4, -3.2, -1.5], [-1.2, 4.4, -5], [2, -4.6, -3]][i];
    m.position.set(...pos); m.scale.setScalar([1, 1.35, 1, 1, .8, .8][i]);
    m.userData = { base: new THREE.Vector3(...pos), seed: i * 1.7 }; scene.add(m); return m;
  });

  const resize = () => { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.fov = innerWidth < 700 ? 60 : 40; camera.updateProjectionMatrix(); };
  resize(); addEventListener('resize', resize);

  const loop = t => {
    const sp = scrollY / innerHeight, s = t / 1000;
    shapes.forEach((m, i) => {
      const u = m.userData;
      m.position.set(u.base.x + Math.sin(s * .5 + u.seed) * .3, u.base.y + Math.cos(s * .6 + u.seed) * .35 + Math.sin(sp * .5 + u.seed) * 1.5, u.base.z);
      m.rotation.y = s * .35 + u.seed + sp * .25; m.rotation.x = Math.sin(s * .4 + u.seed) * .35; m.rotation.z = Math.cos(s * .3 + u.seed) * .15;
    });
    camera.position.x = lerp(camera.position.x, mx * .8, .05); camera.position.y = lerp(camera.position.y, -my * .5, .05); camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    if (!reduced) requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* ================= DÉMARRAGE ================= */
function layout() { sizePins(); sizeFx(); }
addEventListener('resize', layout);
setLang(lang);
layout();
requestAnimationFrame(frame);

async function boot() {
  const fill = $('.boot-bar i'), loader = $('#loader');
  document.body.classList.add('loading');
  const loaded = new Promise(r => (document.readyState === 'complete' ? r() : addEventListener('load', r)));
  requestAnimationFrame(() => (fill.style.width = '70%'));
  await loaded;
  await hero3dReady;
  fill.style.width = '100%';
  await new Promise(r => setTimeout(r, reduced ? 0 : 350));
  loader.classList.add('done'); document.body.classList.remove('loading'); document.body.classList.add('ready');
  setTimeout(() => loader.classList.add('gone'), 1400);
  initGlass().catch(err => console.warn('WebGL indisponible :', err));
}
history.scrollRestoration = 'manual'; scrollTo(0, 0);
// Le modèle 3D se charge pendant l'écran de démarrage ; sans WebGL, l'écran s'affiche à plat.
const hero3dReady = initHero3D().catch(err => { console.warn('Ordinateur 3D indisponible :', err); $('#stage3d').classList.add('flat'); });
boot();
