import { Form, message } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/rootSlice';
import axios from 'axios';

function AdminAbout() {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(values)
    try {
      const temSkills=values.skills.split(",");
      values.skills=temSkills
      dispatch(showLoading());
      const response = await axios.post("/api/portofolio/update-about", {
        ...values,
        _id: portfolioData.about._id
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);

      }
      else {
        message.error(response.data.message);

      }


    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);

    }

  }
  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={

        {...portfolioData.about,
          skills:portfolioData.about.skills.join(" , ")
        }
      }>
        <Form.Item name='lottieURL' label='Lottie URL'>
          <input placeholder='Lottie URL' />
        </Form.Item>


        <Form.Item name='description1' label='Description1'>
          <textarea placeholder='Description1' />
        </Form.Item>

        <Form.Item name='description2' label='Description2'>
          <textarea placeholder='Description2' />
        </Form.Item>
        <Form.Item name='skills' label='skills'>
          <textarea placeholder='Skills' />
        </Form.Item>
        <div className='flex justify-end w-full '>
          <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>

        </div>



      </Form>
    </div>
  )
}

export default AdminAbout