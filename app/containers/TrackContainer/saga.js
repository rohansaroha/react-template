import { call, put, takeLatest } from 'redux-saga/effects';
import { getSongs } from '@services/iTunesApi';
import { trackContainerTypes, trackContainerCreators } from './reducer';
const { REQUEST_GET_COLLECTION_ID } = trackContainerTypes;

const { successGetSong, failureGetSong } = trackContainerCreators;

export function* asyncFunction(action) {
  const response = yield call(getSongs, action.collectionId);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSong(data.results));
  } else {
    yield put(failureGetSong(data));
  }
}

export default function* trackContainerSaga() {
  yield takeLatest(REQUEST_GET_COLLECTION_ID, asyncFunction);
}
