const router=require('express').Router();
const portofollioController = require("../controller/portfolioController");

router.get('/get-portfolio-data',portofollioController.getAll);
router.post('/update-intro',portofollioController.updateIntro);
router.post('/update-about',portofollioController.updateAbout);
router.post('/add-experience',portofollioController.addExperience);
router.post('/update-experience',portofollioController.updateExperience);
router.post('/delete-experience',portofollioController.deleteExperience);
router.post('/add-project',portofollioController.addProject);
router.post('/update-project',portofollioController.updateProject);
router.post('/delete-project',portofollioController.deleteProject);
router.post('/update-contact',portofollioController.updateContact);
router.post('/login',portofollioController.login);
module.exports=router;

