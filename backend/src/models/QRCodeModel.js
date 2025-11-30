import mongoose from 'mongoose';

// Sub-schema for email data
const emailDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    default: '',
    trim: true
  },
  body: {
    type: String,
    default: '',
    trim: true
  }
});

// Sub-schema for phone data
const phoneDataSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    trim: true
  }
});

// Sub-schema for WiFi data
const wifiDataSchema = new mongoose.Schema({
  ssid: {
    type: String,
    required: true,
    trim: true
  },
  encryption: {
    type: String,
    enum: ['WPA', 'WEP', 'nopass'],
    default: 'WPA'
  },
  password: {
    type: String,
    default: '',
    trim: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
});

// Sub-schema for vCard data
const vcardDataSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  organization: {
    type: String,
    default: '',
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    default: '',
    trim: true
  },
  website: {
    type: String,
    default: '',
    trim: true
  },
  address: {
    type: String,
    default: '',
    trim: true
  },
  jobTitle: {
    type: String,
    default: '',
    trim: true
  }
});

const qrCodeSchema = new mongoose.Schema({
  // For text and URL types, data will be a string
  // For complex types, data will be an object with the appropriate schema
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  type: {
    type: String,
    enum: ['url', 'text', 'email', 'phone', 'wifi', 'vcard'],
    default: 'text'
  },
  size: {
    type: Number,
    default: 300,
    min: 100,
    max: 1000
  },
  margin: {
    type: Number,
    default: 1,
    min: 0,
    max: 10
  },
  colorDark: {
    type: String,
    default: '#000000'
  },
  colorLight: {
    type: String,
    default: '#FFFFFF'
  },
  qrCodeImage: {
    type: String, // Base64 encoded QR code
    required: true
  },
  generatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
qrCodeSchema.index({ generatedAt: -1 });
qrCodeSchema.index({ type: 1 });

const QRCode = mongoose.model('QRCode', qrCodeSchema);

export default QRCode;