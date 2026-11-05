# Homepage Collaborations Section — Change Log

Date: 2026-11-04

This log tracks every file added or modified to add the sixth homepage section,
**Collaborations**, after **Join Our Team**. It shows small company logos in a
vertical list by default and gives Sanity full control over columns, rows,
logo size, and alignment.

## New files

| File | Lines | Purpose |
|------|-------|---------|
| `sanity/schemas/documents/collaboration.ts` | 1–92 | New `collaboration` document: name, PNG logo, website URL, display order, active flag. |
| `sanity/schemas/objects/collaborationLayout.ts` | 1–79 | Reusable layout object: columns, mobile columns, rows, logo size, alignment. |
| `src/lib/collaborations.ts` | 1–79 | Shared logo view model, URL normaliser, and six fictional demo logos. |
| `src/components/home/CollaborationsSection.tsx` | 1–190 | Renders the section, applies the layout, links logos, limits rows, and hides inactive entries. |
| `public/images/collaborators/nexa-semiconductor.png` | binary | Placeholder logo, 480×128 PNG (fictional). |
| `public/images/collaborators/orbit-rf-labs.png` | binary | Placeholder logo, 480×128 PNG (fictional). |
| `public/images/collaborators/crystalworks.png` | binary | Placeholder logo, 480×128 PNG (fictional). |
| `public/images/collaborators/voltedge.png` | binary | Placeholder logo, 480×128 PNG (fictional). |
| `public/images/collaborators/hikari-devices.png` | binary | Placeholder logo, 480×128 PNG (fictional). |
| `public/images/collaborators/foundry-q.png` | binary | Placeholder logo, 480×128 PNG (fictional). |
| `COLLABORATIONS_CHANGES.md` | this file | This change log. |

## Modified files

### `sanity/schemas/index.ts`

- Line 3: imported the `collaboration` document schema.
- Line 12: imported the `collaborationLayout` object schema.
- Line 28: registered `collaborationLayout` under objects.
- Line 41: registered `collaboration` under documents.

### `sanity/structure.ts`

- Lines 68–75: added a **Collaborations** list to the Studio sidebar,
  ordered by `displayOrder`.

### `sanity/schemas/documents/homepage.ts`

- Line 15: added the **Collaborations** field group.
- Lines 196–226: added four homepage fields:
  - `collaborationsSectionHeading` (line 198)
  - `collaborationsSectionDescription` (line 204)
  - `collaborations` — ordered array of collaboration references (line 211)
  - `collaborationsLayout` — rows/columns/logo size/alignment object (line 220)

### `sanity/types/index.ts`

- Lines 192–199: added the `Collaboration` type.
- Lines 201–207: added the `CollaborationLayout` type.
- Lines 233–236: added the four Collaborations fields to `Homepage`.

### `sanity/lib/queries/fragments.ts`

- Lines 158–167: added `collaborationSummaryFields` (id, name, website URL,
  order, active flag, logo).

### `sanity/lib/queries/index.ts`

- Line 3: imported `collaborationSummaryFields`.
- Lines 126–137: the homepage query now returns the section heading,
  description, ordered collaboration references, and layout object.

### `src/app/(site)/page.tsx`

- Line 4: imported `CollaborationsSection`.
- Lines 148–153: rendered the section after `JoinSection`, passing the CMS
  heading, description, ordered collaborations, and layout.

### `src/app/globals.css`

- Lines 769–782: added `.collaboration-grid` and a phone breakpoint. Column
  counts are driven by CSS variables set from Sanity, so no dynamic Tailwind
  classes are needed.

## How the section behaves

- **Default:** one column, small logos, left aligned — a vertical list.
- **Order:** the order of the references in the homepage **Collaboration
  Logos** array. Drag entries in Sanity to reorder.
- **Rows:** `0` shows every selected logo. A positive number limits the output
  to `rows × columns` logos.
- **Columns:** 1–6 on tablet/desktop, 1–3 on phones.
- **Logo size:** Small, Medium, or Large. The logo keeps its aspect ratio.
- **Alignment:** Left or Center.
- **Links:** an optional Website URL turns the logo into a link that opens in a
  new tab.
- **Hidden entries:** `Active` turned off, or a collaboration without a logo,
  is not rendered. This filtering happens in
  `src/components/home/CollaborationsSection.tsx`, lines 110–119.
- **Fallback:** if the homepage has no collaboration references, the six
  fictional demo logos in `src/lib/collaborations.ts` are shown. Once at least
  one CMS collaboration is selected, the demo logos disappear.

## Not changed

- No existing CMS documents were edited.
- No production deployment or write operation was performed. Sanity is used
  read-only by the local runner.
- The other five homepage sections and the News, Highlights, and other pages
  are unchanged.

## Verification

- `npx tsc --noEmit` — passed.
- `npx eslint` on all changed TypeScript/TSX files — passed.
- `npx prettier --check` on all changed files — passed.
- `npm run build` — passed; `/` is generated successfully.
- Local dev check — `/` returned HTTP 200 and rendered, in order:
  `01 / RESEARCH`, `02 / OUR TEAM`, `03 / SELECTED CONTRIBUTIONS`,
  `04 / NEWS`, `05 / JOIN OUR TEAM`, `06 / COLLABORATIONS`.
- All six placeholder logo names rendered on the homepage.

## Managing it in Sanity Studio

1. Open **Collaborations** in the Studio sidebar.
2. Create a collaboration, upload a logo, optionally add a website URL, and
   keep **Active** on.
3. Open the **Homepage** document and go to the **Collaborations** group.
4. Add collaboration references under **Collaboration Logos** and drag them
   into the desired order.
5. Set **Logo Layout**:
   - Columns: `1` for the default vertical list.
   - Mobile columns: `1` to keep the vertical list on phones.
   - Rows: `0` for all logos, or a number to limit them.
   - Logo size: Small / Medium / Large.
   - Alignment: Left / Center.
6. Publish the Homepage.

The placeholder demo logos can be removed from
`public/images/collaborators/` once real logos are uploaded in Sanity.

---

# Change 3 — Clickable Collaboration Logos

Date: 2026-11-04

Each collaboration logo now links to the website entered in Sanity. The whole
logo is the click target. If no website is entered, the logo stays as a plain,
non-clickable image.

## Modified files

### `sanity/schemas/documents/collaboration.ts`

- Lines 37–38: updated the **Website URL** help text to explain that clicking
  the logo opens the address in a new tab.
- Lines 39–51: added validation that only accepts complete `http://` or
  `https://` website addresses. Invalid values show an error in the Studio, so
  a broken link cannot be published.

### `src/lib/collaborations.ts`

- Lines 15–42: added `normalizeWebsiteUrl()`. It:
  - trims whitespace,
  - accepts bare domains such as `example.com` and prefixes `https://`,
  - accepts protocol-relative addresses such as `//example.com`,
  - rejects anything that is not `http` or `https` (for example
    `javascript:` or `ftp:`),
  - returns `undefined` for empty or invalid values.

### `src/components/home/CollaborationsSection.tsx`

- Lines 8–12: imports `normalizeWebsiteUrl`.
- Line 64: resolves the CMS `websiteUrl` through the normaliser.
- Lines 78–90: wraps the logo in an `<a>` element when a valid website exists:
  - `href` is the normalised website address,
  - `target="_blank"` opens the website in a new tab (matching the rest of the
    site's external links),
  - `rel="noopener noreferrer"` protects the page,
  - `aria-label` announces the company name and that a new tab opens,
  - existing hover and keyboard-focus styles still apply.
- When no valid URL exists, lines 66–78 render the logo without a link.

## How to use it in Sanity

1. Open **Collaborations**.
2. Open a collaboration document.
3. Enter the company address in **Website URL**, for example
   `https://www.company.com`.
4. Publish the document.
5. On the homepage, clicking that logo opens the company website.

If the field is left empty, the logo is still displayed but is not clickable.

## Verification

- `npx tsc --noEmit` — passed.
- `npx eslint` on the changed files — passed.
- `npx prettier --check` on the changed files — passed.
- URL normaliser test cases — passed for full URLs, bare domains, paths,
  protocol-relative URLs, `ftp:`, `javascript:`, empty strings, and invalid
  text.
- Local dev check — the homepage rendered a real anchor for a test URL:
  `<a href="https://example.com/" target="_blank" rel="noopener noreferrer"
  aria-label="Nexa Semiconductor website (opens in a new tab)">`.
  The temporary test URL was removed afterwards.
- `npm run build` — passed.

---

# Change 4 — Collaboration Logos Converted to PNG

Date: 2026-11-04

All collaboration logos are now PNG images. The SVG placeholders were removed
and replaced with PNG versions at the same artwork and dimensions.

## Added files

| File | Format | Purpose |
|------|--------|---------|
| `public/images/collaborators/nexa-semiconductor.png` | PNG, 480×128, RGBA | Placeholder logo (fictional). |
| `public/images/collaborators/orbit-rf-labs.png` | PNG, 480×128, RGBA | Placeholder logo (fictional). |
| `public/images/collaborators/crystalworks.png` | PNG, 480×128, RGBA | Placeholder logo (fictional). |
| `public/images/collaborators/voltedge.png` | PNG, 480×128, RGBA | Placeholder logo (fictional). |
| `public/images/collaborators/hikari-devices.png` | PNG, 480×128, RGBA | Placeholder logo (fictional). |
| `public/images/collaborators/foundry-q.png` | PNG, 480×128, RGBA | Placeholder logo (fictional). |

## Removed files

- `public/images/collaborators/nexa-semiconductor.svg`
- `public/images/collaborators/orbit-rf-labs.svg`
- `public/images/collaborators/crystalworks.svg`
- `public/images/collaborators/voltedge.svg`
- `public/images/collaborators/hikari-devices.svg`
- `public/images/collaborators/foundry-q.svg`

## Modified files

### `src/lib/collaborations.ts`

- Lines 52, 57, 62, 67, 72, 77: changed all six demo `logoSrc` paths from
  `.svg` to `.png`.

### `sanity/schemas/documents/collaboration.ts`

- Line 19: the logo help text now asks for a transparent PNG instead of
  “PNG or SVG”.
- Lines 20–31: the logo validation now rejects any asset that is not a PNG.
  Uploading an SVG, JPG, GIF, or WebP shows “Upload the logo as a PNG file.”
  in the Studio.

## Verification

- All six PNG files validated as `PNG image data, 480 x 128, 8-bit/color RGBA`.
- Visual check of the converted PNGs — artwork, transparency, and text match
  the previous SVGs.
- No remaining `.svg` references in the collaboration code or data.
- `npx tsc --noEmit` — passed.
- ESLint and Prettier on the changed files — passed.
- `npm run build` — passed.
- Local homepage check — all six PNG logos rendered successfully.

---

# Change 5 — Same-Name PNG Replacement Cache Fix

Date: 2026-11-04

## Problem

Replacing a demo logo in `public/images/collaborators/` with a new PNG that has
the same filename could still show the old logo in the browser.

Two causes were found:

1. **Next.js optimised-image cache.** The local demo logos were rendered through
   Next.js `<Image>`, which produces a stable URL such as
   `/_next/image?url=%2Fimages%2Fcollaborators%2Fnexa-semiconductor.png&w=640&q=75`.
   Because the URL does not change when the file changes, Next.js and the
   browser can keep serving the previously optimised image.
2. **Two copies of the project were running on port 3000.** The server actually
   serving `localhost` was started from
   `/Users/user/buet-eee-research-group-website`, while the edits were being made
   in `/Users/user/Documents/Repo/buet-eee-research-group-website-main`. Editing
   one copy does not update the other.

## Modified file

### `src/components/home/CollaborationsSection.tsx`

- Lines 58–61: added `unoptimized` to the local demo logo `<Image>`.
  The browser now requests the PNG file directly
  (`/images/collaborators/name.png`) instead of the cached
  `/_next/image?...` URL, so a same-name file replacement appears after a
  normal reload. CMS logos are unaffected and still use Sanity optimisation.

## Update — 2026-11-04: choose the logo link target

### What changed

- Collaborations now have an **Open in New Tab** toggle in Sanity.
- Enabled (default) opens the website in a new tab.
- Disabled opens the website in the current tab.
- The accessibility label updates to say whether a new tab will open.

### Files changed

| File | Lines | Change |
|------|-------|--------|
| `sanity/schemas/documents/collaboration.ts` | 33–60 | Clarified the `websiteUrl` description and added the `openInNewTab` boolean field. |
| `sanity/lib/queries/fragments.ts` | 158–168 | Added `openInNewTab` to `collaborationSummaryFields`. |
| `sanity/types/index.ts` | 197–205 | Added `openInNewTab?: boolean` to `Collaboration`. |
| `src/lib/collaborations.ts` | 7–15 | Added `openInNewTab?: boolean` to the display view model. |
| `src/components/home/CollaborationsSection.tsx` | 68–95 | Uses the CMS toggle to set `target` and `rel` on the logo link. |
| `src/components/home/CollaborationsSection.tsx` | 118–128 | Passes `openInNewTab` from Sanity into the view model. |

### Behaviour

| Sanity value | Result |
|---|---|
| Toggle on (default) | `target="_blank"` + `rel="noopener noreferrer"` |
| Toggle off | Opens in the current tab |
| Missing on older documents | Treated as on, preserving the previous behaviour |

## How to refresh correctly

1. Stop every running dev server (`Ctrl+C` in each terminal).
2. Run only the copy you are editing:
   - `/Users/user/Documents/Repo/buet-eee-research-group-website-main`, or
   - `/Users/user/buet-eee-research-group-website` if that is the copy you are
     working in.
3. If the old image persists, clear the build cache once:
   `rm -rf .next`
4. Start the runner again: `python3 run_local.py`
5. Hard-refresh the browser: `Cmd+Shift+R`, or open the page in a private
   window.

## Verification

- The PNG currently on disk is the new 3836×2158 MIT logo in both project
  copies.
- The running server’s optimised PNG and WebP URLs both returned the new MIT
  image at 640×360, confirming that the file itself was already correct.
- With the fix, the homepage HTML now references
  `src="/images/collaborators/nexa-semiconductor.png"` directly instead of
  `/_next/image?...`.
- Direct request returned `200 image/png` with 30,024 bytes.
- `npx tsc --noEmit` — passed.
- `npx eslint` and Prettier on the changed file — passed.
- `npm run build` — passed.



