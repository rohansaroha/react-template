import { fromJS } from 'immutable';
import { selectTrackContainerDomain } from '../selectors';

describe('TrackContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      trackContainer: fromJS({})
    };
  });

  it('should select the user state', () => {
    expect(selectTrackContainerDomain(mockedState)).toEqual(mockedState.trackContainer.toJS());
  });
});
