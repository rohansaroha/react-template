import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Input, Skeleton, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import If from '@components/If';
import { For } from '@components/For';
import { colors, fonts } from '@app/themes';

const IfSongContainer = styled(Card)`
  && {
    padding: 0;
    min-height: ${props => (props.complete ? '22em' : '16em')};
    position: relative;
    box-sizing: border-box;
    border-radius: 0.6em;
    margin: ${props => (props.complete ? '2em auto' : '0.6em auto')};
    flex-basis: ${props => (props.complete ? '45%' : '30%')};
  }
`;
const SearchBox = styled(Input)`
  && {
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
`;
const HeaderBox = styled.div`
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
    ${props => (props.complete ? fonts.size.xRegular : fonts.size.regular)}
    color: ${colors.textPrimary};
  }
`;
const AudioImg = styled.img`
  && {
    max-height: ${props => (props.complete ? '12em' : '8em')};
    flex: ${props => (props.complete ? '2' : '1')};
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
const ButtonSong = styled(Button)`
  && {
    margin: 2rem auto;
  }
`;
function SoundCard({ songs, complete, loading }) {
  return (
    <div data-testid="sound-card">
      <For
        type="array"
        style={{ flexWrap: 'wrap' }}
        of={songs}
        renderItem={(song, index) => {
          const ButtonHandler = () => {
            window.location.href = song.trackViewUrl;
          };
          return (
            <IfSongContainer condition={song.trackId && song.previewUrl} key={index} complete={complete}>
              <Skeleton loading={loading} active>
                <NavLink to={`/track/${song.trackId}`}>
                  <HeaderBox>
                    <AudioImg src={song.artworkUrl100} alt={song.trackName} complete={complete} />
                    <div style={{ flex: 4 }}>
                      <SongPrimary complete={complete}>{song.trackName}</SongPrimary>
                      <SongSecondary>{song.artistName}</SongSecondary>
                      <If condition={complete}>
                        <ButtonSong danger onClick={ButtonHandler}>
                          Play Full Song
                        </ButtonSong>
                      </If>
                    </div>
                  </HeaderBox>
                </NavLink>
                <AudioBox controls>
                  <source src={song.previewUrl} />
                </AudioBox>
              </Skeleton>
            </IfSongContainer>
          );
        }}
      />
    </div>
  );
}
SoundCard.propTypes = {
  songs: PropTypes.array,
  complete: PropTypes.bool,
  loading: PropTypes.bool
};

export default SoundCard;
