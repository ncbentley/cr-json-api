const express = require('express');
const bodyparser = require('body-parser');

jsonParser = bodyparser.json();

app = express();

// MIDDLEWARE
app.use(jsonParser);

// mock db seeded with fake data
// post structure - id: {title, description, [applications]}

let db = {
    posts: {
        1: {title: 'Test Post', description: 'Post for test purposes', applications: []},
        2: {title: 'Another Post', description: 'Another fun description', applications: ['app1', 'app2']}
    }
};

// ROUTES

// create post
app.post('/', (req, res) => {
    const post = req.body;
    try {
        if (!db.posts[post.id]) {
            db.posts[post.id] = {title: post.title, description: post.description, applications: post.applications};
            res.status(200).send("Post Created");
        } else {
            res.status(403).send("Post with that ID already exists.");
        }
    } catch {
        res.status(400).send("Job post formatted incorrectly. post structure - id: {title, description, [applications]}");
    }
});

// get all posts
app.get('/', (req, res) => {
    res.status(200).json({posts: db.posts});
});

// get one post
app.get('/:id', (req, res) => {
    if (db.posts[req.params.id]) {
        res.status(200).json({post: db.posts[req.params.id]});
    } else {
        res.status(404).send("Post not found");
    }
});

app.listen(3000, () => {
    console.log('Now listening on https://localhost:3000');
});

