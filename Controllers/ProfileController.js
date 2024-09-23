const pool = require('../bin/utils/AwsConnect'); // Adjust the path as necessary

const ProfileController = {
  createProfile: async (req, res) => {
    const { userId, username, email, phone, bio, location, first_name, 
      last_name, full_name, profile_picture, public, notifications, verified, launch,
      followers, following, recipes, lists } = req.body;
    const query = `
      INSERT INTO profile
        (userId, username, email, phone, bio, location, first_name, 
        last_name, full_name, profile_picture, public, notifications, verified, launch,
        followers, following, recipes, lists, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 0, 0, 0, 0, NOW())
        RETURNING *;`;
    try {
      const result = await pool.query(query, [userId, username, email, phone, bio, location, first_name, 
        last_name, full_name, profile_picture, public, notifications, verified, launch,
        followers, following, recipes, lists]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  grabProfile: async (req, res) => {
    const { id } = req.params
    const query = `
      SELECT * FROM profile
      WHERE user_id = $1`;
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  grabProfileByUsername: async (req, res) => {
    const { id } = req.params; // Here, 'id' should be the username
    const query = `
      SELECT * FROM profile
      WHERE username = $1`;
    try {
      const result = await pool.query(query, [id]);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Error in grabProfileByUsername:', err.message);
      res.status(500).send('Internal Server Error');
    }
  },
  searchProfiles: async (req, res) => {
    const { term } = req.params;
    const query = `
      SELECT * FROM profile
      WHERE username ILIKE $1 OR full_name ILIKE $1`;
    try {
      const result = await pool.query(query, [`%${term}%`]);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  grabAllProfile: async (req, res) => {
    const query = `
      SELECT * FROM profile`;
    try {
      const result = await pool.query(query);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  grabAllProfileCount: async (req, res) => {
    const query = `
      SELECT COUNT(*) AS totalProfiles FROM profile`;
    try {
      const result = await pool.query(query);
      const totalProfiles = result.rows[0].totalprofiles; // Extract the totalProfiles count
      res.status(200).json({ totalProfiles });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  
  updateUserProfile: async (req, res) => {
    const { id } = req.params
    const { username, email, phone, location, first_name, 
      last_name, full_name, bio, nickname, profile_picture, public, notifications } = req.body;
    const query = `
      UPDATE profile
      SET username = $1, email = $2, phone = $3, location = $4, first_name = $5, 
          last_name = $6, full_name = $7, bio = $8, nickname = $9, profile_picture = $10, 
          public = $11, notifications = $12
      WHERE user_id = $13
      RETURNING *;
    `;
    try {
      const result = await pool.query(query, [username, email, phone, location, first_name, 
        last_name, full_name, bio, nickname, profile_picture, public, notifications, id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  updateUserFCMToken: async (req, res) => {
    const { id } = req.params
    const { token } = req.body;
    console.log(token)
    const query = `
      UPDATE profile
      SET fcmtoken = $1
      WHERE user_id = $2
      RETURNING *;
    `;
    try {
      const result = await pool.query(query, [token, id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  deleteUserProfile: async (req, res) => {
    const { id } = req.params
    const query = `
      DELETE * FROM profile WHERE user_id = $1`;
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
};

module.exports = { ProfileController };
