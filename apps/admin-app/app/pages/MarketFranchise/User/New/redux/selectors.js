import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_FRANCHISE.USER.NEW;

export const createMarketFranchiseUserSelector = { getIsPending: state => state[reducerKey]?.createMarketFranchiseUser?.isPending };
