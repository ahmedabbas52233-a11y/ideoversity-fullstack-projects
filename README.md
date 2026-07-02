# Ideoversity Full-Stack Projects

A collection of **12 front-end projects** built during the Ideoversity Full-Stack Development Course (2026). Each project demonstrates practical skills in HTML, CSS, and JavaScript — from responsive layouts and UI cloning to interactive logic, animations, and accessibility compliance.

These projects were originally single-file assignments. They have since been **refactored into production-ready folder structures** with separated HTML/CSS/JS files, cross-browser fixes, and resolved accessibility errors.

---

## 👤 About

- 🎓 **Course:** Ideoversity Full-Stack Program (2026)
- 💻 **Focus:** HTML, CSS, JavaScript fundamentals
- 🔧 **Debugging:** Microsoft Edge DevTools, axe accessibility auditor
- 📁 **Refactoring:** Externalized all CSS/JS, fixed cross-browser issues

---

## 📂 Projects

| # | Project | Live Demo | What It Demonstrates | Key Features |
|---|---------|-----------|----------------------|--------------|
| 1 | **Baroque Fashion Landing** | [View Live](https://ahmedabbas52233-a11y.github.io/ideoversity-fullstack-projects/Baroque/) | Luxury e-commerce homepage | Sticky header, hover animations, newsletter popup with `localStorage`, responsive breakpoints |
| 2 | **Calculator** | [View Live](https://ahmedabbas52233-a11y.github.io/ideoversity-fullstack-projects/Calculator/) | JavaScript logic & precision | Keyboard support, operation chaining, divide-by-zero guard, floating-point fix (`0.1 + 0.2 = 0.3`) |
| 3 | **ChatBot** | [View Live](https://ahmedabbas52233-a11y.github.io/ideoversity-fullstack-projects/ChatBot/) | DOM manipulation & layout | Dual-panel chat, proper message alignment (sender vs receiver), auto-scroll |
| 4 | **Analog-Digital Clock** | [View Live](https://ahmedabbas52233-a11y.github.io/ideoversity-fullstack-projects/Clock/) | Real-time JS & CSS transforms | Millisecond-precision analog hands, blinking colon, full date formatting |
| 5 | **Education Website** | [View Live](https://ahmedabbas52233-a11y.github.io/ideoversity-fullstack-projects/Education-website/) | Classic 3-column layout | Warm palette, newsletter form, responsive media queries |
| 6 | **Facebook Signup Clone** | [View Live](https://ahmedabbas52233-a11y.github.io/ideoversity-fullstack-projects/Facebook-signup-clone/) | Pixel-perfect UI replication | Form validation, accessible dropdowns, exact color matching |
| 7 | **Photo Frame** | [View Live](https://ahmedabbas52233-a11y.github.io/ideoversity-fullstack-projects/photo-frame/) | CSS box-shadow artistry | Layered inset shadows, aspect-ratio control, placeholder integration |
| 8 | **GCU Lahore Portal** | [View Live](https://ahmedabbas52233-a11y.github.io/ideoversity-fullstack-projects/GCU-lahore/) | Institutional website structure | Contact form, location info, classic academic aesthetic |
| 9 | **Invoice Template** | [View Live](https://ahmedabbas52233-a11y.github.io/ideoversity-fullstack-projects/Invoice-template/) | Print-ready document design | Table-based layout, `@media print` styles, professional typography |
| 10 | **Junaid Jamshed Product Page** | [View Live](https://ahmedabbas52233-a11y.github.io/ideoversity-fullstack-projects/junaid-jamshed-product-page/) | Complex e-commerce patterns | Image zoom lens, thumbnail gallery, accordion, size selector, quantity controls |
| 11 | **Sky Day-to-Night** | [View Live](https://ahmedabbas52233-a11y.github.io/ideoversity-fullstack-projects/sky-day-to-night/) | CSS animations & atmosphere | Randomized star generation, smooth gradient transitions, interactive slider |
| 12 | **Tic-Tac-Toe** | [View Live](https://ahmedabbas52233-a11y.github.io/ideoversity-fullstack-projects/tic-tac-toe/) | Game logic & state management | Win detection (8 combinations), draw handling, score tracking, winning line highlight |

> **Note:** Click any "View Live" link to see the project running in your browser. Each project is self-contained — no build step required.

---

## 🏆 Ranked by Portfolio Value

| Rank | Project | Why It Stands Out |
|------|---------|-------------------|
| 01 | **J. Product Page** | Most complex, real-world e-commerce patterns (zoom lens, accordion, size selector) |
| 02 | **Calculator** | Solid logic + keyboard accessibility + precision math handling |
| 03 | **Sky Day-to-Night** | Creative, shows CSS animation and DOM manipulation skill |
| 04 | **Analog-Digital Clock** | Clean, functional, good use of JS + CSS transforms |
| 05 | **Tic-Tac-Toe** | Classic algorithm exercise with visual feedback |
| 06 | **Baroque** | Good landing page structure with UX considerations (popup, localStorage) |
| 07 | **Invoice Template** | Clean professional document template with print styles |
| 08 | **Facebook Signup Clone** | Good clone, demonstrates attention to detail and form validation |
| 09 | **ChatBot** | Basic but functional DOM practice |
| 10 | **Photo Frame** | Simple CSS showcase |
| 11 | **Education Website / GCU Portal** | Layout practice, content-heavy |

---

## 🛠️ What Was Fixed

All projects passed through a **debugging and refactoring phase** with Microsoft Edge Tools / axe accessibility audits.

| Category | Fix | Affected Projects |
|----------|-----|-------------------|
| **File Structure** | Moved all inline `style=""` and `onclick=""` to external CSS/JS files | All 12 |
| **Accessibility** | Added `title` attributes to buttons without discernible text | Edu-Web, ChatBot |
| **Accessibility** | Added `title` attributes to `<select>` elements missing labels | Facebook |
| **Accessibility** | Added `title` / `placeholder` to form inputs missing labels | Invoice, J.Page, Frame, Sky |
| **Safari/iOS** | Added `-webkit-backdrop-filter` alongside `backdrop-filter` | Baroque, ChatBot, Edu-Web, J.Page, Frame, Sky, Tic-Tac-Toe |
| **Safari/iOS** | Added `-webkit-user-select` alongside `user-select` | Tic-Tac-Toe |
| **CSS Standards** | Added standard `background-clip` with vendor prefix | Edu-Web |
| **Broken Assets** | Replaced local image paths (`/GCU-logo.jpeg`) with reliable placeholders | Frame, GCU, Facebook |
| **UX Bug** | Popup remembers closure via `localStorage` instead of firing every refresh | Baroque |
| **Math Bug** | Floating point precision fix using `parseFloat(computation.toFixed(10))` | Calculator |
| **Overflow Bug** | Zoom lens repositions left/right based on viewport space | J.Page |
| **Print Bug** | Added `@media print` for clean page printing | Invoice |
| **Responsive** | Added mobile/tablet media queries | Baroque, Calculator, Clock, Facebook, J.Page, Tic-Tac-Toe |

---

## 📁 Folder Structure

```
ideoversity-fullstack-projects/
├── README.md
├── LICENSE
├── .gitignore
│
├── Baroque/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Calculator/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── ChatBot/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Clock/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Education-website/
│   ├── index.html
│   └── style.css
│
├── Facebook-signup-clone/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── GCU-lahore/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Invoice-template/
│   ├── index.html
│   └── style.css
│
├── junaid-jamshed-product-page/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── photo-frame/
│   ├── index.html
│   └── style.css
│
├── sky-day-to-night/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── tic-tac-toe/
    ├── index.html
    ├── style.css
    └── script.js
```

Each folder is **self-contained** — open `index.html` in any browser to run.

---

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/ahmedabbas52233-a11y/ideoversity-fullstack-projects.git

# Navigate to any project
cd ideoversity-fullstack-projects/Calculator

# Open in browser
# Windows:
start index.html
# macOS:
open index.html
# Linux:
xdg-open index.html
```

Or simply **drag and drop** any `index.html` file into your browser window.

---

## 🧪 Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Structure** | HTML5 (semantic elements, accessibility attributes) |
| **Styling** | CSS3 (Flexbox, Grid, animations, media queries, CSS variables) |
| **Logic** | Vanilla JavaScript (ES6+, DOM manipulation, event handling, localStorage) |
| **Tools** | Microsoft Edge DevTools, axe accessibility auditor |

No frameworks. No libraries. No build steps. **Pure hand-written code.**

---

## ⚠️ Disclaimers

The following projects are **UI clones for educational and portfolio purposes only**:

| Project | Original Brand |
|---------|----------------|
| Facebook Signup Clone | Meta Platforms, Inc. |
| Junaid Jamshed Product Page | Junaid Jamshed (Pvt) Ltd |
| Baroque Fashion Landing | Baroque (Pvt) Ltd |

- These are **not affiliated with, endorsed by, or connected to** the respective brands.
- All trademarks, logos, and product images belong to their respective owners.
- The **GCU Lahore Portal** uses placeholder content and is not an official university website.

---

## 📝 License

MIT License — see [LICENSE](LICENSE) for full text.

---

> **"Every line was written by hand. Every bug was debugged. Every fix was earned."**
