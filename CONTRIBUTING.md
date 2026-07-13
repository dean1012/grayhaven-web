# Contributing

Thank you for your interest in improving `grayhaven-web`.

This repository contains the public website source for Grayhaven Systems LLC.
Do not commit sensitive information to this repository.

## Table of Contents

- [Development Setup](#development-setup)
- [Push Confirmation Hook](#push-confirmation-hook)
- [Development Workflow](#development-workflow)
- [Validation](#validation)
- [Pull Requests](#pull-requests)
- [Production Promotion](#production-promotion)
- [Website Style Guidelines](#website-style-guidelines)
- [Deployment Cues](#deployment-cues)
- [Documentation Guidelines](#documentation-guidelines)
- [Safety Guidelines](#safety-guidelines)

## Development Setup

Install the validation tools used by CI:

```bash
curl -fsSL https://rpm.nodesource.com/setup_24.x | sudo bash -
sudo dnf install -y nodejs
python3 -m pip install --upgrade pip
python3 -m pip install yamllint
npm install --global markdownlint-cli2
npm install \
  --prefix . \
  --no-audit \
  --no-fund \
  --no-save \
  --no-package-lock \
  @eslint/js@10.0.1 \
  eslint@10.6.0 \
  globals@17.7.0 \
  html-validate@11.5.3 \
  stylelint@17.14.0 \
  stylelint-config-standard@40.0.0
```

[Back to top](#contributing)

## Push Confirmation Hook

Pushing to `dev` publishes to the development website, and promoting to `main`
publishes to production. Install the provided pre-push hook to require
interactive confirmation before every push. The hook warns that pushing may
publish website changes and requires typing `publish` to continue:

```bash
mkdir -p .githooks
cp templates/pre-push .githooks/pre-push
chmod 0755 .githooks/pre-push
git config core.hooksPath .githooks
```

[Back to top](#contributing)

## Development Workflow

1. Create a GitHub issue for meaningful changes.
2. Make the change directly on the `dev` branch.
3. Sign all commits and reference the issue number.
4. Validate changes locally.
5. Push `dev` and test the development deployment.
6. Create a pull request from `dev` to `main` for production promotion.
7. Reference or close the issue number in the pull request as appropriate for
   code review and merge.

[Back to top](#contributing)

## Validation

Run the same validation commands used by CI:

```bash
python3 -m json.tool .vscode/extensions.json >/dev/null
python3 -m json.tool .vscode/settings.json >/dev/null
python3 -m json.tool .htmlvalidate.json >/dev/null
./node_modules/.bin/eslint --config eslint.config.mjs \
  eslint.config.mjs \
  stylelint.config.cjs
find site/frontend -maxdepth 1 -type f -name '*.html' -print0 \
  | xargs -0 -r ./node_modules/.bin/html-validate --config .htmlvalidate.json
git ls-files '*.yml' '*.yaml' | xargs -r yamllint
git ls-files '*.md' | xargs -r markdownlint-cli2
```

If the repository uses a `css/` directory, lint all CSS files with this command:

```bash
find site/frontend/css -maxdepth 1 -type f -name '*.css' -print0 \
  | xargs -0 -r ./node_modules/.bin/stylelint --config stylelint.config.cjs
```

If the repository uses a `js/` directory, lint all JavaScript files with this
command:

```bash
find site/frontend/js -maxdepth 1 -type f -name '*.js' -print0 \
  | xargs -0 -r ./node_modules/.bin/eslint --config eslint.config.mjs
```

After changing validation configuration files, restart the relevant VS Code
language server so editor diagnostics use the updated rules.
The Stylelint language server may occasionally display stale diagnostics after
files are moved, removed, or corrected. Restarting the Stylelint server clears
those stale errors.

Before committing changes, also check the current diff for whitespace errors:

```bash
git diff --check
```

[Back to top](#contributing)

## Pull Requests

Use GitHub issues to track meaningful changes.

Make changes directly on `dev`. Changes pushed to `dev` are deployed to the
development website for testing. After development validation, open a pull
request from `dev` into `main` for production promotion.

Reference the related issue in each commit and include
`Closes #<issue-number>` in the pull request description when the pull request
should close an issue after merging.

Sign each commit so GitHub can verify its authorship. The `main` and `dev`
branch rulesets require signed commits before merging:

```bash
git commit -S -m "<message> (Refs #<issue-number>)"
```

All changes target `dev` before production. Production promotion is handled
through a pull request from `dev` to `main` after development review.

CI runs on pushes, pull requests, and manual workflow dispatches. Pull requests
are squash merged after CI passes and review conversations are resolved.

[Back to top](#contributing)

## Production Promotion

After a `dev` to `main` pull request is squash merged, the repository
maintainer should merge `main` back into `dev` locally so future production
promotion pull requests contain only new changes:

```bash
git fetch origin
git switch dev
git pull --ff-only origin dev
git merge --no-ff -S origin/main -m "Merge main back into dev"
git push origin dev
```

If the pre-push hook prompts for confirmation, type `publish`.

[Back to top](#contributing)

## Website Style Guidelines

Follow the established Grayhaven Systems LLC visual and editorial style already
present in this repository. New colors, typography, logo treatments, layout
patterns, or voice changes should fit the existing site and may be adjusted
during review for brand consistency.

HTML should be semantic, accessible, and valid. Prefer meaningful landmarks,
headings, links, buttons, labels, and alternative text instead of presentational
markup.

CSS should be organized for maintainability, use clear class names, avoid
unnecessary specificity, and keep responsive behavior explicit. Prefer custom
properties for repeated design tokens.

JavaScript should be minimal, readable, and progressive. Avoid global side
effects unless the page behavior requires them, and keep DOM interactions small
enough to review easily.

[Back to top](#contributing)

## Deployment Cues

Development deployments receive small server-side visual cues during
deployment. The deployment process appends a space followed by `[Dev]` to the
page title and injects a `Development Environment` footer into development
site output.

Do not create, modify, or use the `dev-footer` CSS class. On development
deployments, the injected `.dev-footer` will appear at the very bottom of the
website after any included footers and content.

[Back to top](#contributing)

## Documentation Guidelines

Keep public behavior documented in `README.md` and contributor workflows
documented in `CONTRIBUTING.md`. Add comments for non-obvious implementation
decisions, security boundaries, accessibility considerations, and assumptions.
Avoid comments that merely restate straightforward markup, styles, or scripts.

[Back to top](#contributing)

## Safety Guidelines

Do not commit sensitive data to this repository. If sensitive information has
been committed, rotate it immediately.

Grayhaven Systems LLC is not responsible for third-party contributions that
expose personal data, credentials, keys, or other sensitive material.

[Back to top](#contributing)
