#!/bin/bash

source  "$(dirname "${BASH_SOURCE[0]}")/common/npm_ci.sh"

# get changed source files, from destination branch to current branch, filter deleted file names, as they can't be linted
CHANGED_FILES=$(git diff origin/$BITBUCKET_PR_DESTINATION_BRANCH...$BITBUCKET_BRANCH --name-only --diff-filter=d)
# get javascript files
FILES_TO_LINT=$(echo "$CHANGED_FILES" | grep -E '(.js|.jsx|.ts|.tsx)$')
# if files exist, run lint on them, exit 1 at the end because the script doesn't fail for each command even if command returns non-zero exit code
if [ -n "$FILES_TO_LINT" ]; then echo "$FILES_TO_LINT" | xargs npm run lint-files  || exit 1; fi
# get changed json files which are in the app directory (avoid package.json etc..)
JSON_FILES_TO_CHECK=$(echo "$CHANGED_FILES" | grep -E '.*app/.*.json$')
# if any json files edited, run sort on them
if [ -n "$JSON_FILES_TO_CHECK" ]; then echo "$JSON_FILES_TO_CHECK" | xargs npm run sort; fi
# if there are changes after sort, it means there were unsorted json files, exit with failure
echo "Fail in this step means you have unsorted json files" && git diff --exit-code -- './app'
