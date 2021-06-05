import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = { collectionId: null, songData: [], error: null };

export const { Types: trackContainerTypes, Creators: trackContainerCreators } = createActions({
  requestGetCollectionId: ['collectionId'],
  successGetSong: ['songData'],
  failureGetSong: ['error']
});

/* eslint-disable default-case, no-param-reassign */
export const trackContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case trackContainerTypes.REQUEST_GET_COLLECTION_ID:
        draft.collectionId = action.collectionId;
        break;
      case trackContainerTypes.SUCCESS_GET_SONG:
        draft.songData = action.songData;
        break;
      case trackContainerTypes.FAILURE_GET_SONG:
        draft.error = get(action.error, 'message', 'something_went_wrong');
        break;
      default:
        return state;
    }
  });

export default trackContainerReducer;
