import Joi from 'joi';

// Base schema for common QR properties
const baseQRSchema = {
  type: Joi.string().valid('url', 'text', 'email', 'phone', 'wifi', 'vcard').default('text'),
  size: Joi.number().min(100).max(1000).default(300),
  margin: Joi.number().min(0).max(10).default(1),
  colorDark: Joi.string().pattern(/^#[0-9A-F]{6}$/i).default('#000000'),
  colorLight: Joi.string().pattern(/^#[0-9A-F]{6}$/i).default('#FFFFFF')
};

// Schema for text and URL types
const textUrlSchema = Joi.object({
  ...baseQRSchema,
  data: Joi.string().min(1).max(4000).required()
});

// Schema for email type
const emailSchema = Joi.object({
  ...baseQRSchema,
  data: Joi.object({
    email: Joi.string().email().required(),
    subject: Joi.string().max(200).allow(''),
    body: Joi.string().max(1000).allow('')
  }).required()
});

// Schema for phone type
const phoneSchema = Joi.object({
  ...baseQRSchema,
  data: Joi.object({
    phone: Joi.string().min(1).max(20).required()
  }).required()
});

// Schema for WiFi type
const wifiSchema = Joi.object({
  ...baseQRSchema,
  data: Joi.object({
    ssid: Joi.string().min(1).max(50).required(),
    encryption: Joi.string().valid('WPA', 'WEP', 'nopass').default('WPA'),
    password: Joi.string().max(100).allow(''),
    hidden: Joi.boolean().default(false)
  }).required()
});

// Schema for vCard type
const vcardSchema = Joi.object({
  ...baseQRSchema,
  data: Joi.object({
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    organization: Joi.string().max(100).allow(''),
    phone: Joi.string().min(1).max(20).required(),
    email: Joi.string().email().allow(''),
    website: Joi.string().uri().allow(''),
    address: Joi.string().max(200).allow(''),
    jobTitle: Joi.string().max(100).allow('')
  }).required()
});

export const validateQRGeneration = (req, res, next) => {
  const { type } = req.body;

  let schema;

  switch (type) {
    case 'email':
      schema = emailSchema;
      break;
    case 'phone':
      schema = phoneSchema;
      break;
    case 'wifi':
      schema = wifiSchema;
      break;
    case 'vcard':
      schema = vcardSchema;
      break;
    case 'text':
    case 'url':
    default:
      schema = textUrlSchema;
      break;
  }

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }

  next();
};