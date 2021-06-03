import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer';
import routeConstants from '@utils/routeConstants';
import { TrackContainer } from '@containers/TrackContainer';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  track: {
    component: TrackContainer,
    route: '/track/:id'
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
