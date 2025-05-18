import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.set("view engine", "ejs");
const post = [];
const latest = [
  {
    url: "/images/blog6.jpg",
    heading: " What Trees Taught Me About Stillness",
    desc: "Nature doesn’t rush, but everything gets done. I noticed this while walking past an old tree near my home. Its roots cracked through the sidewalk like it had all the time in the world. No alarms, no deadlines — just steady growth. It made me think: in a world obsessed with speed, maybe stillness is a kind of power.",
    author: "Imran Malik",
  },
  {
    url: "/images/blog2.jpg",
    heading: " When My Code Felt Like Magic",
    desc: "The first time I built something that actually worked, I felt like a magician. I was in my college dorm, surrounded by textbooks and half-finished projects. I had been learning to code for a few months, and I was tired of just reading about it. I wanted to create something real.",
    author: "Max John",
  },
  {
    url: "/images/img5.jpg",
    desc: "We usually talk about evolution in the context of life — fish growing legs, apes becoming humans. But I think it’s everywhere. It’s in the way we learn, the way we create, and the way we live. We’re all evolving, all the time. I see it in my work. I see it in my friends. I see it in myself.I used to think that I had to get everything right the first time. I thought that if I made a mistake, it meant I was a failure. But now I see that mistakes are just part of the process.",
    heading: "Evolution Isn’t Just Biology",
    author: "Micheal Farad",
  },
];
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { latest, post });
});

app.post("/posts", (req, res) => {
  var { title, body, author } = req.body;
  const newPost = { title, body, author };
  const id = Date.now(); //unique id created for each post
  newPost.id = id;
  post.unshift(newPost); // Add new post to the top of the array
  res.redirect("/");
});
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var posts = post.find((p) => p.id === id);
  if (posts) {
    res.render("viewpost", { posts });
  } else {
    res.status(404).send("posts not found !!");
  }
});
app.get("/posts/:id/edit", (req, res) => {
  const id = parseInt(req.params.id);
  const posts = post.find((p) => p.id === id);
  if (posts) {
    res.render("viewpost", { posts });
  } else {
    res.status(404).send("Post not found");
  }
});
//Handle the form submission for editing a post
app.post("/posts/:id/edit", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, body, author } = req.body;
  const postIndex = post.findIndex((p) => p.id === id);
  if (postIndex !== -1) {
    post[postIndex] = { id, title, body, author };
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});
app.get("/posts/:id/delete", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = post.findIndex((p) => p.id === id);
  if (postIndex !== -1) {
    post.splice(postIndex, 1); // Remove the post from the array
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
