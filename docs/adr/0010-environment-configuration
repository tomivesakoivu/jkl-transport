# Environment-Based Configuration: .env Files

## Context and Problem Statement

The application needs different configuration values for development, testing, and production (API credentials, database URLs, feature flags, polling intervals). The team must decide how to manage environment-specific configuration without hardcoding secrets or requiring recompilation for different environments.

## Considered Options

* Hardcode configuration in source code
* Environment variables loaded from .env files

## Decision Outcome

Chosen option: "Environment variables loaded from .env files", because it provides simple, portable configuration management that works across development, staging, and production without exposing secrets in version control.

### Consequences

* Good, because .env files allow different values for each environment (dev, staging, production)
* Good, because secrets (API credentials) never committed to git (.env in .gitignore)
* Good, because works consistently across macOS, Linux, and Windows
* Good, because simple setup: `npm install dotenv` and `require('dotenv').config()`
* Good, because easy to override for testing or local development
* Bad, because .env files are local-only (not version controlled)
* Bad, because team members must manually maintain identical .env templates
