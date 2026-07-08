# Grayhaven Systems LLC Website

| Check | Status |
| --- | --- |
| CI | [![CI](https://github.com/dean1012/grayhaven-web/actions/workflows/ci.yml/badge.svg)](https://github.com/dean1012/grayhaven-web/actions/workflows/ci.yml) |
| Production | [![Prod Deploy](https://github.com/dean1012/grayhaven-web/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/dean1012/grayhaven-web/actions/workflows/deploy.yml?query=branch%3Amain) |
| Development | [![Dev Deploy](https://github.com/dean1012/grayhaven-web/actions/workflows/deploy.yml/badge.svg?branch=dev)](https://github.com/dean1012/grayhaven-web/actions/workflows/deploy.yml?query=branch%3Adev) |

This repository contains the Grayhaven Systems LLC website source. It is public
for transparency and operational demonstration.

This repository does not contain sensitive data.

## Table of Contents

- [Scope](#scope)
- [Contributing](#contributing)
- [License](#license)

## Scope

- Maintain the public Grayhaven Systems LLC website.
- Store deployable static frontend content under `site/frontend/`.
- Validate website HTML, CSS, JavaScript, YAML, and Markdown through GitHub
  Actions.

Continuous deployment is managed through GitHub repository variables and
secrets. See the
[hosted-domain repository setup](https://github.com/dean1012/grayhaven-vault-example/blob/main/docs/setup.md#set-up-hosted-domain-repositories)
documentation in `grayhaven-vault-example` for the required deployment
settings.

This repository is not a general-purpose website template. Reusing it for
another organization requires review, adaptation, and separate branding.

[Back to top](#grayhaven-systems-llc-website)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, validation
commands, and contribution guidelines.

[Back to top](#grayhaven-systems-llc-website)

## License

[MIT](LICENSE)

[Back to top](#grayhaven-systems-llc-website)
