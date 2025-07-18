const express = require("express");
const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");
const commentRouters = require("./commentRoutes");
const router = express.Router();

router.use(authController.protect);

router
    .route("/")
    .get(postController.getAllPost)
    .post(postController.setUserId, postController.createPost);

router.route("/me").get(postController.getAllPostsByMe);
router.route("/getPostByUserId/:id").get(postController.getPostByUserId);
router.route("/sharedPosts").get(postController.getSharedPostsByUser);
router.route("/likedPosts").get(postController.getLikedPostsByUser);
router.route("/sharedPosts/:id").get(postController.getSharedPostsByUser);
router.route("/likedPosts/:id").get(postController.getLikedPostsByUser);
router
    .route("/random")
    .get(authController.restrictTo("user"), postController.getRandomPost);
router
    .route("/:id")
    .get(postController.getPostById)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

router
    .route("/:id/like")
    .get(postController.isPostLikedByUser)
    .post(authController.restrictTo("user"), postController.likePost)
    .delete(authController.restrictTo("user"), postController.unlikePost);

router.route("/:id/users/like").get(postController.getUsersLikingPost);
router.route("/:id/users/share").get(postController.getUsersSharingPost);
//combine route with comment
//ex /api/v1/post/postId/comment/
router.use("/:postId/comments", commentRouters);

module.exports = router;
