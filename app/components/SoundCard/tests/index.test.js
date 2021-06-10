import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import SoundCard from '../index';

describe('<SoundCard /> tests', () => {
  let submitSpy;
  beforeEach(() => {
    submitSpy = jest.fn();
  });
  const mockData = {
    trackId: '123'
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<SoundCard song={mockData} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 SoundCard component', () => {
    const { getAllByTestId } = renderWithIntl(<SoundCard song={mockData} />);
    expect(getAllByTestId('sound-card').length).toBe(1);
  });
});
