import { call, put, takeLatest } from 'redux-saga/effects';
import trackContainerSaga, { asyncFunction } from '../saga';
import { trackContainerTypes } from '../reducer';
import { getSongs } from '@services/iTunesApi';
import { apiResponseGenerator } from '@utils/testUtils';

describe('TrackContainer saga tests', () => {
  const generator = trackContainerSaga();
  const collectionId = 'eminem';
  let asyncGetSongGenerator = asyncFunction({ collectionId });

  it('should start task to watch for REQUEST_GET_SONGS action', () => {
    expect(generator.next().value).toEqual(takeLatest(trackContainerTypes.REQUEST_GET_COLLECTION_ID, asyncFunction));
  });
  it('should ensure that FAILURE_GET_SONG is dispatched when the api call fails', () => {
    const res = asyncGetSongGenerator.next().value;
    expect(res).toEqual(call(getSongs, collectionId));
    const errorResponse = {
      errorMessage: 'There was an error while fetching song information'
    };
    expect(asyncGetSongGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: trackContainerTypes.FAILURE_GET_SONG,
        error: errorResponse
      })
    );
  });
  it('should ensure that SUCCESS_GET_SONG is dispatched when the api call succeeds', () => {
    asyncGetSongGenerator = asyncFunction({ collectionId });
    const res = asyncGetSongGenerator.next().value;
    expect(res).toEqual(call(getSongs, collectionId));
  });
});
