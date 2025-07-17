#!/bin/bash

# This script assumes it will run after lint_and_check_sort.sh, so no need to run npm ci again
#source  "$(dirname "${BASH_SOURCE[0]}")/common/npm_ci.sh"

# get changed source files, from destination branch to current branch, filter deleted file names, as they can't be linted
CHANGED_FILES=$(git diff origin/$BITBUCKET_PR_DESTINATION_BRANCH...$BITBUCKET_BRANCH --name-only --diff-filter=d)
# get typescript files
TS_FILES_TO_LINT=$(echo "$CHANGED_FILES" | grep -E '(.ts|.tsx)$')
# if files exist, create a temp tsconfig file with the changed ts files as only included files
if [ -n "$TS_FILES_TO_LINT" ]; then echo "$TS_FILES_TO_LINT" | xargs npm run create-diff-tsconfig; fi
# run type-check with the temp tsconfig file
if [ -n "$TS_FILES_TO_LINT" ]; then npm run type-check -- --project tsconfig.diff.json; fi

# NOTE: If you want the type-check step to fail the build, instead of above line, you can add " || exit 1" at the end, like this:
# if [ -n "$TS_FILES_TO_LINT" ]; then npm run type-check -- --project tsconfig.diff.json || exit 1; fi

#remove the temp file created by create-diff-tsconfig
rm -f tsconfig.diff.json

