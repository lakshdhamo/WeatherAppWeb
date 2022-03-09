import { createStore } from 'vuex';
import locationModule from './location';
import unitModule from './unit';
import weatherModule from './weather';

export default createStore({
  modules: { unitModule, weatherModule, locationModule },
});
