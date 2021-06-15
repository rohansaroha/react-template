import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { selectSongName, selectSongsData, selectSongsError } from './selectors';
import saga from './saga';
import styled from 'styled-components';
import { Card, Input, Spin } from 'antd';
import PropTypes from 'prop-types';
import { homeContainerCreators } from './reducer';
import SoundCard from '@components/SoundCard';
import { colors, fonts } from '@app/themes';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import For from '@components/For';
import If from '@components/If';

const { Search } = Input;

const SearchBoxContainer = styled(Card)`
  && {
    text-align: center;
    margin: 1em auto;
  }
`;
const MusicBoxContainer = styled.div`
  && {
    margin: 1.3em auto;
    max-height: 35em;
    overflow: scroll;
  }
`;
const SearchBox = styled(Search)`
  && {
    width: 60%;
    margin: 0 auto;
  }
`;
const CustomCard = styled(Card)`
  && {
    width: 90%;
    margin: 0 auto;
    height: 20em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const TextPrimary = styled.div`
  && {
    color: ${colors.textPrimary};
    ${fonts.size.extraLarge};
    text-transform: capitalize;
    letter-spacing: 2px;
  }
`;

export function HomeContainer({ dispatchSongs, songsData, songName, intl, dispatchClearSongsPlaylist }) {
  useInjectSaga({ key: 'homeContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (songsData && loading) {
      setLoading(false);
    }
  }, [songsData]);

  useEffect(() => {
    if (songName && !songsData?.items?.length) {
      dispatchSongs(songName);
      setLoading(true);
    }
  }, []);
  const handleOnChange = sName => {
    if (!isEmpty(sName)) {
      dispatchSongs(sName);
      setLoading(true);
    } else {
      dispatchClearSongsPlaylist();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  const renderEmptyPlaylist = () => {
    return (
      <CustomCard>
        <TextPrimary>{intl.formatMessage({ id: 'empty_songs_text' })}</TextPrimary>
      </CustomCard>
    );
  };

  return (
    <div>
      <SearchBoxContainer>
        <SearchBox
          data-testid="search-box"
          placeholder={intl.formatMessage({ id: 'search_song' })}
          type="text"
          value={songName}
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </SearchBoxContainer>
      <MusicBoxContainer>
        <If condition={songName} otherwise={renderEmptyPlaylist()}>
          <For
            style={{ flexWrap: 'wrap' }}
            of={songsData}
            renderItem={(song, index) => {
              return (
                <If condition={song.trackId && song.previewUrl}>
                  <SoundCard key={index} song={song} loading={loading} />
                </If>
              );
            }}
          />
        </If>
      </MusicBoxContainer>
    </div>
  );
}

HomeContainer.propTypes = {
  intl: PropTypes.object,
  dispatchSongs: PropTypes.func,
  songsData: PropTypes.array,
  songName: PropTypes.string,
  dispatchClearSongsPlaylist: PropTypes.func
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
  memo
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
