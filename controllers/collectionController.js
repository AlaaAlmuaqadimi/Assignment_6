const mongoose = require('mongoose');

exports.createExplicitCollection = async (req, res) => {
  try {
    await mongoose.connection.db.createCollection('books', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['title'],
          properties: {
            title: {
              bsonType: 'string',
              minLength: 1,
              description: 'must be a non-empty string'
            }
          }
        }
      }
    });
    res.status(200).json({ ok: 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createImplicitCollection = async (req, res) => {
  try {
    await mongoose.connection.db.collection('authors').insertOne(req.body);
    res.status(200).json({ acknowledged: true, insertedId: req.body._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCappedCollection = async (req, res) => {
  try {
    await mongoose.connection.db.createCollection('logs', {
      capped: true,
      size: 1048576
    });
    res.status(200).json({ ok: 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createIndex = async (req, res) => {
  try {
    const result = await mongoose.connection.db.collection('books').createIndex({ title: 1 });
    res.status(200).json({ ok: 1, index: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
