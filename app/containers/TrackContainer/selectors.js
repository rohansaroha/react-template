import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the trackContainer state domain
 */

const selectTrackContainerDomain = state => state.trackContainer || initialState;

export const makeSelectTrackContainer = () =>
  createSelector(
    selectTrackContainerDomain,
    substate => substate
  );
export const selectSongData = () =>
  createSelector(
    selectTrackContainerDomain,
    substate => get(substate, 'songData', null)
  );
export const selectCollectionId = () =>
  createSelector(
    selectTrackContainerDomain,
    substate => get(substate, 'collectionId', null)
  );
export const selectSongsError = () =>
  createSelector(
    selectTrackContainerDomain,
    substate => get(substate, 'songError', null)
  );
