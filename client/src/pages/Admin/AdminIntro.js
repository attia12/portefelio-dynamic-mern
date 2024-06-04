import { Form, message } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/rootSlice';
import axios from 'axios';

function AdminIntro() {
  const {portfolioData}=useSelector((state)=>state.root);
  const dispatch=useDispatch();
   
  const onFinish=async (values)=>{
   try {
    dispatch(showLoading());
    const response=await axios.post("https://portefelio-dynamic-mern.onrender.com/api/portofolio/update-intro",{
      ...values,
      _id:portfolioData.intro._id
    });
    dispatch(hideLoading());
    if(response.data.success)
      {
        message.success(response.data.message);
         
      }
      else {
        message.error(response.data.message);

      }


   }catch(err)
   {
    dispatch(hideLoading());
    message.error(err.message);

   }

  }
  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData?.intro}>
        <Form.Item name='welcomeText' label='welcomeText'>
          <input placeholder='welcomeText'/>
        </Form.Item>
        <Form.Item name='firstName' label='firstName'>
          <input placeholder='FristName'/>
        </Form.Item>
        <Form.Item name='lastName' label='lastName'>
          <input placeholder='LastName'/>
        </Form.Item>
        <Form.Item name='caption' label='caption'>
          <input placeholder='Caption'/>
        </Form.Item>
        <Form.Item name='description' label='Description'>
          <textarea placeholder='Description'/>
        </Form.Item>
         <div className='flex justify-end w-full '>
           <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>

         </div>
  


      </Form>
    </div>
  )
}

export default AdminIntro