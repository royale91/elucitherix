/* ░░░░░░░░ ELUCITHERIX — shared config ░░░░░░░░
   Paste your keys here once. Used by the signup form AND the admin page.

   SET UP THE WAITLIST DATABASE (free, ~2 min):
   1. Go to https://supabase.com → New project (free tier).
   2. Project Settings → API → copy the "Project URL" and the "anon public" key below.
   3. SQL Editor → New query → paste & run:

        create table if not exists waitlist (
          id bigint generated always as identity primary key,
          name text, email text, phone text,
          created_at timestamptz default now()
        );
        alter table waitlist enable row level security;
        create policy "anon can insert" on waitlist for insert to anon with check (true);
        create policy "anon can read"   on waitlist for select to anon using (true);

   4. Paste the two values below, commit, done. Signups now flow to the DB
      and show up on /admin.html.

   (Until you fill these in, signups are still saved safely in the visitor's
    browser and — if you set a Formspree ID — emailed to you.)
*/
window.ELX_CONFIG = {
  SUPABASE_URL:      "",            // e.g. "https://abcd1234.supabase.co"
  SUPABASE_ANON_KEY: "",            // the long "anon public" key
  FORMSPREE_ID:      "YOUR_FORM_ID",// optional: email-on-signup via formspree.io
  ADMIN_PASSCODE:    "wax2026",     // change this — gate for the /admin page
  SITE_PASSCODE:     "Choppa"       // password to view the whole site. Set "" to make the site public.
};
