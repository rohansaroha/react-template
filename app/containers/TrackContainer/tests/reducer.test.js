import { trackContainerReducer, trackContainerTypes, initialState } from '../reducer';

describe('TrackContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(trackContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return to update the state when an action of type REQUEST_GET_COLLECTION_ID is dispatched', () => {
    const collectionId = '1234';
    const expectedResult = { ...state, collectionId };
    expect(
      trackContainerReducer(state, {
        type: trackContainerTypes.REQUEST_GET_COLLECTION_ID,
        collectionId
      })
    ).toEqual(expectedResult);
  });
  it('should return to update the state when an action of type SUCCESS_GET_SONG is dispatched', () => {
    const songData = [{ artistName: 'Eminem' }];
    const expectedResult = { ...state, songData };
    expect(
      trackContainerReducer(state, {
        type: trackContainerTypes.SUCCESS_GET_SONG,
        songData
      })
    ).toEqual(expectedResult);
  });
  it('should return to update the state when an action of type FAILURE_GET_SONG is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, error };
    expect(
      trackContainerReducer(state, {
        type: trackContainerTypes.FAILURE_GET_SONG,
        error
      })
    ).toEqual(expectedResult);
  });
});
