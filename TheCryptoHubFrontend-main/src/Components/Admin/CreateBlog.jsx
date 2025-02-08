import React, { useState,useEffect, useRef } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import AdminHeader from "./AdminHeader/AdminHeader";
import SideBarAdmin from "./SideBar/SideBar";

import { SERVERURL } from "../../ServerUrl";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HomeTopBar from "../HomeTopBar/HomeTopBar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/JPEG', 'image/JPG', 'image/PNG'];

const schema = Yup.object().shape({
  type: Yup.string().oneOf(['AI', 'DEFI', 'Metaverse', 'NFTs', 'Infrastructure', 'Gaming']).required('Type/Category is required'),
  title: Yup.string().max(30, 'Title cannot exceed 30 characters').required('Title is required'),
  shortDescription: Yup.string().max(50, 'Short description cannot exceed 50 characters').required('Short description is required'),
  description: Yup.string().required('Description is required'),
  ytVideo: Yup.string().url('Please enter a valid YouTube URL').nullable(),
  readTime: Yup.string().required('Read time is required'),
  coverImage: Yup.mixed().required('Cover image is required').test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => file && allowedFileTypes.includes(file.type)),
  references: Yup.array().of(Yup.string().required('Reference is required').url('Please enter a valid URL')).nullable(),
});

const CreateBlog = () => {
  const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [rightHeader, setRightHeader] = useState(false);
  return (
    <>
      <AdminHeader rightHeader={rightHeader}/>
      <div className="topSideVehicles">
        <SideBarAdmin
        setRightHeader={setRightHeader}
        rightHeader={rightHeader}
        />
        
        <div className="vehicleAdminMain  bg-white ">
 
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10 mb-10">
            <div className="mb-8 bg-[#03BABC] p-6 rounded-lg">
            <h2 className="text-4xl font-bold text-white mb-4">
                Upload New Blog
            </h2>
            <p className="text-lg text-white mt-2">
                Provide the details of your Blog. Ensure all fields are filled out accurately to share your Blog with the world.
            </p>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-4"></div>
            </div>
            <Formik
          initialValues={{
            type: '',
            title: '',
            shortDescription: '',
            description: '',
            ytVideo: '',
            readTime: '',
            coverImage: null,
            references: [],
          }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            const formData = new FormData();
          
            // Append simple fields
            formData.append('title', values.title);
            formData.append('shortDescription', values.shortDescription);
            formData.append('description', values.description);
            formData.append('ytVideo', values.ytVideo);
            formData.append('type', values.type);
            formData.append('readTime', values.readTime);
          
            // Handle coverImage upload
            if (values.coverImage) {
              formData.append('coverImage', values.coverImage);
            }
          
            // Handle references array
            const referencesJSON = JSON.stringify(values.references);
            formData.append('references', referencesJSON);
          
            // Printing data for debugging
            formData.forEach((value, key) => {
              console.log(`${key}: ${value}`);
            });
          
            // API call to /AddBlog
            const token = localStorage.getItem('token');
            
            try {
              if (token) {
                const headers = {
                  'Authorization': `Bearer ${token}`,
                };
          
                const response = await axios.post(
                  `${SERVERURL}/api/v1/AddBlog`,
                  formData,
                  {
                    headers: headers,
                    onUploadProgress: (progressEvent) => {
                      const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    
                      setProgress(progress);
                      setUploading(true);
                    },
                  }
                );
          
                if (response.status === 200) {
                  Swal.fire({
                    icon: "success",
                    title: "Uploaded Successfully",
                    text: response.data.message,
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "An error occurred",
                    text: response.data.message,
                  });
                }
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Sign in to upload Blog",
                  text: "Guest User can't upload Blog.",
                });
              }
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "An error occurred",
                text: "Blog Not Uploaded.",
              });
            } finally {
              setUploading(false);
              setSubmitting(false); // Reset submitting state to false
            }
          }}
          
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
                {/* Title Field */}
                <div className='mb-3'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title <span className="text-red-500">*</span></label>
                    <Field type="text" name="title" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mt-4 mb-4 flex flex-col md:flex-row md:mb-0">
                    {/* Chain Field */}
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Category <span className="text-red-500">*</span></label>
                        <Field as="select" name="type" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                            <option value="">Select a category</option>
                            <option value="AI">AI</option>
                            <option value="DEFI">DEFI</option>
                            <option value="Metaverse">Metaverse</option>
                            <option value="NFTs">NFTs</option>
                            <option value="Infrastructure">Infrastructure</option>
                            <option value="Gaming">Gaming</option>
                        </Field>
                        <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
                    </div>

                </div>
                {/* Short Description Field */}
                <div className='mb-3'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Short Description <span className="text-red-500">*</span></label>
                    <Field type="text" name="shortDescription" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    <ErrorMessage name="shortDescription" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Description Field */}
                <div className='mb-3'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description <span className="text-red-500">*</span></label>
                    <Field name="description">
                        {({ field }) => (
                            <ReactQuill
                                value={field.value}
                                onChange={field.onChange(field.name)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        )}
                    </Field>
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>

                {/* YouTube Link */}
                <div className='mb-3'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">YouTube Video Link</label>
                    <Field type="url" name="ytVideo" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    <ErrorMessage name="ytVideo" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Read Time */}
                <div className='mb-3'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Read Time <span className="text-red-500">*</span></label>
                    <Field type="text" name="readTime" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    <ErrorMessage name="readTime" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Cover Image */}
                <div className='mb-3'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Cover Image <span className="text-red-500">*</span></label>
                    <input
                        type="file"
                        name="coverImage"
                        onChange={(event) => {
                            setFieldValue("coverImage", event.currentTarget.files[0]);
                        }}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="coverImage" component="div" className="text-red-500 text-sm" />
                </div>

                {/* References */}
                
                <FieldArray name="references">
                {({ remove, push }) => (
                  <div className='my-3'>
                    {values.references && values.references.length > 0 && values.references.map((reference, index) => (
                      <div key={index} className="p-4 border border-black rounded-lg space-y-4 mb-3">
                        <div className="flex flex-col">
                          <label className="block text-gray-700 text-sm font-bold mb-2">Reference URL <span className="text-red-500">*</span></label>
                          <Field
                            name={`references.${index}`}
                            type="url"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage name={`references.${index}`} component="div" className="text-red-500 text-sm" />
                        </div>

                        <button type="button" onClick={() => remove(index)}
                          className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded">
                          Remove
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => push('')}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    >
                      Add Reference
                    </button>
                  </div>
                )}
              </FieldArray>


              {/* Submit Button */}
              <div className="flex items-center mt-3">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
              </div>
            </Form>
        )}
        </Formik>
        {uploading && (
          <div className="modddd">
                    <div className="coontent">                  
                      <p>Uploading: {progress}%</p>
                    <div className="w-full bg-gray-200 rounded">
                        <div className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded" style={{ width: `${progress}%` }}>
                            
                        </div>
                    </div>
                </div>
                </div>
            )}
      </div>
      </div>
      </div>
  
    </>
  )
}

export default CreateBlog;