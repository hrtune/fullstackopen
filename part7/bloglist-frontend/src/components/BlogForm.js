import { useSelector, useDispatch } from "react-redux";
import { setTitle, setAuthor, setUrl } from "../reducers/blogFormReducer";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();
  const { title, author, url } = useSelector((state) => state.blogForm);

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
      likes: 0,
    };

    dispatch(createBlog(newBlog));

    dispatch(setTitle(""));
    dispatch(setAuthor(""));
    dispatch(setUrl(""));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="blogform-title"
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => {
              dispatch(setTitle(target.value));
            }}
          />
        </div>
        <div>
          author:
          <input
            id="blogform-author"
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => {
              dispatch(setAuthor(target.value));
            }}
          />
        </div>
        <div>
          url:
          <input
            id="blogform-url"
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => {
              dispatch(setUrl(target.value));
            }}
          />
        </div>
        <button id="blogform-submit" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
