import { Form, Modal, message } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ReloadData, hideLoading, showLoading } from '../../redux/rootSlice';
import axios from 'axios';

function AdminProjects() {
    const { portfolioData } = useSelector((state) => state.root);
    const dispatch = useDispatch();
    const { projects } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [type, setType] = useState("add");
    const onFinish = async (values) => {
        try {
            const tempTechnologies=values.technologies.split(",");
            values.technologies=tempTechnologies;
            dispatch(showLoading());
            let response
            if (selectedItemForEdit) {
                response = await axios.post("/api/portofolio/update-project", {
                    ...values,
                    _id: selectedItemForEdit._id

                });
            }
            else {
                response = await axios.post("/api/portofolio/add-project",
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
    const onDelete = async (item) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/portofolio/delete-project", {

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
                }}>Add Project</button>
            </div>
            <div className='grid grid-cols-3 gap-5 mt-5'>
                {projects.map((project) => (
                    <div key={project._id} className='shadow border p-5 border-gray-400 flex flex-col gap-5'>
                        <h1 className='text-secondary text-xl font-bold'>{project.title}</h1>
                        <hr />

                        <img className='h-60 w-80' src={project.image} alt='' />
                        <h1>Role : {project.title}</h1>
                        <h1>{project.description}</h1>
                        <div className='flex justify-end gap-5 mt-5'>

                            <button className='bg-red-500 text-white px-5 py-2 ' onClick={() => onDelete(project)}>Delete</button>
                            <button className='bg-primary text-white px-5 py-2 ' onClick={() => {
                                setSelectedItemForEdit(project);
                                setShowAddEditModal(true);
                                setType("edit");

                            }}>Edit</button>
                        </div>
                    </div>
                ))}

            </div>
            {
                (type === "add" || selectedItemForEdit) && <Modal visible={showAddEditModal}
                    title={selectedItemForEdit ? "Edit Project" : "Add Project"}
                    footer={null}
                    onCancel={() => {
                        setShowAddEditModal(false);
                        setSelectedItemForEdit(null);
                       

                    }}>
                    <Form layout='vertical' onFinish={onFinish} initialValues={
                        {
                            ...selectedItemForEdit,
                            technologies: selectedItemForEdit?.technologies.join(" , ")
                        }
                    }>
                        <Form.Item name='title' label="Title">

                            <input placeholder='Title' />
                        </Form.Item>
                        <Form.Item name='image' label="Image">

                            <input placeholder='Image' />
                        </Form.Item>

                        <Form.Item name='description' label="Description">

                            <textarea placeholder='Description' />
                        </Form.Item>
                        <Form.Item name='link' label="Link">

                            <input placeholder='Link' />
                        </Form.Item>
                        <Form.Item name='technologies' label="Technologies">

                            <input placeholder='Technologies' />
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

export default AdminProjects