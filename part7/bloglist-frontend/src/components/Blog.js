import { useDispatch } from "react-redux";
import { removeBlog, changeView, likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, owned }) => {
  const dispatch = useDispatch();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClick = () => {
    dispatch(changeView(blog.id));
  };

  const handleRemove = async () => {
    dispatch(removeBlog(blog));
  };

  const handleLike = async () => {
    dispatch(likeBlog(blog));
  };

  const simplifiedBlog = () => (
    <div style={blogStyle} className="blog-simple">
      {blog.title} {blog.author}{" "}
      <button id="show-button" onClick={handleClick}>
        ℹ️
      </button>
    </div>
  );

  const detailedBlog = () => (
    <div style={blogStyle} className="blog-detail">
      {blog.title}{" "}
      <button id="hide-button" onClick={handleClick}>
        🙈
      </button>{" "}
      <br />
      <div className="blog-url">
        {blog.url} <br />
      </div>
      <div className="blog-likes">
        likes {blog.likes}{" "}
        <button id="like-button" onClick={handleLike}>
          like
        </button>{" "}
        <br />
      </div>
      {blog.author} <br />
      {owned && (
        <div className="remove-button">
          <button id="remove-button" onClick={handleRemove}>
            remove
          </button>
        </div>
      )}
    </div>
  );

  return blog.viewMode ? detailedBlog() : simplifiedBlog();
};

export default Blog;
