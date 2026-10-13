const mongoose = require('mongoose');

exports.insertBook = async (req, res) => {
  try {
    const result = await mongoose.connection.db.collection('books').insertOne(req.body);
    res.status(200).json({ acknowledged: true, insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.insertBatch = async (req, res) => {
  try {
    const result = await mongoose.connection.db.collection('books').insertMany(req.body);
    res.status(200).json({
      acknowledged: true,
      insertedIds: result.insertedIds
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.insertLog = async (req, res) => {
  try {
    const result = await mongoose.connection.db.collection('logs').insertOne(req.body);
    res.status(200).json({ acknowledged: true, insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBookYear = async (req, res) => {
  try {
    const result = await mongoose.connection.db.collection('books').updateOne(
      { title: req.params.title },
      { $set: { year: req.body.year } }
    );
    res.status(200).json({
      acknowledged: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findByTitle = async (req, res) => {
  try {
    const book = await mongoose.connection.db.collection('books').findOne({ title: req.query.title });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findByYearRange = async (req, res) => {
  try {
    const books = await mongoose.connection.db.collection('books').find({
      year: { $gte: parseInt(req.query.from), $lte: parseInt(req.query.to) }
    }).toArray();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findByGenre = async (req, res) => {
  try {
    const books = await mongoose.connection.db.collection('books').find({
      genres: req.query.genre
    }).toArray();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.skipLimitSort = async (req, res) => {
  try {
    const books = await mongoose.connection.db.collection('books')
      .find()
      .skip(2)
      .limit(3)
      .sort({ year: -1 })
      .toArray();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
