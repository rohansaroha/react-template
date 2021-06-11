import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { selectSongError, selectSongData, selectCollectionId } from './selectors';
import saga from './saga';
import { trackContainerCreators } from './reducer';
import { useParams } from 'react-router-dom';
import SoundCard from 'components/SoundCard';

export function TrackContainer({ dispatchSong, collectionId, songData }) {
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
  }, []);

  return <SoundCard song={songData[0]} complete={true} loading={loader} />;
}

TrackContainer.propTypes = {
  location: PropTypes.object,
  dispatchSong: PropTypes.func,
  collectionId: PropTypes.any,
  songData: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
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
