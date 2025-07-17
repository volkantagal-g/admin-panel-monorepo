// import { stdout } from 'process';

// import { SQUAD_BRANCH_NAME_SET, SQUAD_BRANCH_NAME_TO_TAG } from 'internals/squadShortNames';
// import { getSquadNameFromBranch } from './getSquadNameFromBranch';

const { stdout } = require('process');

const { SQUAD_BRANCH_NAME_SET, SQUAD_BRANCH_NAME_TO_TAG } = require('../constants/squadShortNames');
const { getSquadNameFromBranch } = require('./getSquadNameFromBranch');
const { TEST_TAG } = require('../constants/testTag');

const squadName = getSquadNameFromBranch();

if (!SQUAD_BRANCH_NAME_SET.has(squadName)) {
  throw new Error(`Invalid squad name: ${squadName}`);
}

// Each team has their own tests + all other teams' smoke tests for verification of the whole system
// example: '@squadName|@smoke', so that grep will find all the tests for the squad and non-squad smoke tests
const grepPattern = `${SQUAD_BRANCH_NAME_TO_TAG[squadName]}|${TEST_TAG.SMOKE}`;

stdout.write(grepPattern);
