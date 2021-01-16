import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as RedditConfig from '../../config/RedditConfig';

class LinkToRedditAuth extends Component {
  getRedditLoginUrl() {
    const state = uuidv4();

    let url = RedditConfig.REDDIT_AUTHORIZE_URL;
    url += `?client_id=${RedditConfig.REDDIT_CLIENT_ID}`;
    url += '&response_type=token';
    url += `&state=${state}`;
    url += `&redirect_uri=${RedditConfig.REDDIT_REDIRECT_URL}`;
    url += '&duration=temporary';
    url += '&scope=read';

    return url;
  }

  render() {
    return (
      <div>
        <h1>Login to Reddit</h1>

        <p>To login, please visit the link below:</p>
        <a href={this.getRedditLoginUrl()}>Log in to Reddit</a>
      </div>
    );
  }
}

export default LinkToRedditAuth;