// app.js — Application logic for Advanced TypeScript Learning Guide
import { topics, quickRefResources, introContent } from './data.js';

// === Constants ===
const COPY_RESET_MS = 2000;
const STORAGE_KEY_COMPLETION = 'ts-guide-completion';
const STORAGE_KEY_THEME = 'theme';
const TOTAL_TOPICS = topics.length;

const ICON_COPY = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`;
const ICON_CHECK = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;

// === Helpers ===
function escapeForPre(code) {
  return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function playgroundURL(code) {
  return `https://www.typescriptlang.org/play?#code/${btoa(unescape(encodeURIComponent(code)))}`;
}

function getCompletion() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_COMPLETION) || '{}');
  } catch { return {}; }
}

function saveCompletion(data) {
  localStorage.setItem(STORAGE_KEY_COMPLETION, JSON.stringify(data));
}

// === Template Rendering ===
function renderTOCItem(topic) {
  const completion = getCompletion();
  const checked = completion[topic.anchor] ? 'checked' : '';
  return `<li class="toc__item">
    <input type="checkbox" class="toc__checkbox" data-topic="${topic.anchor}" ${checked} aria-label="Mark ${topic.title} as complete">
    <a href="#${topic.anchor}" class="toc__link" data-toc-link="${topic.anchor}">
      <span class="toc__num">${topic.id}</span>
      <span>${topic.title}</span>
    </a>
  </li>`;
}

function renderTopic(topic) {
  const completion = getCompletion();
  const checked = completion[topic.anchor] ? 'checked' : '';
  const diffBadge = topic.diffClass ? `badge ${topic.diffClass}` : 'badge';

  const resourcesHTML = topic.resources.map(r =>
    `<li><a href="${r.url}">${r.title}</a><span class="desc">${r.description}</span></li>`
  ).join('');

  const exercisesHTML = topic.exercises.map(ex =>
    `<li><a href="${ex.url}">${ex.title}</a><span class="ex-diff ${ex.diffClass}">${ex.difficulty}</span><span class="ex-src">${ex.source}</span></li>`
  ).join('');

  const hintsHTML = topic.hints.map((hint, i) => {
    const popoverId = `hint-${topic.anchor}-${i}`;
    return `<button popovertarget="${popoverId}" class="hint-btn">Show Hint ${i + 1}</button>
    <div id="${popoverId}" popover>${hint}</div>`;
  }).join('');

  const conceptsHTML = topic.keyConcepts.map(c => `<li>${c}</li>`).join('');

  return `<article class="topic" id="${topic.anchor}">
    <h2>
      <input type="checkbox" class="topic__completion" data-topic="${topic.anchor}" ${checked} aria-label="Mark as complete">
      ${topic.id}. ${topic.title}
    </h2>
    <div class="meta">
      <span><strong>Difficulty:</strong> <span class="${diffBadge}">${topic.difficulty}</span></span>
      <span><strong>Prerequisites:</strong> ${topic.prerequisites}</span>
    </div>
    <h3>Overview</h3>
    <p>${topic.overview}</p>
    <h3>Key Concepts</h3>
    <ul>${conceptsHTML}</ul>
    <h3>Code Example</h3>
    <div class="code-wrapper">
      <div class="code-actions">
        <button class="copy-btn" data-code="${topic.anchor}" title="Copy to clipboard">${ICON_COPY}<span>Copy</span></button>
        <a href="${playgroundURL(topic.code)}" target="_blank" rel="noopener" class="playground-btn" title="Open in TypeScript Playground">Playground</a>
        <button class="editor-btn" data-editor="${topic.anchor}" title="Edit in browser">Edit</button>
      </div>
      <pre class="language-typescript"><code class="language-typescript">${escapeForPre(topic.code)}</code></pre>
    </div>
    <div class="resources"><h4>Learning Resources</h4><ul class="res-list">${resourcesHTML}</ul></div>
    <div class="exercises">
      <h4>Hands-On Exercises</h4>
      <ul>${exercisesHTML}</ul>
      ${hintsHTML}
    </div>
  </article>`;
}

function renderQuickRefItem(item) {
  return `<li>
    <span class="qr-icon">${item.icon}</span>
    <div>
      <a href="${item.url}"><span class="qr-title">${item.title}</span></a>
      <span class="qr-desc">${item.description}</span>
    </div>
  </li>`;
}

function renderIntro(content) {
  const stepsHTML = content.steps.map(s => `<li>${s}</li>`).join('');
  return `<h2>Introduction</h2>
    <p>${content.text}</p>
    <h3>${content.howToUseTitle}</h3>
    <ol>${stepsHTML}</ol>`;
}

// === Copy to Clipboard (Event Delegation) ===
function setupCopyButtons() {
  const container = document.getElementById('topics-container');
  container.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;

    const anchor = btn.dataset.code;
    const topic = topics.find(t => t.anchor === anchor);
    if (!topic) return;

    let success = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(topic.code);
        success = true;
      }
    } catch { /* fallback below */ }

    if (!success) {
      const textarea = document.createElement('textarea');
      textarea.value = topic.code;
      textarea.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try { success = document.execCommand('copy'); } catch { /* noop */ }
      document.body.removeChild(textarea);
    }

    if (success) {
      btn.innerHTML = `${ICON_CHECK}<span>Copied!</span>`;
      btn.classList.add('copied');
    } else {
      btn.innerHTML = '<span>Failed</span>';
    }

    setTimeout(() => {
      btn.innerHTML = `${ICON_COPY}<span>Copy</span>`;
      btn.classList.remove('copied');
    }, COPY_RESET_MS);
  });
}

// === Lazy-Loaded Monaco Editor ===
let monacoReady = null;

function loadMonaco() {
  if (monacoReady) return monacoReady;
  monacoReady = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js';
    script.onload = () => {
      window.require.config({
        paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }
      });
      window.require(['vs/editor/editor.main'], () => resolve(window.monaco));
    };
    document.head.appendChild(script);
  });
  return monacoReady;
}

let editorInstance = null;

async function openEditor(code, title) {
  const monaco = await loadMonaco();
  const dialog = document.getElementById('editor-modal');
  const container = document.getElementById('editor-container');
  const titleEl = document.getElementById('editor-title');

  titleEl.textContent = title;

  if (editorInstance) {
    editorInstance.setValue(code);
  } else {
    editorInstance = monaco.editor.create(container, {
      value: code,
      language: 'typescript',
      theme: document.documentElement.dataset.theme === 'dark' ? 'vs-dark' : 'vs',
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'on',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      padding: { top: 16 }
    });
  }

  dialog.showModal();
}

function setupEditorButtons() {
  const container = document.getElementById('topics-container');
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.editor-btn');
    if (!btn) return;

    const anchor = btn.dataset.editor;
    const topic = topics.find(t => t.anchor === anchor);
    if (!topic) return;

    openEditor(topic.code, topic.title);
  });

  // Close on backdrop click
  const dialog = document.getElementById('editor-modal');
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
}

// === Fuzzy Search (Fuse.js) ===
let fuseInstance = null;

async function initSearch() {
  const Fuse = (await import('fuse')).default;
  const searchData = topics.map(t => ({
    id: t.id,
    anchor: t.anchor,
    title: t.title,
    overview: t.overview.replace(/<[^>]+>/g, ''),
    keyConcepts: t.keyConcepts.join(' ').replace(/<[^>]+>/g, ''),
    prerequisites: t.prerequisites
  }));

  fuseInstance = new Fuse(searchData, {
    keys: [
      { name: 'title', weight: 3 },
      { name: 'overview', weight: 1 },
      { name: 'keyConcepts', weight: 2 },
      { name: 'prerequisites', weight: 1 }
    ],
    threshold: 0.4,
    includeMatches: true
  });
}

function setupSearch() {
  const input = document.getElementById('search-input');
  input.addEventListener('input', () => {
    const query = input.value.trim();
    const allTopics = document.querySelectorAll('.topic');
    const allTocItems = document.querySelectorAll('.toc__item');

    if (!query || !fuseInstance) {
      allTopics.forEach(el => el.style.display = '');
      allTocItems.forEach(el => el.style.display = '');
      return;
    }

    const results = fuseInstance.search(query);
    const matchedAnchors = new Set(results.map(r => r.item.anchor));

    allTopics.forEach(el => {
      el.style.display = matchedAnchors.has(el.id) ? '' : 'none';
    });
    allTocItems.forEach(el => {
      const checkbox = el.querySelector('.toc__checkbox');
      el.style.display = matchedAnchors.has(checkbox?.dataset.topic) ? '' : 'none';
    });
  });
}

// === Scrollspy (IntersectionObserver) ===
function setupScrollspy() {
  const topicEls = document.querySelectorAll('.topic');
  const tocLinks = document.querySelectorAll('.toc__link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.toc__link[data-toc-link="${id}"]`);
      if (entry.isIntersecting) {
        tocLinks.forEach(l => l.classList.remove('active'));
        link?.classList.add('active');
      }
    });
  }, { rootMargin: '-10% 0px -80% 0px' });

  topicEls.forEach(el => observer.observe(el));
}

// === Completion Tracking ===
function updateProgressDisplay() {
  const completion = getCompletion();
  const completed = Object.values(completion).filter(Boolean).length;
  const fill = document.querySelector('.progress-bar__fill');
  const text = document.querySelector('.progress-text');

  if (fill) fill.style.width = `${(completed / TOTAL_TOPICS) * 100}%`;
  if (text) text.textContent = `${completed}/${TOTAL_TOPICS} topics completed`;

  // Celebration when all complete
  if (completed === TOTAL_TOPICS) {
    celebrateCompletion();
  }
}

async function celebrateCompletion() {
  try {
    const { default: confetti } = await import('https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.module.mjs');
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  } catch { /* confetti is optional */ }
}

function setupCompletionTracking() {
  // Sync all checkboxes for same topic
  document.addEventListener('change', (e) => {
    const checkbox = e.target.closest('[data-topic]');
    if (!checkbox || (checkbox.type !== 'checkbox')) return;

    const anchor = checkbox.dataset.topic;
    const completion = getCompletion();
    completion[anchor] = checkbox.checked;
    saveCompletion(completion);

    // Sync sibling checkboxes
    document.querySelectorAll(`[data-topic="${anchor}"]`).forEach(cb => {
      if (cb !== checkbox && cb.type === 'checkbox') cb.checked = checkbox.checked;
    });

    updateProgressDisplay();
  });

  updateProgressDisplay();
}

// === Theme Toggle ===
function setupThemeToggle() {
  const btn = document.querySelector('.theme-toggle');
  const update = () => {
    const theme = document.documentElement.dataset.theme;
    btn.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  };

  btn.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem(STORAGE_KEY_THEME, next);
    update();

    // Update Monaco theme if editor exists
    if (editorInstance && window.monaco) {
      window.monaco.editor.setTheme(next === 'dark' ? 'vs-dark' : 'vs');
    }
  });

  update();
}

// === Keyboard Navigation ===
function setupKeyboardNav() {
  let currentIndex = -1;
  const getTopicEls = () => [...document.querySelectorAll('.topic')].filter(el => el.style.display !== 'none');

  document.addEventListener('keydown', (e) => {
    // Don't capture when typing in input/textarea or inside dialog
    if (e.target.matches('input, textarea') || document.querySelector('dialog[open]')) return;

    switch (e.key) {
      case 'j': {
        const els = getTopicEls();
        currentIndex = Math.min(currentIndex + 1, els.length - 1);
        els[currentIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
      case 'k': {
        const els = getTopicEls();
        currentIndex = Math.max(currentIndex - 1, 0);
        els[currentIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
      case 't': {
        document.querySelector('.toc')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
      case '/': {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
        break;
      }
      case 'Escape': {
        const dialog = document.getElementById('editor-modal');
        if (dialog?.open) dialog.close();
        document.getElementById('search-input')?.blur();
        break;
      }
    }
  });
}

// === Reading progress fallback for browsers without scroll-timeline ===
function setupProgressBarFallback() {
  if (CSS.supports('animation-timeline: scroll()')) return;

  const bar = document.querySelector('.reading-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? scrolled / total : 0;
    bar.style.transform = `scaleX(${progress})`;
  }, { passive: true });
}

// === Render All ===
function renderTOC() {
  const list = document.getElementById('toc-list');
  list.innerHTML = topics.map(renderTOCItem).join('');
}

function renderIntroSection() {
  const section = document.getElementById('intro');
  section.innerHTML = renderIntro(introContent);
}

function renderTopics() {
  const container = document.getElementById('topics-container');
  container.innerHTML = topics.map(renderTopic).join('');
}

function renderQuickRef() {
  const list = document.getElementById('quick-ref-list');
  list.innerHTML = quickRefResources.map(renderQuickRefItem).join('');
}

// === Init ===
function init() {
  renderTOC();
  renderIntroSection();
  renderTopics();
  renderQuickRef();
  setupCopyButtons();
  setupEditorButtons();
  setupScrollspy();
  setupSearch();
  setupCompletionTracking();
  setupKeyboardNav();
  setupThemeToggle();
  setupProgressBarFallback();

  // Initialize search index
  initSearch();

  // Syntax highlighting after DOM is populated
  if (window.Prism) {
    Prism.highlightAll();
  }
}

init();
