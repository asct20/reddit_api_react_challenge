import { useEffect, useState } from 'react';
import { Spinner, Alert, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as RedditConfig from '../../config/RedditConfig';
import PostList from '../PostList/PostList';

function TopPosts(props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // Number of posts to fetch. Defining it as a constant here but
  // if this needed to be configurable, we could pass it as a prop or as a query parameter.
  const POSTS_COUNT = 20;

  const formatData = (data) => {
    if (!data || !data.data || !data.data.children) {
      throw Error('Invalid data');
    }

    // Use destructuring to pick only some properties from each post data
    const postsData = data.data.children.map(e => 
      ((
        {
          ups,
          score,
          author,
          permalink,
          title,
          num_comments,
          id
        }
      ) => (
        {
          ups,
          score,
          author,
          permalink,
          title,
          num_comments,
          id
        } 
      ))(e.data))
      .sort((post1, post2) => post2.num_comments - post1.num_comments);

      return postsData;
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const url = `${RedditConfig.REDDIT_TOP_POSTS_URL}?limit=${POSTS_COUNT}`;

    try {
      const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.authToken}`
        }
      });

      if (!rawResponse.ok) {
        if (rawResponse.status === 401) {
          props.clearAuthToken();
          window.location.reload();
        }
        throw Error(`Error ${rawResponse.status} ${rawResponse.statusText}`);
      }

      const data = await rawResponse.json();
      const postsData = formatData(data);
      setPosts(postsData);
    }
    catch (err) {
      setErrorMessage(err.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  // Fetch data on page load
  useEffect(() => {
    async function callFetchPosts() {
      await fetchPosts();
    }

    callFetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // pass empty array to call the function only once

  return (
    <div>
      { errorMessage && <Alert variant='danger'>
          {errorMessage}
        </Alert>
      }

      <h1 style={{float: 'left'}}>Top Posts</h1>
      <Button
        variant="outline-primary"
        style={{float: 'right'}}
        onClick={fetchPosts}>Refresh</Button>

        { isLoading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>)
          : (<PostList posts={posts} />)
        }
    </div>
  );
}

TopPosts.propTypes = {
  clearAuthToken: PropTypes.func.isRequired
};

export default TopPosts;