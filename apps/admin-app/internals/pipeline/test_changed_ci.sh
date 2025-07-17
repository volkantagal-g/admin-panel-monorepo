#!/bin/bash

source  "$(dirname "${BASH_SOURCE[0]}")/common/npm_ci.sh"

COVERAGE_THRESHOLD_ENABLED=true npm run test-ci -- --changedSince=origin/dev
