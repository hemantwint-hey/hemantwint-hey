# Setup

1. Create a public repo named exactly `hemantwint-hey` at https://github.com/new (tick "Add a README").
2. Upload `README.md` and the whole `assets/` folder to the repo root (Add file → Upload files, drag both in, commit).
3. Replace `assets/profile.png` with your own square photo (600×600), same filename.
4. Open https://github.com/hemantwint-hey — the profile is live.

## Asset structure

```
assets/
  castle-background.png      source artwork (all banners are cut from it)
  hero.jpg                   castle header with the HEMANT sign
  profile.png                avatar placeholder — replace
  buttons/  location.png github.png linkedin.png email.png portfolio.png leetcode.png
  banners/  about.jpg stats.jpg base.jpg inventory.jpg
            featured-quests.jpg adventure-log.jpg guild-activity.jpg current-quests.jpg footer.jpg
  stats/    dsa.png projects.png technologies.png internship.png
  projects/ ecommerce-management-system.jpg rl-decision-system.jpg ai-interview-pipeline.jpg hotsync.jpg
```

## Live data services

- Contribution graph: github-readme-activity-graph.vercel.app
- Commits / PRs / stars card: github-readme-stats.vercel.app (public instance is rate-limited; deploy your own copy on Vercel for reliability and swap the host)
- Streak: streak-stats.demolab.com
- Followers / stars badges: shields.io
- Tech icons: skillicons.dev

All are colored with the parchment palette (`f3e4bf` bg, `1f4fa3` blue, `c98a1b` gold, `5a3417` wood).

## How the layout works

GitHub strips CSS, so nothing can sit on top of the background. Instead, each section header is a horizontal slice of the castle artwork, taken from progressively lower in the scene (sky → castle → waterfalls → grass). Scrolling the profile walks down through the world, while all content between the banners stays real, selectable HTML text in tables. The stat tiles are images (with alt text) since GitHub can't style numbers.
