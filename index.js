const dotenv = require('dotenv');
const express = require('express');
const PrismaClient = require('@prisma/client').PrismaClient;

dotenv.config();

const app = express();
const port = process.env.NODE_PORT || 3000;
const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }))

app.get('/create', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from('<form method="post"><input type="email" name="email" placeholder="E-mail"><br /><input type="text" name="firstname" placeholder="First name"><br /><input type="text" name="lastname" placeholder="Last name"><br /><input type="submit" name="submit" value="Submit"></form>'));
})

app.post('/create', async (req, res) => {
    console.log(req.body);
    await prisma.user.create({
        data: {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        },
    });
    res.redirect('/');
})

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  console.log(users);
  const usersToDisplay = users.map(user => user.email).join(', ');
  res.send(usersToDisplay);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
