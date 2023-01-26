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
    </div>
  );
};

export default Blog;
