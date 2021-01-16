import './App.css';
import { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import TopPosts from './components/TopPosts/TopPosts';
import Login from './components/Login/Login';
import LinkToRedditAuth from './components/LinkToRedditAuth/LinkToRedditAuth';
import { useCookies, Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  const AUTH_COOKIE_NAME = 'last-laugh-auth-token';

  //const cookies = { props };
  const [cookie, setCookie] = useCookies([AUTH_COOKIE_NAME]);
  const authCookie = cookie && cookie.hasOwnProperty(AUTH_COOKIE_NAME)
    ? cookie[AUTH_COOKIE_NAME]
    : null;
  const [authToken, setAuthToken] = useState(authCookie || null);

  const isLoggedIn = () => authToken !== null;

  const onNewAuthToken = (token) => {
    setAuthToken(token);
    setCookie(AUTH_COOKIE_NAME, token, { path: '/' });
  }

  const clearAuthToken = () => onNewAuthToken(null);

  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <Switch>
            <PrivateRoute path="/TopPosts" isLoggedIn={isLoggedIn} component={TopPosts} authToken={authToken} clearAuthToken={clearAuthToken} />

            <Route path="/LinkToRedditAuth">
              <LinkToRedditAuth />
            </Route>

            <Route path="/Login">
              <Login setAuthToken={onNewAuthToken} />
            </Route>

            {/* redirect to TopPosts by default */}
            <Redirect to="/TopPosts" /> 
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
}

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
  <Route {...rest} render={(props) => (
    isLoggedIn()
      ? <Component {...rest} />
      : <Redirect to="/LinkToRedditAuth"/>
  )} />
);}

// const PrivateRoute = ({ isLoggedIn, ...props }) =>
//   {
//     const what = { ...props};
//     console.log("props: " + props);
//     return isLoggedIn()
//     ? <Route { ...props } />
//     : <Redirect to="/LinkToRedditAuth" />
//   }

App.propTypes = {
  cookies: instanceOf(Cookies).isRequired
};

export default withCookies(App);
