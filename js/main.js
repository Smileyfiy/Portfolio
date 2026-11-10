/* Renders the portfolio from js/data.js and wires up the interactions. */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const esc = (str = "") =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const slug = (str) => str.toLowerCase().replace(/[^a-z]+/g, "-");
  const initials = (str) =>
    str
      .split(/\s+/)
      .filter((w) => /^[A-Z]/.test(w))
      .slice(0, 2)
      .map((w) => w[0])
      .join("");

  const STATUS_LABEL = { completed: "Completed", "in-progress": "In progress", planned: "Planned", earned: "Earned" };

  const tags = (list = []) => (list.length ? `<ul class="tags">${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : "");
  const badge = (status) => `<span class="badge badge-${status}">${STATUS_LABEL[status]}</span>`;
  const points = (list = []) => (list.length ? `<ul class="points">${list.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : "");

  const ICONS = {
    github:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13zm2 .9v.3l8 5.3 8-5.3v-.3H4zm16 2.7-8 5.3-8-5.3V18h16V9.1z"/></svg>',
    cv: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 3h2v10.17l3.59-3.58L18 11l-6 6-6-6 1.41-1.41L11 13.17V3zM5 19h14v2H5z"/></svg>',
    clip: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5l-8.6 8.6a5 5 0 0 1-7.1-7.1l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9"/></svg>',
  };

  const linkBtn = (href, label, icon, extra = "") =>
    `<a class="btn glass" href="${esc(href)}" ${extra}>${icon ? ICONS[icon] : ""}${esc(label)}</a>`;
  const external = 'target="_blank" rel="noopener noreferrer"';

  /* ---------- Supporting media ---------- */
  const isImage = (src) => /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(src);
  const extOf = (src) => (src.split(".").pop() || "file").toUpperCase();
  const fileName = (src) => decodeURIComponent(src.split("/").pop());

  // key -> [{ src, caption }] — the images for each card, used by the lightbox
  const imageSets = new Map();
  const galleryImages = [];

  const registerMedia = (key, media = [], label) => {
    const images = media.filter((m) => isImage(m.src)).map((m) => ({ src: m.src, caption: m.caption || label }));
    imageSets.set(key, images);
    galleryImages.push(...images.map((img) => ({ ...img, caption: img.caption === label ? label : `${img.caption} — ${label}` })));
  };

  const mediaSection = (key, media = []) => {
    if (!media.length) return "";
    const images = imageSets.get(key);
    const docs = media.filter((m) => !isImage(m.src));
    return `<h3>Supporting documents &amp; photos</h3>
      ${
        images.length
          ? `<div class="thumbs">${images
              .map(
                (img, i) =>
                  `<button type="button" class="thumb" data-lightbox="${key}" data-index="${i}" aria-label="View ${esc(img.caption)}"><img src="${esc(img.src)}" alt="" loading="lazy" /></button>`
              )
              .join("")}</div>`
          : ""
      }
      ${
        docs.length
          ? `<ul class="docs">${docs
              .map(
                (d) =>
                  `<li><a class="doc-link" href="${esc(d.src)}" ${external}><span class="ext">${esc(extOf(d.src))}</span>${esc(d.caption || fileName(d.src))}</a></li>`
              )
              .join("")}</ul>`
          : ""
      }`;
  };

  /* ---------- Profile ---------- */
  $$("[data-bind]").forEach((el) => (el.textContent = PROFILE[el.dataset.bind]));
  $("#focus-list").innerHTML = PROFILE.focus.map((f) => `<li>${esc(f)}</li>`).join("");
  $("#year").textContent = new Date().getFullYear();

  if (PROFILE.photo) {
    const photo = $("#hero-photo");
    photo.alt = `Portrait of ${PROFILE.name}`;
    photo.addEventListener("load", () => {
      photo.hidden = false;
      $("#hero-mark").classList.add("has-photo");
    });
    photo.src = PROFILE.photo; // a missing file simply leaves the jh&n mark in place
  }

  const { github, linkedin, email, cv } = PROFILE.links;
  $("#contact-links").innerHTML = [
    email && linkBtn(`mailto:${email}`, "Email", "email"),
    github && linkBtn(github, "GitHub", "github", external),
    linkedin && linkBtn(linkedin, "LinkedIn", "linkedin", external),
    cv && linkBtn(cv, "Download CV", "cv", "download"),
  ]
    .filter(Boolean)
    .join("");

  /* ---------- Cards ---------- */
  // Each renderer stores the modal HTML in `details` and returns the card face.
  const details = new Map();

  const cardShell = (key, inner, media = [], attrs = "") => {
    const cover = imageSets.get(key)[0];
    return `<button type="button" class="card glass reveal" data-detail="${key}" aria-haspopup="dialog" ${attrs}>
      ${cover ? `<img class="card-cover" src="${esc(cover.src)}" alt="" loading="lazy" />` : ""}
      ${inner}
      <span class="card-foot">
        <span class="card-more">View details</span>
        ${media.length ? `<span class="attach-count" title="Supporting files">${ICONS.clip}${media.length}</span>` : ""}
      </span>
    </button>`;
  };

  const renderExperience = (job) => {
    registerMedia(job.id, job.media, `${job.role}, ${job.org}`);
    details.set(
      job.id,
      `<p class="eyebrow">${esc(job.type)}</p>
       <h2 id="modal-title">${esc(job.role)} · ${esc(job.org)}</h2>
       ${job.dates ? `<p class="card-meta">${esc(job.dates)}</p>` : ""}
       <p>${esc(job.summary)}</p>
       <h3>What I worked on</h3>${points(job.points)}
       <h3>Tools &amp; technologies</h3>${tags(job.stack)}
       ${mediaSection(job.id, job.media)}
       <p class="note">Team contributions — described at a level that respects confidentiality.</p>`
    );
    return cardShell(
      job.id,
      `<div class="card-top">
         <div><h3>${esc(job.org)}</h3><p class="card-sub">${esc(job.role)}</p></div>
         <span class="monogram" aria-hidden="true">${esc(initials(job.org))}</span>
       </div>
       <p class="card-meta">${esc([job.type, job.dates].filter(Boolean).join(" · "))}</p>
       <p class="card-text">${esc(job.summary)}</p>
       ${tags(job.stack.slice(0, 4))}`,
      job.media
    );
  };

  const renderProject = (p) => {
    registerMedia(p.id, p.media, p.title);
    const links = [
      p.repo && linkBtn(p.repo, "View code", "github", external),
      p.demo && linkBtn(p.demo, "Live demo", "", external),
    ].filter(Boolean);
    details.set(
      p.id,
      `${badge(p.status)}
       <h2 id="modal-title" style="margin-top:14px">${esc(p.title)}</h2>
       ${p.dates ? `<p class="card-meta">${esc(p.dates)}</p>` : ""}
       <p>${esc(p.summary)}</p>
       ${p.problem ? `<h3>The problem</h3><p>${esc(p.problem)}</p>` : ""}
       ${p.features.length ? `<h3>${p.status === "planned" ? "Planned scope" : "Key features"}</h3>${points(p.features)}` : ""}
       <h3>Stack</h3>${tags(p.stack)}
       ${mediaSection(p.id, p.media)}
       ${links.length ? `<div class="modal-links">${links.join("")}</div>` : ""}
       ${p.status === "planned" ? '<p class="note">This project is planned — it is not yet built. Follow along on GitHub.</p>' : ""}`
    );
    return cardShell(
      p.id,
      `<div class="card-top"><h3>${esc(p.title)}</h3>${badge(p.status)}</div>
       ${p.dates ? `<p class="card-meta">${esc(p.dates)}</p>` : ""}
       <p class="card-text">${esc(p.summary)}</p>
       ${tags(p.stack.slice(0, 4))}`,
      p.media,
      `data-status="${p.status}"`
    );
  };

  const renderEducation = (e) => {
    registerMedia(e.id, e.media, e.school);
    details.set(
      e.id,
      `<p class="eyebrow">${esc(e.dates)}</p>
       <h2 id="modal-title">${esc(e.school)}</h2>
       <p class="card-sub">${esc(e.award)}</p>
       <p>${esc(e.summary)}</p>
       ${e.highlights.length ? `<h3>Highlights</h3>${points(e.highlights)}` : ""}
       ${mediaSection(e.id, e.media)}`
    );
    return cardShell(
      e.id,
      `<div class="card-top">
         <div><h3>${esc(e.school)}</h3><p class="card-sub">${esc(e.award)}</p></div>
         <span class="monogram" aria-hidden="true">${esc(initials(e.school))}</span>
       </div>
       <p class="card-meta">${esc(e.dates)}</p>
       <p class="card-text">${esc(e.summary)}</p>`,
      e.media
    );
  };

  const renderCredential = (c, i) => {
    const key = `cred-${i}`;
    const kind = c.kind === "certification" ? "Certification" : "Milestone";
    registerMedia(key, c.media, c.title);
    details.set(
      key,
      `<p class="eyebrow">${kind}</p>
       <h2 id="modal-title">${esc(c.title)}</h2>
       <p class="card-sub">${esc([c.issuer, c.date].filter(Boolean).join(" · "))}</p>
       <p>${esc(c.detail)}</p>
       ${mediaSection(key, c.media)}
       ${c.link ? `<div class="modal-links">${linkBtn(c.link, "Verify credential", "", external)}</div>` : ""}`
    );
    return cardShell(
      key,
      `<div class="card-top">
         <span class="card-meta">${kind}</span>
         ${badge(c.status)}
       </div>
       <h3>${esc(c.title)}</h3>
       <p class="card-meta">${esc([c.issuer, c.date].filter(Boolean).join(" · "))}</p>`,
      c.media
    );
  };

  const renderSkillGroup = (g) =>
    `<article class="card glass reveal">
       <h3>${esc(g.group)}</h3>
       <ul class="skill-list">${g.items
         .map(
           (s) =>
             `<li><span class="dot lvl-${slug(s.level)}" aria-hidden="true"></span>${esc(s.name)}<span class="lvl">${esc(s.level)}</span></li>`
         )
         .join("")}</ul>
     </article>`;

  const renderBeyond = (b) =>
    `<article class="card glass reveal"><h3>${esc(b.title)}</h3><p class="card-text">${esc(b.text)}</p></article>`;

  $("#experience-grid").innerHTML = EXPERIENCE.map(renderExperience).join("");
  $("#project-grid").innerHTML = PROJECTS.filter((p) => p.publish).map(renderProject).join("");
  $("#education-grid").innerHTML = EDUCATION.map(renderEducation).join("");
  $("#credential-grid").innerHTML = CREDENTIALS.map(renderCredential).join("");
  $("#skill-grid").innerHTML = SKILLS.map(renderSkillGroup).join("");
  $("#beyond-grid").innerHTML = BEYOND.map(renderBeyond).join("");

  /* ---------- Gallery (only shown once there are images) ---------- */
  if (galleryImages.length) {
    imageSets.set("gallery", galleryImages);
    $("#gallery-grid").innerHTML = galleryImages
      .map(
        (img, i) =>
          `<button type="button" class="gallery-item glass reveal" data-lightbox="gallery" data-index="${i}">
             <img src="${esc(img.src)}" alt="" loading="lazy" /><span>${esc(img.caption)}</span>
           </button>`
      )
      .join("");
    $("#gallery").hidden = false;
    $('.nav-links a[href="#gallery"]').parentElement.hidden = false;
  }

  /* ---------- Modal ---------- */
  const modal = $("#modal");
  const modalBody = $("#modal-body");
  let opener = null;

  /* ---------- Lightbox ---------- */
  const lightbox = $("#lightbox");
  const lbImg = $("#lb-img");
  const lbCaption = $("#lb-caption");
  let lbSet = [];
  let lbIndex = 0;

  const showImage = (i) => {
    lbIndex = (i + lbSet.length) % lbSet.length;
    lbImg.src = lbSet[lbIndex].src;
    lbImg.alt = lbSet[lbIndex].caption;
    lbCaption.textContent = lbSet.length > 1 ? `${lbSet[lbIndex].caption} (${lbIndex + 1}/${lbSet.length})` : lbSet[lbIndex].caption;
  };
  const openLightbox = (key, index) => {
    lbSet = imageSets.get(key);
    $$(".lb-prev, .lb-next", lightbox).forEach((b) => (b.hidden = lbSet.length < 2));
    showImage(index);
    lightbox.showModal();
  };
  $(".lb-close").addEventListener("click", () => lightbox.close());
  $(".lb-prev").addEventListener("click", () => showImage(lbIndex - 1));
  $(".lb-next").addEventListener("click", () => showImage(lbIndex + 1));
  lightbox.addEventListener("click", (e) => e.target === lightbox && lightbox.close());
  lightbox.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") showImage(lbIndex - 1);
    if (e.key === "ArrowRight") showImage(lbIndex + 1);
  });

  document.addEventListener("click", (e) => {
    const thumb = e.target.closest("[data-lightbox]");
    if (thumb) return openLightbox(thumb.dataset.lightbox, Number(thumb.dataset.index));

    const card = e.target.closest("[data-detail]");
    if (!card) return;
    opener = card;
    modalBody.innerHTML = details.get(card.dataset.detail);
    modal.showModal();
    modal.scrollTop = 0;
  });
  $(".modal-close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => e.target === modal && modal.close()); // backdrop click
  modal.addEventListener("close", () => opener && opener.focus());

  /* ---------- Project filters ---------- */
  $$(".filter").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$(".filter").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", b === btn);
      });
      const f = btn.dataset.filter;
      $$("#project-grid .card").forEach((c) => c.classList.toggle("is-hidden", f !== "all" && c.dataset.status !== f));
    })
  );

  /* ---------- Tilt + glare ---------- */
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!reduceMotion && finePointer) {
    $$(".card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
        card.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealer.unobserve(entry.target);
        // drop the stagger once revealed so it doesn't delay the hover tilt
        setTimeout(() => (entry.target.style.transitionDelay = ""), 900);
      }),
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    revealer.observe(el);
  });

  /* ---------- Active nav link ---------- */
  const navLinks = $$(".nav-links a");
  const spy = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle("is-active", a.hash === `#${entry.target.id}`));
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((s) => spy.observe(s));

  /* ---------- Theme ---------- */
  // initial theme is set by the inline script in <head>
  const root = document.documentElement;
  $(".theme-toggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch {}
  });
})();
