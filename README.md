# Sai Karteek & Mahisa wedding website

A single-page wedding site, hosted free on GitHub Pages.

## Turn on hosting
1. Repo Settings -> Pages.
2. Source: "Deploy from a branch". Branch: `main`, folder: `/ (root)`. Save.
3. After a minute the site is live at https://weddinginviterepopublic.github.io/weddingrepo/

## Add photos, music and videos
1. On github.com open `media/photos` (or `media/music`, `media/videos`).
2. Add file -> Upload files, drag your files in, Commit changes.
3. The site rebuilds in about a minute and picks them up. No code changes.

Longer videos: upload to YouTube (unlisted is fine) and paste the links into
`config.js`. Everything in this repo is public, so only upload what you are
happy for guests to see and save.

## RSVP sheet
1. Create a new Google Sheet (any name).
2. Extensions -> Apps Script. Delete what is there and paste in the contents
   of `rsvp/google-apps-script.gs`. Save.
3. Deploy -> New deployment -> type "Web app". Execute as: Me.
   Who has access: Anyone. Deploy, and approve the permission prompt.
4. Copy the Web app URL (ends in `/exec`) into `rsvpUrl` in `config.js`.

Each reply becomes a row in the sheet. File -> Download gives you Excel.

To update the script later without changing its URL: paste the new code,
Save, then Deploy -> Manage deployments -> pencil icon -> Version: New version
-> Deploy.

## Editing text
All wording is in `index.html`.
