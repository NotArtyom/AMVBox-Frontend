import React from 'react';

import { useParams } from 'react-router';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import LoginPage from './routes/LoginPage';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
import {Router} from 'react-router-dom';
import Navbar from './common/Navbar';

import { history } from './helpers/history';
import RegisterPage from './routes/RegistrationPage';
import MainPage from './routes/MainPage';
import EmailPage from './routes/EmailPage';
import ProfilePage from './routes/ProfilePage';
import CreatePost from './routes/CreatePost';
import Tracker from './routes/tracker/TrackerPage';
import MyPosts from './routes/MyPosts';


function App() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return (
     <Provider store={store}>
      <div className="App">
        <Navbar/>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/reg" component={RegisterPage} />
            <Route exact path="/" component={MainPage} />
            <Route exact path="/confirm" component={EmailPage}/>
            <Route exact path="/confirm/:token" children={<EmailPage/>}/>
            <Route exact path="/profile" component={ProfilePage}/>
            <Route exact path="/myposts" component={MyPosts}/>
            <Route exact path="/tracker" component={Tracker}/>
            <Route exact path="/create" component={CreatePost}/>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
