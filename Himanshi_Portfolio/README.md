# Himanshi Rautela — Portfolio

A fast, single-page static portfolio showcasing my work in data analytics,
software development, education, skills, certifications, and achievements.
No build step, no framework — just open it.

## Files

```text
index.html      → all the page content
styles.css      → the design (light "lab" theme, violet/coral accents)
script.js       → hero data-graph canvas + scroll reveals
assets/
  himanshi.jpeg                  → profile photo
  Himanshi-Rautela-Resume.pdf    → résumé, linked by the Resume buttons
Run it locally (VS Code)
Easiest: install the Live Server extension, right-click index.html → "Open with Live Server".
Or just double-click index.html to open it in a browser.
Or from a terminal in this folder:
Deploy to Vercel
Push this folder to a GitHub repo.
On vercel.com → New Project → import the repo.
Framework preset: Other.
Build command: leave empty.
Output directory: ./ (root).
Deploy. That's it — it's a static site.
Things you'll likely want to edit
Email / links: in index.html, search for himanshi.rautela09@gmail.com, github.com/Himanshirautela, and linkedin.com/in/himanshirautela.
Add a project: copy one <article class="card">...</article> block in the #work section and edit it.
Add certificate links: wrap each <li> in the #certs list with an <a href="..."> to the credential URL.
Colors: change the --violet / --coral values at the top of styles.css.
Profile photo: replace assets/himanshi.jpeg with your preferred photo using the same filename.
Resume: replace assets/Himanshi-Rautela-Resume.pdf with your updated résumé using the same filename.
Social links: update the LinkedIn, GitHub, HackerRank, and LeetCode links in index.html.
