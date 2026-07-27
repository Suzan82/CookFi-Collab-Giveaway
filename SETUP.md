# CookFi Giveaway — Setup Guide

Three files:

- `index.html` — the whole website (open it directly in a browser to preview)
- `apps-script.gs` — backend code that writes entries into a Google Sheet
- `SETUP.md` — this file

## 1. Connect the Google Sheet (collects submissions)

1. Create a new Google Sheet (sheets.new).
2. In the Sheet, go to **Extensions → Apps Script**.
3. Delete the placeholder code and paste in the contents of `apps-script.gs`.
4. Click **Deploy → New deployment**.
5. Click the gear icon next to "Select type" and choose **Web app**.
6. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
7. Click **Deploy**, authorize the permissions when prompted.
8. Copy the **Web app URL** it gives you (ends in `/exec`).
9. Open `index.html`, find this line near the top of the `<script>` block:
   ```js
   formEndpoint: "https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec",
   ```
   and replace it with the URL you copied.

Every entry will now append as a new row in your Sheet, with a header row created automatically on the first submission.

> If you ever edit `apps-script.gs` again after it's deployed, use **Deploy → Manage deployments → Edit → New version** so the live URL picks up the change.

## 2. Add your real links

Still inside the `CONFIG` object in `index.html`, replace:

```js
xProfile1: { handle: "@profile_one", url: "https://x.com/REPLACE_ME_1" },
xProfile2: { handle: "@profile_two", url: "https://x.com/REPLACE_ME_2" },
tweetUrl:  "https://x.com/REPLACE_ME/status/REPLACE_ME",
telegramUrl: "https://t.me/REPLACE_ME"
```

with your two X profiles to follow, the tweet to like/retweet/comment on, and your Telegram invite link.

## 3. Test it

Open `index.html` in a browser before pointing the endpoint at your real sheet — with the placeholder endpoint still in place, submissions log to the browser console instead of sending anywhere ("demo mode"), so you can click through the whole flow safely.

Once the real endpoint is in place, submit a test entry and confirm a row appears in your Sheet.

## 4. Publish

Any static host works — drag-and-drop `index.html` into Netlify, or push it to GitHub Pages, Vercel, or Cloudflare Pages. Only `index.html` needs to be hosted; `apps-script.gs` lives inside Google, not on your web host.

## Notes on verification

- **Follow / Like / Retweet / Comment / Telegram join** are self-reported: the checkbox only unlocks after the person clicks the "Open" link, which nudges genuine completion but doesn't cryptographically verify it. Real verification would require the X API (paid tiers for these endpoints) or a Telegram bot added as admin to your group, both of which need a real backend — let me know if you want that built out later.
- **Wallet address** is validated client-side as a well-formed EVM address (`0x` + 40 hex chars) but this only checks the format, not ownership. If you need proof of ownership, that requires a wallet-signature flow (e.g. "sign this message"), which is a bigger addition.
