import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { TrackContainerTest as TrackContainer } from '../index';

describe('<TrackContainer /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackContainer dispatchSong={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should ensure that dispatch song is being called when collectionId changed', async () => {
    renderProvider(<TrackContainer collectionId="124" dispatchSong={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
  it('should ensure that dispatch song is not being called when collectionId is same', async () => {
    renderProvider(<TrackContainer collectionId="123" dispatchSong={submitSpy} />);
    await timeout(500);
    expect(submitSpy).not.toHaveBeenCalled();
  });
});
