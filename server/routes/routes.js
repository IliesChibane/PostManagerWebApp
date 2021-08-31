const express = require("express");
const router = express.Router();
const API = require("../controllers/api")
const multer = require("multer");

// multer middleware
let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});

let upload = multer({
    storage: storage
}).single('image');

router.get("/", API.fetchAllPOst);
router.get("/:id", API.fetchPOstByID);
router.post("/", upload, API.creatPOst);
router.patch("/:id", upload, API.UpdatePOst);
router.delete("/:id", API.deletePOst);

module.exports = router;