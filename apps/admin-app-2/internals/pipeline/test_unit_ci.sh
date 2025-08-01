#!/bin/bash

source  "$(dirname "${BASH_SOURCE[0]}")/common/npm_ci.sh"

npm run test -- --runInBand --ci --silent --changedSince=origin/dev '.*.unit.test.js'
