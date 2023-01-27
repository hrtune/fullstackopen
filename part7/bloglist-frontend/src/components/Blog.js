import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog } from "../reducers/blogReducer";
import Header from "./Header";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);

  const dispatch = useDispatch();

  const handleLike = async () => {
    dispatch(likeBlog(blog));
  };

  const Comments = () => {
    const comments = blog.comments;
    let i = 0;
    return (
      <div>
        <h3>comments</h3>
        {comments ? (
          <ul>
            {comments.map((c) => {
              const e = <li key={i}>{c}</li>;
              i++;
              return e;
            })}
          </ul>
        ) : (
          <p>No comments</p>
        )}
      </div>
    );
  };

  if (!blog) {
    return null;
  }
  return (
    <div>
      <Header />
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <br />
      <div>
        {blog.likes} likes<button onClick={handleLike}>👍</button>
      </div>
      <br />
      <div>added by {blog.user.name}</div>
      <Comments />
    </div>
  );
};

export default Blog;
