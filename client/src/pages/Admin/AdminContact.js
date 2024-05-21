import { Form, message } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/rootSlice';
import axios from 'axios';

function AdminContact() {
  const {portfolioData}=useSelector((state)=>state.root);
  const dispatch=useDispatch();
   
  const onFinish=async (values)=>{
   try {
    dispatch(showLoading());
    const response=await axios.post("/api/portofolio/update-contact",{
      ...values,
      _id:portfolioData.contact._id
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
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData?.contact}>
     
        <Form.Item name='name' label='Name'>
          <input placeholder='Name'/>
        </Form.Item>
        <Form.Item name='gender' label='Gender'>
          <input placeholder='Gender'/>
        </Form.Item>
        <Form.Item name='age' label='Age'>
          <input placeholder='Age'/>
        </Form.Item>
        <Form.Item name='email' label='Email'>
          <input placeholder='Email'/>
        </Form.Item>
        <Form.Item name='mobile' label='Mobile'>
          <input placeholder='Mobile'/>
        </Form.Item>
        <Form.Item name='country' label='Address'>
          <input placeholder='Address'/>
        </Form.Item>
       
         <div className='flex justify-end w-full '>
           <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>

         </div>
  


      </Form>
    </div>
  )
}

export default AdminContact