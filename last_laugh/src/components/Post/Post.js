import PropTypes from 'prop-types';
import * as RedditConfig from '../../config/RedditConfig';
import './Post.css';

function Post(props) {
  const permalink = `${RedditConfig.REDDIT_BASE_URL}/${props.post.permalink}`;

  return (
    <tr className={props.post.score % 2 === 0 ? 'Even-score-row' : 'Odd-score-row'}>
      <td xs="true">{ props.post.num_comments }</td>
      <td lg="4">
        <a href={ permalink } target='_blank' rel='noreferrer' title='Go to post'>{ props.post.title }</a>
      </td>
      <td lg="2">{ props.post.author }</td>
      <td xs="true">{ props.post.ups }</td>
    </tr>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;