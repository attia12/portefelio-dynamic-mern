import { Form, Modal, message } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ReloadData, hideLoading, showLoading } from '../../redux/rootSlice';
import axios from 'axios';

function Experiences() {
    const { portfolioData } = useSelector((state) => state.root);
    const dispatch = useDispatch();
    const { experiences } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [type,setType]=useState("add");
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            let response
            if (selectedItemForEdit) {
                response = await axios.post("https://portefelio-dynamic-mern.onrender.com/api/portofolio/update-experience", {
                    ...values,
                    _id: selectedItemForEdit._id

                });
            }
            else {
                response = await axios.post("https://portefelio-dynamic-mern.onrender.com/api/portofolio/add-experience",
                    values,

                );

            }

            dispatch(hideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModal(false);
                setSelectedItemForEdit(null);
                dispatch(hideLoading());
                dispatch(ReloadData(true));

            }
            else {
                message.error(response.data.message);

            }


        } catch (err) {
            dispatch(hideLoading());
            message.error(err.message);

        }
    }
    const onDelete=async(item) =>{
        try {
            dispatch(showLoading());
            const response = await axios.post("https://portefelio-dynamic-mern.onrender.com/api/portofolio/delete-experience", {
                
                _id: item._id

            });
            dispatch(hideLoading());
            if (response.data.success) {
                message.success(response.data.message);
               
                dispatch(hideLoading());
                dispatch(ReloadData(true));

            }
            else {
                message.error(response.data.message);

            }
            
        } catch (error) {
            dispatch(hideLoading());
            message.error(error.message);
            
        }
    } 
    return (
        <div>
            <div className='flex justify-end'>
                <button className='bg-primary px-5 py-2 text-white' onClick={() => {
                    setShowAddEditModal(true);
                    setSelectedItemForEdit(null);
                }}>Add Experience</button>
            </div>
            <div className='grid grid-cols-4 gap-5 mt-5'>
                {experiences.map((ex) => (
                    <div className='shadow border p-5 border-gray-400 flex flex-col'>
                        <h1 className='text-secondary text-xl font-bold'>{ex.period}</h1>
                        <hr />
                        <h1>Company : {ex.company}</h1>
                        <h1>Role : {ex.title}</h1>
                        <h1>{ex.description}</h1>
                        <div className='flex justify-end gap-5 mt-5'>

                            <button className='bg-red-500 text-white px-5 py-2 ' onClick={()=> onDelete(ex)}>Delete</button>
                            <button className='bg-primary text-white px-5 py-2 ' onClick={()=>{
                                setSelectedItemForEdit(ex);
                                setShowAddEditModal(true);
                                setType("edit");

                            }}>Edit</button>
                        </div>
                    </div>
                ))}

            </div>
            {
               ( type === "add" || selectedItemForEdit) &&  <Modal visible={showAddEditModal}
               title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
               footer={null}
               onCancel={() =>{ 
                   setShowAddEditModal(false);
                   setSelectedItemForEdit(null);
                   
                   
                   }}>
               <Form layout='vertical' onFinish={onFinish} initialValues={selectedItemForEdit}>
                   <Form.Item name='period' label="Period">

                       <input placeholder='period' />
                   </Form.Item>
                   <Form.Item name='company' label="Company">

                       <input placeholder='Company' />
                   </Form.Item>
                   <Form.Item name='title' label="Title">

                       <input placeholder='Title' />
                   </Form.Item>
                   <Form.Item name='description' label="Description">

                       <input placeholder='Description' />
                   </Form.Item>
                   <div className='flex justify-end'>
                       <button className='border-primary text-primary px-5 py-2' onClick={() => setShowAddEditModal(false)}>Cancel</button>
                       <button className='bg-primary text-white px-5 py-2'>
                           {selectedItemForEdit ? "Update" : "Add"}
                       </button>
                   </div>
               </Form>

           </Modal>
            }
           
        </div>
    )
}

export default Experiences