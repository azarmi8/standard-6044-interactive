# Agent HQ Parallel E2E Bridge

This public repository supplies free GitHub-hosted runner capacity for bounded Agent HQ integration proofs.

The private `azarmi8/agent-hq` repository remains the source of truth. The bridge only:
- clones private Agent HQ with a dedicated source token that has only the minimum read access needed for repository contents;
- runs a bounded three-brain Copilot CLI E2E;
- returns summarized evidence to Agent HQ Issue #132.

Required bridge secrets:\n- `AGENT_HQ_SOURCE_TOKEN`: private Agent HQ Contents:Read source credential.\n- `AGENT_HQ_COPILOT_TOKEN`: Copilot Requests credential.\n- `AGENT_HQ_REPO_TOKEN`: separate Issue/PR gateway credential used only to publish evidence.\n\nSecrets are never put in mission payloads. Fork pull requests do not receive executor credentials because the workflow requires the pull request head repository to equal this repository.
