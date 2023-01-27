const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;
  if (!user) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }

  const blog = new Blog({
    ...body,
    likes: body.likes || 0,
    user: user._id,
  });
  const savedBlog = await (
    await blog.save()
  ).populate("user", { username: 1, name: 1 });

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const id = request.params.id;
  const comment = request.body.comment;

  const user = request.user;
  if (!user) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }

  if (!comment) {
    return response.status(400).json({
      error: "comment cannot be empty",
    });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(400).json({
      error: "no such blog",
    });
  }

  blog.comments = blog.comments.concat(comment);
  if (await blog.save()) {
    response.status(201).json({ comment });
  } else {
    response.status(500).json({
      error: "something wrong",
    });
  }
});

blogsRouter.get("/:id/comments", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  response.json({
    comments: blog.comments,
  });
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return response.status(204).end();
  }

  const user = request.user;

  if (user._id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  await Blog.findByIdAndDelete(blogId);

  // delete the blog from the user object
  user.blogs = user.blogs.filter((b) => b.toString() !== blogId);
  await user.save();

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blogId = request.params.id;
  const oldBlog = await Blog.findById(blogId);
  if (!oldBlog) {
    return response.status(404).json({
      error: "blog is not found",
    });
  }

  const newBlog = {
    ...request.body,
    user: oldBlog.user, // user should be the same
  };

  const onlyDifferInLikes =
    newBlog.author === oldBlog.author &&
    newBlog.title === oldBlog.title &&
    newBlog.url === oldBlog.url;

  const user = request.user;

  if (!onlyDifferInLikes && user._id.toString() !== oldBlog.user.toString()) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
