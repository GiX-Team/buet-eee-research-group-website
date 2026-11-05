# Institution (BUET) Logo Link — Change Log

Date: 2026-11-04

This log tracks the change that makes the red BUET logo in the header and
footer link to a CMS-controlled page instead of the site homepage. The link
target and the new-tab behaviour are both editable in Sanity.

## Behaviour

| Sanity field | Result |
|---|---|
| Institution Logo Link → URL | Destination of the BUET logo |
| Institution Logo Link → Open in New Tab | Opens a new tab when on, same tab when off |
| Link not set | Falls back to `https://www.buet.ac.bd/` in a new tab |

The NC Group logo still links to the homepage.

## Files changed

### `sanity/schemas/documents/siteSettings.ts`

- Lines 45–52: added the **Institution Logo Link** field (`link`) under
  General. It reuses the existing `link` object, so the editor chooses the URL
  and the **Open in New Tab** toggle. The link label is used as the logo's
  accessible name.

### `sanity/lib/queries/index.ts`

- Lines 41–43: fetches `partnerLogoLink` in `siteSettingsQuery`.

### `sanity/types/index.ts`

- Lines 44–45: added `partnerLogoLink?: Link` to `SiteSettings`.

### `src/components/layout/SiteLogo.tsx`

- Lines 5, 14–16: imports the `Link` type and defines the BUET fallback.
- Lines 21–28: added the `partnerLink` prop.
- Lines 40–47: detects external vs internal destinations.
- Lines 49–64: resolves the CMS URL, label, and new-tab setting.
- Lines 66–78: builds the institution logo image once.
- Lines 80–133: split the former single homepage link into:
  - NC Group logo → homepage (lines 87–104)
  - Divider (lines 106–112)
  - Institution logo → CMS URL (lines 114–132)

### `src/components/layout/Header.tsx`

- Lines 28–32: passes `settings.partnerLogoLink` into `SiteLogo`.

### `src/components/layout/Footer.tsx`

- Lines 44–48: passes `settings.partnerLogoLink` into the footer `SiteLogo`.

## Not changed

- The NC Group logo still links to `/`.
- No CMS content was edited or deployed.
- No other navigation links were changed.

## Verification

- Rendered homepage HTML now contains two separate logo links:
  - `href="/"` for the NC Group logo.
  - `href="https://www.buet.ac.bd/"` with `target="_blank"` for the BUET
    logo when no CMS link is set.
- `npx tsc --noEmit`, ESLint, Prettier, and `npm run build` pass.
- Local homepage returned HTTP 200.
