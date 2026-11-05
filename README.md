# Martha Wambui Thuku — Professional Portfolio

A responsive static website with no installation or build step. All assets are local, with no external font, tracking or script dependency.

## Preview

Open `index.html` in a browser. For the Copy Email feature, use HTTPS or a local server (for example, `npx serve .`). If clipboard access is unavailable, the address is displayed for manual copying.

## Publish on GitHub Pages

1. Create a GitHub repository, or open the repository you want to use.
2. Extract this ZIP. Upload its contents directly to the repository root. Keep `index.html`, `styles.css`, `script.js`, `.nojekyll` and the `assets` folder together.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/ (root)**, then save.
5. Open the GitHub Pages address shown in those settings after deployment completes.

All paths are relative, so this works at both a user Pages domain and a repository subpath. No paid services or API keys are needed.

## Content and maintenance

Content is based on the supplied Martha_Wambui_Thuku_CV_Final.pdf. The hero uses an AI-edited professional portrait based on the supplied original, with navy business attire and a navy studio background. The original portrait is also included. The approved design informs the navy/purple palette, navigation, hero, three-column overview and feature cards. The implementation uses CSS and SVG decoration rather than embedding the reference screenshot as a webpage.

Update portfolio text in `index.html`. Update appearance in `styles.css`. Replace the hero portrait at `assets/martha-professional.png` and CV at `assets/Martha_Wambui_Thuku_CV.pdf` as needed. Completed qualifications, in-progress courses and UNITAR programme selection are kept distinct. The site includes one documented academic project. No GitHub/LinkedIn URL or source-code link was supplied in the CV, so none is invented. Contact uses email and phone links; there is no form backend.

## Included behaviour

- Desktop and mobile navigation, active section highlight and back-to-top links.
- Expandable professional profile and project/experience/training detail sections.
- View and download the original CV.
- Email, phone and clipboard contact actions.
- Keyboard focus styles, skip link, reduced-motion support and responsive layouts.

The repository and ZIP contain the public contact details, portrait and downloadable CV requested for this portfolio. Review updates before publishing future versions.

