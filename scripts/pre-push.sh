#!/usr/bin/env bash

set -e

# Validate that the commits being pushed follow the commit message convention.
# Unlike a commit-msg hook there is no single message to --edit here, so lint
# the range of commits that are not yet on the remote tracking branch.
BRANCH_NAME=$(git branch --show-current)

if [ -n "$BRANCH_NAME" ]; then
  REMOTE_REF="origin/$BRANCH_NAME"
  if git rev-parse --verify --quiet "$REMOTE_REF" >/dev/null; then
    # Lint only the new commits relative to what the remote already has.
    npx --no -- commitlint --from "$REMOTE_REF" --to HEAD
  else
    # No upstream yet (first push of this branch) — nothing to diff against.
    echo "pre-push: no remote ref $REMOTE_REF yet, skipping commit lint"
  fi
fi

finish() {
  result=$?
  # Add cleanup code here
  exit ${result}
}
trap finish EXIT ERR