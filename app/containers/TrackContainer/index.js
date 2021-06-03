import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import { selectSongsError, selectSongData, selectCollectionId } from './selectors';
import saga from './saga';
import { trackContainerCreators } from '@containers/TrackContainer/reducer';

export function TrackContainer({ dispatchSong }) {
  useInjectSaga({ key: 'trackContainer', saga });
  useEffect(() => {
    // dispatchSong('539271205');
  }, []);
  return (
    <div>
      <T id={'TrackContainer'} />
    </div>
  );
}

TrackContainer.propTypes = {
  dispatchSong: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  selectCollectionId: selectCollectionId(),
  selectSongData: selectSongData(),
  selectSongsError: selectSongsError()
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

export default compose(withConnect)(TrackContainer);

export const TrackContainerTest = compose(injectIntl)(TrackContainer);
