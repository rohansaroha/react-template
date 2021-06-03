/**
 * Test trackContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import trackContainerSaga, { defaultFunction } from '../saga';
import { trackContainerTypes } from '../reducer';

describe('TrackContainer saga tests', () => {
  const generator = trackContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(trackContainerTypes.DEFAULT_ACTION, defaultFunction));
  });
});
