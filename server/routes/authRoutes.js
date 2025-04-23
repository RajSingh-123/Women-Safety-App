
const express = require('express');
const multer=require('multer');
const path=require('path')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model
const sendNotification=require('../services/notificationService')
const router = express.Router();

//Multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads'); // Adjust the path if necessary
    fs.mkdirSync(uploadPath, { recursive: true }); // Create the uploads folder if it doesn't exist
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + path.extname(file.originalname);
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage: storage });

// Image upload route
router.post('/upload-image', upload.single('image'), async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.image = req.file.path;
    await user.save();

    res.status(200).send('Image uploaded successfully');
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image');
  }
});
// SOS Trigger Route
router.post('/sos/trigger',upload.single('image'), async (req, res) => {
  const token = req.headers['x-access-token'];
  const { location, message } = req.body;

  if (!token) {
    return res.status(401).send('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send('User not found');
    }
    const newSosEvent = {
      image: req.file.path, // Save the path to the uploaded image
      location: { latitude, longitude },
    };
    user.sosEvent.push(newSosEvent)
    await user.save();



    // Example URL for notification (replace with actual endpoint)
    const notificationUrl = 'http://example.com/notify';
    
    // Data to send in notification
    const notificationData = {
      location,
      message,
      user: {
        id: user._id,
        username: user.username,
        contactDetails: user.contactDetails
      }
    };

    // Send notification to the specified URL
    await sendNotification(notificationUrl, notificationData);

    res.status(200).send('SOS triggered and notification sent');
  } catch (error) {
    console.error('Error triggering SOS:', error);
    res.status(500).send('Error triggering SOS');
  }
});

// Registration Route
router.post('/register', async (req, res) => {
  const { username, password, contactDetails, emergencyContacts } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      contactDetails,
      emergencyContacts: emergencyContacts || [] // Initialize as empty array if not provided
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Error registering user');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }
    console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debugging line

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error logging in');
  }
});

// User Info Route
router.get('/me', async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json({ username: user.username, contactDetails: user.contactDetails });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).send('Error fetching user info');
  }
});

// Route to add emergency contacts
router.post('/add-emergency-contact', async (req, res) => {
  const token = req.headers['x-access-token'];
  const { name, phoneNumber } = req.body;

  if (!token) {
    return res.status(401).send('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.emergencyContacts.push({ name, phoneNumber });
    await user.save();

    res.status(200).send('Emergency contact added successfully');
  } catch (error) {
    console.error('Error adding emergency contact:', error);
    res.status(500).send('Error adding emergency contact');
  }
});

// Route to get emergency contacts
router.get('/emergency-contacts', async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json({ emergencyContacts: user.emergencyContacts });
  } catch (error) {
    console.error('Error fetching user contacts:', error);
    res.status(500).send('Error fetching user contacts');
  }
});

module.exports = router;
