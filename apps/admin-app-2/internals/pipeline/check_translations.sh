#!/bin/bash

# This script assumes it will run after lint_and_check_sort.sh, so no need to run npm ci again

# get changed source files, from destination branch to current branch, filter deleted file names, as they can't be linted
CHANGED_FILES=$(git diff origin/$BITBUCKET_PR_DESTINATION_BRANCH...$BITBUCKET_BRANCH --name-only --diff-filter=d)
JSON_FILES_TO_CHECK=$(echo "$CHANGED_FILES" | grep -E '.*app/translations/.*.json$')
if [ -n "$JSON_FILES_TO_CHECK" ]; then echo "$JSON_FILES_TO_CHECK" | xargs npm run check-translations || exit 1;  fi
