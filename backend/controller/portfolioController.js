const {Intro,About,Project,Contact,Experience}=require('../models/portefolioModel');
const Admin=require('../models/userModel');

async function getAll(req,res) {
    try {
      
       
        const intros=await Intro.find();
        const abouts=await About.find();
        const projects=await Project.find();
        const contacts=await Contact.find();
        const experiences=await Experience.find();
        res.status(200).send({
            intro : intros[0],
            about: abouts[0],
            projects: projects,
            contact: contacts[0],
            experiences : experiences
        })
       
      } catch (err) {
        res.status(400).send({ error: err });
        console.log(err);
      }

}
async function updateIntro(req,res) {
  try {

    const intro=await Intro.findOneAndUpdate({
      _id:req.body._id},req.body,{new:true});
      res.status(200).send({
        data: intro,
        success:true,
        message:"Intro updated successfully"
      });
     
    
     
    } catch (err) {
      res.send(500).send(err);
     
    }

}
async function addExperience(req,res) {
  try {
    const exp=new Experience(req.body);
    await exp.save()
    res.status(200).send({
      data:exp,
      success:true,
      message:"Experience added successfully"

    })

  
     
    
     
    } catch (err) {
      res.send(500).send(err);
     
    }

}
async function addProject(req,res) {
  try {
    const project=new Project(req.body);
    await project.save()
    res.status(200).send({
      data:project,
      success:true,
      message:"Project added successfully"

    })

  
     
    
     
    } catch (err) {
      res.send(500).send(err);
     
    }

}
async function login(req, res) {
  try {
    const admin = await Admin.findOne({ username: req.body.username, password: req.body.password });
     admin.password="";
    
    if (admin) {
      return res.status(200).send({
        data: admin,
        success: true,
        message: "Login successfully"
      });
    } else {
      return res.status(200).send({
        data: null,
        success: false,
        message: "Invalid username or password"
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "An error occurred",
      error: err
    });
  }
}
async function updateAbout(req,res) {
  try {

    const about=await About.findOneAndUpdate({
      _id:req.body._id},req.body,{new:true});
      res.status(200).send({
        data: about,
        success:true,
        message:"About updated successfully"
      });
     
    
     
    } catch (err) {
      res.send(500).send(err);
     
    }

}
async function updateProject(req,res) {
  try {

    const project=await Project.findOneAndUpdate({
      _id:req.body._id},req.body,{new:true});
      res.status(200).send({
        data: project,
        success:true,
        message:"Project updated successfully"
      });
     
    
     
    } catch (err) {
      res.send(500).send(err);
     
    }

}
async function updateExperience(req,res) {
  try {

    const exp=await Experience.findOneAndUpdate({
      _id:req.body._id},req.body,{new:true});
      res.status(200).send({
        data: exp,
        success:true,
        message:"Experience updated successfully"
      });
     
    
     
    } catch (err) {
      res.send(500).send(err);
     
    }

}
async function updateContact(req,res) {
  try {

    const contact=await Contact.findOneAndUpdate({
      _id:req.body._id},req.body,{new:true});
      res.status(200).send({
        data: contact,
        success:true,
        message:"Contact updated successfully"
      });
     
    
     
    } catch (err) {
      res.send(500).send(err);
     
    }

}
async function deleteExperience(req,res) {
  try {

    const exp=await Experience.findOneAndDelete({
      _id:req.body._id});
      res.status(200).send({
        data: exp,
        success:true,
        message:"Experience deleted successfully"
      });
     
    
     
    } catch (err) {
      res.send(500).send(err);
     
    }

}
async function deleteProject(req,res) {
  try {

    const project=await Project.findOneAndDelete({
      _id:req.body._id});
      res.status(200).send({
        data: project,
        success:true,
        message:"Project deleted successfully"
      });
     
    
     
    } catch (err) {
      res.send(500).send(err);
     
    }

}

module.exports = {
    
  
    getAll,
    updateIntro,
    updateAbout,
    addExperience,
    updateExperience,
    deleteExperience,
    addProject,
    updateProject,
    deleteProject,
    updateContact,
    login
    
   
    
    
  };