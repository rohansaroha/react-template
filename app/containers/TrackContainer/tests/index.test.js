/**
 *
 * Tests for TrackContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
import { TrackContainerTest as TrackContainer } from '../index';
// import { fireEvent } from '@testing-library/dom'

describe('<TrackContainer /> container tests', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
      id: '1234'
    }),
    useRouteMatch: () => ({ url: `/search?term=1234` })
  }));

  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
