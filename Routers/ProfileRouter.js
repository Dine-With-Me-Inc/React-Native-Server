const express = require('express');
const { ProfileController } = require('../Controllers/ProfileController');
const ProfileRouter = express.Router();

ProfileRouter.route('')
  .post(ProfileController.createProfile)
  .get(ProfileController.grabAllProfile)

ProfileRouter.route('/all')
  .get(ProfileController.grabAllProfileCount)

ProfileRouter.route('/:id')
  .get(ProfileController.grabProfile)
  .put(ProfileController.updateUserProfile)
  .delete(ProfileController.deleteUserProfile)

ProfileRouter.route('/search/:term')
  .get(ProfileController.searchProfiles)

ProfileRouter.route('/username/:id')
  .get(ProfileController.grabProfileByUsername)

ProfileRouter.route('/fcm-token/:id')
  .put(ProfileController.updateUserFCMToken)

module.exports = ProfileRouter;