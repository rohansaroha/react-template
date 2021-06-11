import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import SoundCard from '../index';
import { fireEvent } from '@testing-library/dom';

describe('<SoundCard /> tests', () => {
  let submitSpy;
  beforeEach(() => {
    submitSpy = jest.fn();
  });
  const mockData = {
    trackId: '123'
  };
  it('should match the snapshot when data is loading', () => {
    const { baseElement } = renderWithIntl(<SoundCard song={mockData} loading={true} />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should contain 1 SoundCard component', () => {
    const { getAllByTestId } = renderWithIntl(<SoundCard song={mockData} />);
    expect(getAllByTestId('sound-card').length).toBe(1);
  });

  it('should match the snapshot when data is loaded ', () => {
    const { getAllByTestId } = renderWithIntl(<SoundCard song={mockData} loading={false} />);
    expect(getAllByTestId('link-track')).toMatchSnapshot();
  });

  it('should ensure that complete data is being displayed', () => {
    const { baseElement } = renderWithIntl(<SoundCard song={mockData} loading={false} complete={true} />);
    expect(baseElement).toMatchSnapshot();
  });
});
