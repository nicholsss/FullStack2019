const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
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

describe("when there is initially one user at db",  () => {
  beforeEach(async () => {
    await User.remove({});
    const user = new User({ username: "root", password: "sekret" });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "sd",
      name: "Matti Luukkainen",
      password: "a"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).not.toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
