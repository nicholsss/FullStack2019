const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};
const initialBlogs = [
  {
    title: "title",
    author: "author",
    url: "url",
    likes: 2
  },
  {
    title: "title2",
    author: "author2",
    url: "url",
    likes: 2
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("right amount of json blogs", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(initialBlogs.length);
});

test("check that id is id", async () => {
  await api.get("/api/blogs");
  const response = await api.get("/api/blogs");
  for (let blog of response.body) {
    expect(blog.id).toBeDefined();
  }
});

test("check added post amount", async () => {
  const newBlog = {
    title: "String",
    author: "String",
    url: "String",
    likes: Number
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map(r => r.title);

  expect(response.body.length).toBe(initialBlogs.length + 1);
  expect(contents).toContain("String");
});

test("check likes if 0", async () => {
  const newBlog = {
    title: "String",
    author: "String",
    url: "String",
    likes: undefined
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200);

  const response = await api.get("/api/blogs");
  const contents = response.body.map(r => r.likes);
  expect(contents[contents.length - 1]).toBe(0);
});

test("check no empty title, url", async () => {
  const newBlog = {
    title: undefined,
    author: undefined,
    url: undefined,
    likes: undefined
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blocksAtEnd = await blogsInDb();

  expect(blocksAtEnd.length).toBe(initialBlogs.length - 1);

  const titles = blocksAtEnd.map(r => r.title);

  expect(titles).not.toContain(blogToDelete.title);
});

afterAll(() => {
  mongoose.connection.close();
});
