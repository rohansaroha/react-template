import { selectTrackContainer, selectCollectionId, selectSongData, selectSongError } from '../selectors';

describe('TrackContainer selector tests', () => {
  let mockedState;
  let collectionId;
  let songData;
  let songError;

  beforeEach(() => {
    collectionId = '1234';
    songData = [{ artistName: 'eminem' }];
    songError = 'there was some error';
    mockedState = {
      trackContainer: {
        collectionId,
        songData,
        songError
      }
    };
  });

  it('should select the homeContainer state', () => {
    const trackContainerSelector = selectTrackContainer();
    expect(trackContainerSelector(mockedState)).toEqual(mockedState.trackContainer);
  });
  it('should select the song name', () => {
    const collectionIdSelector = selectCollectionId();
    expect(collectionIdSelector(mockedState)).toEqual(collectionId);
  });
  it('should select the songs Data', () => {
    const songDataSelector = selectSongData();
    expect(songDataSelector(mockedState)).toEqual(songData);
  });
  it('should select the song error', () => {
    const songErrorSelector = selectSongError();
    expect(songErrorSelector(mockedState)).toEqual(songError);
  });
});
