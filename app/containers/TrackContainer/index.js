import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { selectTrackContainer, selectSongError, selectSongData, selectCollectionId } from './selectors';
import saga from './saga';
import { trackContainerCreators } from './reducer';
import { withRouter } from 'react-router-dom';
import SoundCard from 'components/SoundCard';

export function TrackContainer(props) {
  useInjectSaga({ key: 'trackContainer', saga });

  useEffect(() => {
    const rawTrackId = props.location.pathname.split('/')[2];
    props.dispatchSong(rawTrackId);
  }, []);

  return (
    <div>
      <SoundCard songs={props.songData} complete={true} />
    </div>
  );
}

TrackContainer.propTypes = {
  location: PropTypes.object,
  dispatchSong: PropTypes.func,
  collectionId: PropTypes.any,
  songData: PropTypes.array,
  trackContainer: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  trackContainer: selectTrackContainer(),
  collectionId: selectCollectionId(),
  songData: selectSongData(),
  songError: selectSongError()
});

function mapDispatchToProps(dispatch) {
  const { requestGetCollectionId } = trackContainerCreators;
  return {
    dispatchSong: collectionId => {
      dispatch(requestGetCollectionId(collectionId));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo,
  withRouter,
  injectIntl
)(TrackContainer);

export const TrackContainerTest = compose(injectIntl)(TrackContainer);
