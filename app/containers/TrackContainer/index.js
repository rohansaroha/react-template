import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { selectTrackContainer, selectSongError, selectSongData, selectCollectionId } from './selectors';
import saga from './saga';
import { trackContainerCreators } from './reducer';
import { useParams } from 'react-router-dom';
import SoundCard from 'components/SoundCard';
import { Skeleton } from 'antd';

export function TrackContainer({ dispatchSong, collectionId, songData, trackContainer }) {
  const params = useParams();
  useInjectSaga({ key: 'trackContainer', saga });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (songData && loader) {
      setLoader(false);
    }
  }, [songData]);

  useEffect(() => {
    if (params.id !== collectionId) {
      dispatchSong(params.id);
      setLoader(true);
    }
  });

  return (
    <div data-testid="track-container">
      <Skeleton loading={loader} active>
        <SoundCard songs={songData} complete={true} />
      </Skeleton>
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
  injectIntl
)(TrackContainer);

export const TrackContainerTest = compose(injectIntl)(TrackContainer);
