# Shift Board setup

Shift Board is a weekly shift schedule that works on phones and computers.
Staff tap their shift to clock in and out. The hours they worked show next to
the hours they were scheduled for.

## What's in this folder

| File | What it is |
| --- | --- |
| `index.html` | The whole website |
| `config.js` | Where you paste your Firebase settings (step 2) |
| `firestore.rules` | The security rules: who may do what (step 1) |
| `_headers` | Extra browser security settings, used automatically by Netlify (step 3) |

## Try it first (no setup)

Double-click `index.html`. It opens with an example schedule and some example
clock-ins so you can see how everything works. The manager PIN is **2016**.

In this demo mode, everything is saved in that one browser only. Other phones
can't see it yet. To share it, do the steps below.

## 1. Make a free Firebase project (about 15 minutes)

Firebase is Google's free database service. It's what lets every phone see the
same schedule and clock-ins, and it's what enforces the security.

1. Go to <https://console.firebase.google.com> and sign in with a Google account.
2. Click **Create a project**, give it a name (for example `shift-board`), and
   finish the steps. You can turn Google Analytics off.
3. In the left menu, open **Build → Authentication**, click **Get started**, then
   under **Sign-in method** turn on two providers:
   - **Anonymous**: lets staff use the site without an account.
   - **Google**: managers sign in with their Google account.
4. In the left menu, open **Build → Firestore Database** and click
   **Create database**. Pick a location near you and start in **production mode**.
5. Open `firestore.rules` in Notepad. Near the top, replace `owner@example.com`
   with the Google account of each manager, in lowercase, for example:

   ```
   return ['maria.lopez@gmail.com', 'sam.manager@gmail.com'];
   ```

6. In Firebase, open the **Rules** tab of Firestore, delete what's there, paste
   everything from `firestore.rules`, and click **Publish**.

If you add or remove a manager later, change that line and publish the rules again.

## 2. Connect the website to Firebase

1. In Firebase, click the gear icon, then **Project settings**.
2. Under **Your apps**, click the **`</>`** (Web) button, give it any nickname,
   and click **Register app**. You don't need Firebase Hosting.
3. Firebase shows a block of settings that starts with `const firebaseConfig = {`.
   Copy the part between the braces `{ ... }`.
4. Open `config.js` in Notepad and replace `null` so it looks like this:

   ```js
   window.SHIFTBOARD_FIREBASE = {
     apiKey: "AIza...",
     authDomain: "shift-board-123.firebaseapp.com",
     projectId: "shift-board-123",
     storageBucket: "shift-board-123.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abc123"
   };
   ```

5. Save the file.

The `apiKey` isn't a password. Google designed it to be visible in websites.
The security comes from the rules in step 1 and the locks in step 4.

## 3. Put it online

The easiest free option is Netlify Drop:

1. Go to <https://app.netlify.com/drop>.
2. Drag this whole folder onto the page.
3. You get a link like `https://something.netlify.app`. Sign up (free) to keep it
   and to pick a nicer name.

Send that link to the staff. On a phone they can tap **Share → Add to Home
Screen** so it opens like an app.

If you change any file later, drag the folder onto Netlify again to update it.

## 4. Lock it to your website address

1. In Firebase, open **Authentication → Settings → Authorized domains**, click
   **Add domain**, and enter your Netlify address (for example
   `something.netlify.app`). Manager sign-in only works on approved addresses.
2. Open <https://console.cloud.google.com/apis/credentials> and pick your
   Firebase project at the top. Click the key named **Browser key**. Under
   **Application restrictions**, choose **Websites** and add
   `https://something.netlify.app/*`. Click **Save**.
   Now other websites can't use your Firebase key.

## 5. First things to do as the manager

1. Open the site, tap **Manager** in the bottom bar, and sign in with your Google
   account (the one you put in `firestore.rules`). You only do this once per device.
2. Enter the manager PIN **2016**.
3. In Manager tools, open **Settings** to set the business name. You can change
   the PIN there too.
4. Add the schedule: see the next section.

## Adding the schedule

**From a Google Sheet (easiest):**

1. In Google Sheets, click **Share**, set **General access** to
   **Anyone with the link → Viewer**, and click **Copy link**.
2. On the site: **Manager → Link a Google Sheet**, paste the link, and tap
   **Read sheet**.
3. Check the preview, then tap **Replace schedule**.

The site remembers the link. Whenever a manager opens the site, it checks the
sheet. If it changed, a **"Your Google Sheet has changed"** alert appears with a
**Review changes** button. Nothing on the schedule changes until a manager
approves it.

Anyone with the sheet's link can see it, so keep only the schedule in that sheet.

**Other ways:** paste straight from Excel or Google Sheets, or choose a CSV file.

**What it can read:**
- One row per person with a column per day, or one row per shift.
- Rows of shift times with names in the day cells, like "Front Desk 8-4 | Maya | Jordan".
- Title rows above the table, and heading rows like "FRONT DESK" that group
  the people below them.
- Day names or dates ("Mon", "11/16", "Nov 16").
- Times like `8-4`, `8am-4pm`, `8 a.m. - 4 p.m.`, `2:30-10:30`, `14:30-22:30`,
  and split shifts like `8-12, 4-8`.
- `open` and `close`, once you enter the opening and closing times it asks for.
- Notes like OFF, Vacation and Sick are skipped, and so are totals rows.

## How the schedule works

- **It repeats every week.** Add it once and it shows up every week.
- **It can expire.** When adding a schedule or a shift, set an **Until** date.
  After that date it stops appearing by itself. Leave it empty to repeat with no end.
- **Line up the next schedule ahead of time.** Add it with a later
  **Repeats from** date and choose **Add to schedule**. The current schedule
  runs until its end date, then the new one takes over.
- **Two weeks before shifts expire**, manager mode shows a reminder with a
  button to keep them going.
- **One-time shifts** (someone covering a single day): add a shift and set
  **Repeats** to "Only the week of ...".

## How clocking in works

- Staff open the site, find their name on today's schedule, tap it, and press
  **Start shift**. When they leave they tap it again and press **End shift**.
- Shifts can only be started on the day they're scheduled.
- The **Timesheets** tab shows each person's worked hours against their
  scheduled hours, who's on shift now, and who clocked in late (more than
  5 minutes after the start time).
- **Every Monday, clock-ins start fresh.** The schedule carries over, and the
  past weeks stay saved. Use the arrows at the top to look back.
- A manager can fix forgotten clock-ins or clock-outs: tap the shift in manager
  mode and use **Fix clock times**.
- **Export hours** (in Manager tools) downloads the week as a spreadsheet file
  for payroll.

## Security

Google's servers check every change against the rules in `firestore.rules`.
What the website or a phone sends doesn't matter.

- **Staff** can see the schedule and clock in and out of a shift that's on it.
  Clock times come from Google's server clock, so they can't be faked. A
  clock-out can't be changed afterwards, and staff can't edit or delete any
  record.
- **Managers** are the Google accounts listed in `firestore.rules`. Only they can
  change the schedule, fix clock times, read or change the PIN, or delete anything.
- **The PIN (2016)** is a second lock on manager devices, for example a shared
  front-desk tablet. Knowing the PIN alone isn't enough: the device must also be
  signed in with a manager's Google account. After 5 wrong tries it waits
  30 seconds.
- **The website** sends extra security settings (`_headers`). They stop other
  sites from embedding it, and limit it to talking only with Google's Firebase
  and Google Sheets.

What it doesn't stop: someone with the link clocking in for a coworker who's
on the schedule that day. Managers see every clock time and can fix it. If
that's a worry, ask for a personal PIN per employee.
