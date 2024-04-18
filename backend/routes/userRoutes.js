const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/:username", userController.saveUser);
router.get("/friends/:username", userController.findMutualFriends);
router.get("/search", userController.searchUsers);
router.delete("/:username", userController.deleteUser);
router.put("/:username", userController.updateUser);
router.get("/", userController.getUsersSorted);

module.exports = router;
