# Agent HQ Parallel E2E Bridge

This public repository supplies free GitHub-hosted runner capacity for bounded Agent HQ integration proofs.

The private `azarmi8/agent-hq` repository remains the source of truth. The bridge only:
- clones private Agent HQ with a separately scoped repository token;
- runs a bounded three-brain Copilot CLI E2E;
- returns summarized evidence to Agent HQ Issue #132.

Secrets are never put in mission payloads. Fork pull requests do not receive executor credentials because the workflow requires the pull request head repository to equal this repository.
