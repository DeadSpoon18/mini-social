import Post from "../models/postModel.js";
import expressAsyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

// @desc CREATE post
// @Route POST /api/post/
// @access Private
export const createPost = expressAsyncHandler(async (req, res) => {
  const { title, description, thumbnail } = req.body;
  const post = new Post({
    title,
    description,
    thumbnail,
    user: req.user._id,
  });
  const newPost = await post.save();
  res.status(201).json(newPost);
});

// @desc Fetch all post
// @Route GET /api/post/
// @access Private
export const getAllPost = expressAsyncHandler(async (req, res) => {
  let following = [];
  let filteredPosts = [];
  const user = await User.findById(req.user._id);
  following = user.following;
  for (let i = 0; i < following.length; i++) {
    const id = following[i];
    let post = await Post.findOne({ user: id }).populate("user", "name");
    if (post) {
      filteredPosts.push(post);
    }
  }
  res.json(filteredPosts);
});

// @desc Fetch logged In user post
// @Route GET /api/post/myPosts
// @access Private
export const getMyPost = expressAsyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id });
  res.json(posts);
});

// @desc Update post
// @Route Put /api/post/:id
// @access Private
export const updatePost = expressAsyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const { title, description, thumbnail } = req.body;
  if (post) {
    post.title = title || post.title;
    post.description = description || post.description;
    post.thumbnail = thumbnail || post.thumbnail;
    const updatedPost = await post.save();
    res.status(201).json(updatedPost);
  } else {
    res.status(401);
    throw new Error("Post not found");
  }
});

// @desc FETCH Post BY ID
// @route GET /api/post/:id
// @access Private
export const getPostById = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found.");
  }
});

// @desc Delete post
// @Route delete /api/post/:id
// @access Private
export const deleteProfilePost = expressAsyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.remove();
    res.json({ message: "Post removed" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc Like post
// @Route Put /api/post/:id/likePost
// @access Private
export const likePost = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (post) {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.json({ message: "Liked" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});
