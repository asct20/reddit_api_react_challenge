import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Login(props) {
  const history = useHistory();
  const [showError, setShowError] = useState(false);
  const searchParams = window.location.hash.replace('#', '');
  const params = new URLSearchParams(searchParams);
  const authToken = params.get('access_token');

  const setToken = () => {
    if (!authToken) {
      setShowError(true);
      return;
    }

    props.setAuthToken(authToken);
    history.push('/TopPosts');
  }

  useEffect(setToken, []); // pass empty array to call the function only once

  return (
    <div>
      <p>Authenticating with Reddit...</p>

      {showError &&
        <p>An error occurred, please <a href="/LinkToRedditAuth">try again.</a></p>
      }
    </div>
  );
}

Login.propTypes = {
  setAuthToken: PropTypes.func.isRequired
};

export default Login;