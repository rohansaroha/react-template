/**
 *
 * Tests for TrackContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { TrackContainerTest as TrackContainer } from '../index';

describe('<TrackContainer /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
