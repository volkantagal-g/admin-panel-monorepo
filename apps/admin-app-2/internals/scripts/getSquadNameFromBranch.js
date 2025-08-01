/*
  To be able to filter each squad's test cases, we can use the branch name and test tagging.
  If each squad tags their test cases with their squad name, we can run only the test cases of the squad that the branch belongs to.
*/

const { execSync } = require('child_process');

function getSquadNameFromBranch() {
  // read the branch name and return the squad name
// e.g. feature/SQUAD_NAME-1234 or task/SQUAD_NAME-1234 or bug/SQUAD_NAME-1234
// execute 'git branch' command to get the current branch name
  const branchName = execSync('git branch --show-current').toString().trim();

  // extract the squad name from the branch name
  const squadName = branchName.split('/')[1].split('-')[0];
  return squadName;
}

module.exports = { getSquadNameFromBranch };
