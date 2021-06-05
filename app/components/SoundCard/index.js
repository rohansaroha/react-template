import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import If from '@components/If';
import For from '@components/For';
import { colors, fonts } from '@app/themes';

const IfSongContainer = styled(Card)`
  && {
    padding: 0;
    min-height: ${props => (props.complete ? '20em' : '16em')};
    position: relative;
    box-sizing: border-box;
    border-radius: 0.6em;
    margin: 0.6em auto;
    flex-basis: 30%;
  }
`;
const SearchBox = styled(Input)`
  && {
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
`;
const HeaderBox = styled(NavLink)`
  && {
    margin: 0 auto;
    display: flex;
    gap: 1em;
  }
`;
const SongPrimary = styled.div`
  && {
    max-height: 3em;
    overflow: hidden;
    margin: 0.6em 0 0.3em 0;
    ${fonts.size.regular};
    color: ${colors.textPrimary};
  }
`;
const AudioImg = styled.img`
  && {
    max-height: 8em;
    flex: 1;
    border-radius: 0.4em;
  }
`;
const SongSecondary = styled.div`
  && {
    overflow: hidden;
    margin-bottom: 1em;
    ${fonts.size.small};
    color: ${colors.textSecondary};
  }
`;
const AudioBox = styled.audio`
  && {
    width: 90%;
    position: absolute;
    bottom: 1em;
  }
`;
function SoundCard({ songs, complete }) {
  return (
    <For
      style={{ flexWrap: 'wrap' }}
      of={songs}
      renderItem={(song, index) => {
        return (
          <IfSongContainer condition={song.trackId && song.previewUrl} key={index}>
            <HeaderBox to={`/track/${song.trackId}`}>
              <AudioImg src={song.artworkUrl100} alt={song.trackName} />
              <div style={{ flex: 4 }}>
                <SongPrimary>{song.trackName}</SongPrimary>
                <SongSecondary>{song.artistName}</SongSecondary>
              </div>
            </HeaderBox>
            <If condition={complete}>
              <div>{song.shortDescription}</div>
            </If>
            <AudioBox controls>
              <source src={song.previewUrl} />
            </AudioBox>
          </IfSongContainer>
        );
      }}
    />
  );
}
SoundCard.propTypes = {
  songs: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    artistName: PropTypes.string,
    previewUrl: PropTypes.string,
    shortDescription: PropTypes.string,
    artworkUrl100: PropTypes.string
  }),
  complete: PropTypes.bool
};

export default SoundCard;
