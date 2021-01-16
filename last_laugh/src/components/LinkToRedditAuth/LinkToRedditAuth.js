import { Card, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import * as RedditConfig from '../../config/RedditConfig';

function LinkToRedditAuth(props) {
  const getRedditLoginUrl = () => {
    const state = uuidv4();

    let url = RedditConfig.REDDIT_AUTHORIZE_URL;
    url += `?client_id=${RedditConfig.REDDIT_CLIENT_ID}`;
    url += '&response_type=token';
    url += `&state=${state}`;
    url += `&redirect_uri=${RedditConfig.REDDIT_REDIRECT_URL}`;
    url += '&duration=temporary';
    url += '&scope=read';

    return url;
  };

  return (
    <Card>
      <Card.Header as="h1">Reddit Login</Card.Header>
      <Card.Body>
        <p>To use this application, you need to login to Reddit and allow read access.</p>
        <p>Please visit the link below. After you log in, you will be redirected back to this page.</p>
        <Button
          variant="outline-primary"
          href={getRedditLoginUrl()}>
            Log in
        </Button>
      </Card.Body>
    </Card>
  );
}

export default LinkToRedditAuth;