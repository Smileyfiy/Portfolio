# jh&n — Portfolio

Personal portfolio of John Otieno. Plain HTML/CSS/JS — no build step.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Edit content

All content lives in [`js/data.js`](js/data.js). The page renders from it, so you rarely need to touch HTML.

- Leave a field as `""` to hide it (dates, email, CV, repo/demo links).
- Set `publish: false` on a project to keep it off the site.
- Project `status`: `completed`, `in-progress` or `planned`.
- Skill `level`: `Hands-on`, `Comfortable` or `Learning`.

## Profile picture

Save your photo as `assets/images/profile.jpg` — that's it. To change it later, replace the file
(or point `PROFILE.photo` in `data.js` at a different file). A square image of about 800×800 px works best.
If no photo is found, the jh&n mark is shown instead.

## Supporting documents & photos

1. Put the file in `assets/achievements/` (e.g. `cisco-certificate.pdf`, `open-lanes.jpg`).
2. Add it to the `media` list of the matching entry in `data.js`:

```js
media: [
  { src: "assets/achievements/cisco-certificate.pdf", caption: "Certificate of completion" },
  { src: "assets/achievements/open-lanes.jpg", caption: "Representing UoN at On Open Lanes" },
],
```

Works on experience, projects, education and certifications/milestones. Images become the card's cover,
appear as thumbnails in the pop-up, and are collected in the **Gallery** section (which only appears once
there's at least one image). PDFs and other files show as document links.

Tip: resize photos to ~1600 px wide before adding them so the site stays fast.

## Theme

Cream is the default; visitors can switch to the black theme with the toggle. Colours are defined as tokens
at the top of [`css/styles.css`](css/styles.css): navy and gray accents, with burgundy used sparingly.

## Deploy (GitHub Pages)

```bash
git init && git add . && git commit -m "Initial portfolio"
git branch -M main
git remote add origin git@github.com:Smileyfiy/portfolio.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Deploy from branch → main / root**.

## Before publishing

- [ ] Add your profile photo and supporting files.
- [ ] Paste the Cisco credential verification link into the Cisco entry's `link` field.
- [ ] Optionally add a web copy of your CV (without your phone number) and set `PROFILE.links.cv`.
- [ ] Review the coursework projects marked `publish: false`.
