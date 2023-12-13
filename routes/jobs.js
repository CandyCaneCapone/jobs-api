const express = require("express");
const router = express.Router();

const controllers = require("../controllers/jobs");

router.get("/", controllers.getAllJobs);
router.get("/:id", controllers.getSingleJob);
router.post("/", controllers.createJob);
router.patch("/:id", controllers.updateJob);
router.delete("/:id", controllers.deleteJob);


console.log(router);
module.exports = router;
