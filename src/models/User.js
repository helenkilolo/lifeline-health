const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the MoodSchema
const MoodSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  notes: { type: String },
  date: { type: Date, default: Date.now },
});

// Define the HealthDataSchema
const HealthDataSchema = new mongoose.Schema({
  heartRate: { type: Number, required: true },
  activityLevel: { type: String, required: true },
  sleepHours: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Define the UserSchema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  moodHistory: { type: [MoodSchema], default: [] }, // Array of mood entries
  culturalPreference: { type: String, default: 'Global' },
  healthData: [HealthDataSchema], // Array of health data entries
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    console.log('Hashing password for user:', this.email);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Hashed password:', this.password);
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Log saved document
UserSchema.post('save', function (doc) {
  console.log('Saved document:', doc);
});

// Compare passwords
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
