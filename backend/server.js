require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const User = require('./models/userModel');
const bcrypt = require('bcryptjs');

const PORT = process.env.PORT || 5000;

// 👑 Create Admin if not exists
const createAdminIfNotExists = async () => {
  const adminEmail = 'admin@gmail.com';

  const adminExists = await User.findOne({ email: adminEmail });
  if (adminExists) {
    console.log('👑 Admin already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await User.create({
  name: 'Admin',
  email: adminEmail,
  password: hashedPassword,
  role: 'admin'
});

  console.log('👑 Admin created successfully');
};

// 🚀 Start Server Properly
const startServer = async () => {
  try {
    await connectDB();                 // 1️⃣ Connect MongoDB
    await createAdminIfNotExists();    // 2️⃣ Create admin
    app.listen(PORT, () => {           // 3️⃣ Start server
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
  }
};

startServer();
