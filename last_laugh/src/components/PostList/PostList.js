import PropTypes from 'prop-types';
import Post from '../Post/Post';
import { Table } from 'react-bootstrap';

function PostList(props) {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Comments</th>
          <th>Title</th>
          <th>Author</th>
          <th>Upvotes</th>
        </tr>
      </thead>
      <tbody>
        {props.posts.map(post => <Post key={post.id} post={post} />)}
      </tbody>
    </Table>
  );
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostList;