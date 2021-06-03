import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import { selectSongName, selectSongsData, selectSongsError } from './selectors';
import saga from './saga';
import styled from 'styled-components';
import { Card, Input } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useInjectReducer } from '@utils/injectReducer';
import reducer, { homeContainerCreators } from './reducer';
import get from 'lodash/get';
import If from '@components/If';
import Search from 'antd/es/input/Search';

const SearchBoxContainer = styled(Card)`
  && {
    text-align: center;
    margin: 1.25em auto;
  }
`;
const MusicBoxContainer = styled.div`
  && {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 90%;
    margin: 1.25em auto;
    max-height: 50em;
    overflow: scroll;
  }
`;
const SongContainer = styled(Card)`
  && {
    min-height: 14em;
    position: relative;
    box-sizing: border-box;
    width: 31%;
    border-radius: 0.6em;
    margin: 0.6rem auto;
  }
`;
const SearchBox = styled(Input)`
  && {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 60%;
  }
`;
const SongPrimary = styled.div`
  && {
    margin: 0.6rem 0 0.3rem 0;
    width: 95%;
    font-size: 1.1em;
    color: #083445;
  }
`;
const SongSecondary = styled.div`
  && {
    margin-bottom: 1em;
    font-size: 1em;
    color: #149cd0;
  }
`;
const AudioBox = styled.audio`
  && {
    width: 85%;
    position: absolute;
    bottom: 1rem;
  }
`;

export function HomeContainer({ dispatchSongs, songsData, songName }) {
  useInjectReducer({ key: 'HomeContainer', reducer });
  useInjectSaga({ key: 'HomeContainer', saga });
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = e => {
    dispatchSongs(e);
    setLoading(true);
  };
  const renderSongs = () => {
    const songs = get(songsData, 'results', []);
    return songs.map(song => (
      <SongContainer key={song.trackId}>
        <SongPrimary>{song.trackName}</SongPrimary>
        <SongSecondary>{song.artistName}</SongSecondary>
        <AudioBox controls>
          <source src={song.previewUrl} />
        </AudioBox>
      </SongContainer>
    ));
  };

  return (
    <div>
      <SearchBoxContainer>
        <Search
          placeholder="Enter the Song Name"
          style={{ width: '60%', margin: '0 auto' }}
          type="text"
          onPressEnter={e => handleOnSubmit(e.target.value)}
        />
      </SearchBoxContainer>
      <If condition={loading}>
        <MusicBoxContainer>{renderSongs()}</MusicBoxContainer>
      </If>
    </div>
  );
}

HomeContainer.propTypes = {
  dispatchSongs: PropTypes.func,
  songsData: PropTypes.object,
  songName: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  songsData: selectSongsData(),
  songName: selectSongName(),
  songsError: selectSongsError()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongsPlaylist } = homeContainerCreators;
  return {
    dispatchSongs: songName => {
      dispatch(requestGetSongs(songName));
    },
    dispatchClearSongsPlaylist: () => dispatch(clearSongsPlaylist())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo,
  withRouter
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
