const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    
    let authErrors = [];

    if (!password || password.trim() === '') {
        authErrors.push('Password should not be empty, you dingus. How do you expect to log in later?!');
      };
    

    if (password.length < 8) {
        authErrors.push("Sorry luv, password should be at least 8 characters long. Why don't you have another go?");
      };
    

    if (!/\d/.test(password)) {
        authErrors.push("Put at least one number in your password, dear.");
      };

    if (!/[!?()_&%-]/.test(password)) {
        authErrors.push("Please put at least one of these special characters in your password: / ! ? ( ) _ & % -"); 
      }; 
	  
	if (authErrors.length > 0) {
      return res.status(400).json({
		  authErrors
      });
    }


    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken. Play around and find a new one!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully! Be happy: your username is unique!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials. Are you, like, fake?' });
    }

    
    const token = jwt.sign(
      {userId: user._id},
      process.env.JWT_SECRET,
      { expiresIn: '24h'}
    )


    
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Cannot remember your password, uh?' });
    }

    
    res.json({ 
      message: 'Login successful. You should be happy about yourself!',
      accessToken: token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
