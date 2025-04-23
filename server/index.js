const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const SignupSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  trashDays: [String],
  bins: Number,
  addons: [String],
  plan: String,
  createdAt: { type: Date, default: Date.now }
});

const Signup = mongoose.model('Signup', SignupSchema);

app.post('/api/signup', async (req, res) => {
  try {
    const { plan, email } = req.body;

    const priceMap = {
      weekly: process.env.CONCH_WEEKLY,
      biweekly: process.env.DUVAL_BIWEEKLY
    };

    const selectedPrice = priceMap[plan];
    if (!selectedPrice) {
      return res.status(400).json({ success: false, error: 'Invalid plan selected' });
    }

    const newSignup = new Signup(req.body);
    await newSignup.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: selectedPrice,
          quantity: 1
        }
      ],
      customer_email: email,
      success_url: `${process.env.CLIENT_URL}/thank-you`,
      cancel_url: `${process.env.CLIENT_URL}/signup?canceled=true`
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ success: false, error: 'Failed to process signup.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
