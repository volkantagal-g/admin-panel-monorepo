#!/bin/bash

source  "$(dirname "${BASH_SOURCE[0]}")/common/npm_ci.sh"

# runs after a commit pushed to master, there is nothing to block
# after tests run, sonar runs, we still want to analyze with sonar
COVERAGE_THRESHOLD_ENABLED=false npm run test-ci
