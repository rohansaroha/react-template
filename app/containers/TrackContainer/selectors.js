import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

export const selectTrackContainerDomain = state => state.trackContainer || initialState;

export const selectTrackContainer = () =>
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
export const selectSongError = () =>
  createSelector(
    selectTrackContainerDomain,
    substate => get(substate, 'songError', null)
  );
