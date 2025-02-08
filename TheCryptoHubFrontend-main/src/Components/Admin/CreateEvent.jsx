import React, { useState,useEffect, useRef } from "react";
import { Formik, Form, Field,FieldArray, ErrorMessage } from 'formik';
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
  title: Yup.string().max(30, 'Title cannot exceed 30 characters').required('Title is required'),
  description: Yup.string().required('Description is required'),
  shortDescription: Yup.string().max(50, 'Short description cannot exceed 50 characters').required('Short description is required'),
  startDate: Yup.date().required('Start date is required').min(new Date(), 'Start date cannot be in the past'),
  endDate: Yup.date().required('End date is required').min(Yup.ref('startDate'), 'End date must be later than start date'),
  type: Yup.string().oneOf(['Gaming', 'AI', 'Infrastructure', 'DEFI', 'Metaverse', 'NFTs'], 'Invalid event type').required('Type is required'),
  location: Yup.string().required('Location is required'),
  countryCode: Yup.string().matches(/^[A-Z]{2,3}$/, 'Invalid country code').required('Country code is required'),
  websiteLink: Yup.string().url('Please enter a valid URL').nullable(),
  instagramLink: Yup.string().url('Please enter a valid URL').nullable(),
  twitterLink: Yup.string().url('Please enter a valid URL').nullable(),
  linkedinLink: Yup.string().url('Please enter a valid URL').nullable(),
  startTime: Yup.string().matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format').required('Start time is required'),
  endTime: Yup.string().matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format').required('End time is required'),
  coverImage: Yup.mixed().required('Cover image is required').test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => file && allowedFileTypes.includes(file.type)),
  hashtags: Yup.array().of(Yup.string().required('Hashtag is required')).nullable(),
});


const CreateEvent = () => {
  const [uploading, setUploading] = useState(false);
  const [rightHeader, setRightHeader] = useState(false);
    const [progress, setProgress] = useState(0);
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
                Upload New Event
            </h2>
            <p className="text-lg text-white mt-2">
                Provide the details of your Event. Ensure all fields are filled out accurately to share your Event with the world.
            </p>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-4"></div>
            </div>
            <Formik
          initialValues={{
            title: '',
            description: '',
            shortDescription: '',
            startDate: '',
            endDate: '',
            type: '',
            location: '',
            countryCode: '',
            websiteLink: '',
            instagramLink: '',
            twitterLink: '',
            linkedinLink: '',
            startTime: '',
            endTime: '',
            coverImage: null,
            hashtags: [],
          }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            const formData = new FormData();
          
            // Append simple fields
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('shortDescription', values.shortDescription);
            formData.append('startDate', values.startDate);
            formData.append('endDate', values.endDate);
            formData.append('type', values.type);
            formData.append('location', values.location);
            formData.append('countryCode', values.countryCode);
            formData.append('websiteLink', values.websiteLink);
            formData.append('instagramLink', values.instagramLink);
            formData.append('twitterLink', values.twitterLink);
            formData.append('linkedinLink', values.linkedinLink);
            formData.append('startTime', values.startTime);
            formData.append('endTime', values.endTime);
          
            // Handle coverImage upload
            if (values.coverImage) {
              formData.append('coverImage', values.coverImage);
            }
          
            // Handle hashtags array
              const hashtagsJSON = JSON.stringify(values.hashtags);
              formData.append('hashtags', hashtagsJSON);
            
          
            // Print form data for debugging
            formData.forEach((value, key) => {
              console.log(`${key}: ${value}`);
            });
          
            // API call to /AddEvent
            const token = localStorage.getItem('token');
          
            try {
              if (token) {
                const headers = {
                  'Authorization': `Bearer ${token}`,
                };
          
                const response = await axios.post(
                  `${SERVERURL}/api/v1/AddEvent`,
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
          
                // Handle success response
                if (response.status === 200) {
                  Swal.fire({
                    icon: "success",
                    title: "Event Uploaded Successfully",
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
                  title: "Sign in to upload Event",
                  text: "Guest User can't upload Event.",
                });
              }
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "An error occurred",
                text: "Event Not Uploaded.",
              });
            } finally {
              setUploading(false); // Reset uploading state
              setSubmitting(false); // Reset submitting state to false
            }
          }}
          
          
          
        >
          {({ values,isSubmitting, setFieldValue }) => (
            <Form>
                {/* Title Field */}
                <div className='mb-3'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title <span className="text-red-500">*</span></label>
                    <Field type="text" name="title" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
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
              {/* Container for Start and End Dates */}
              <div className="w-full flex flex-col md:flex-row md:space-x-4">
                {/* Start Date */}
                <div className="flex-1 mb-4 md:mb-0">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Start Date <span className="text-red-500">*</span></label>
                  <Field 
                    type="date" 
                    name="startDate" 
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                  />
                  <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
                </div>

                {/* End Date */}
                <div className="flex-1 mb-4 md:mb-0">
                  <label className="block text-gray-700 text-sm font-bold mb-2">End Date <span className="text-red-500">*</span></label>
                  <Field 
                    type="date" 
                    name="endDate" 
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                  />
                  <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Type Field */}
              <div className='my-3'>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sortBy">Type <span className="text-red-500">*</span></label>
                <Field as="select" name="type" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                  <option value="">Select an Type</option>
                  <option value="Gaming">Gaming</option>
                  <option value="AI">AI</option>
                  <option value="DEFI">DEFI</option>
                  <option value="Metaverse">Metaverse</option>
                  <option value="NFTs">NFTs</option>
                  <option value="Infrastructure">Infrastructure</option>
                </Field>
                <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Location */}
              <div className='mb-3'>
                <label className="block text-gray-700 text-sm font-bold mb-2">Location <span className="text-red-500">*</span></label>
                <Field type="text" name="location" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Country Code */}
              <div className='mb-3'>
                <label className="block text-gray-700 text-sm font-bold mb-2">Country Code <span className="text-red-500">*</span></label>
                <Field type="text" name="countryCode" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="countryCode" component="div" className="text-red-500 text-sm" />
              </div>

              {/* {links} */}
              <div className="my-4 flex justify-between">
                    {/* websiteLink */}
                    <div className='w-1/2 pr-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Website Link </label>
                        <Field type="url" name="websiteLink" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="websiteLink" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* instagramLink*/}
                    <div className='w-1/2 pl-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Instagram Link </label>
                        <Field type="url" name="instagramLink" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="instagramLink" component="div" className="text-red-500 text-sm" />
                    </div>
                </div>

                {/* {links} */}
              <div className="my-4 flex justify-between">
                    {/* twitterLink */}
                    <div className='w-1/2 pr-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Twitter Link </label>
                        <Field type="url" name="twitterLink" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="twitterLink" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* linkedinLink*/}
                    <div className='w-1/2 pl-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Linkedin Link </label>
                        <Field type="url" name="linkedinLink" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="linkedinLink" component="div" className="text-red-500 text-sm" />
                    </div>
                </div>

              {/* Container for Start and End Times */}
              <div className="w-full flex space-x-4">
                {/* Start Time */}
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Start Time <span className="text-red-500">*</span></label>
                  <Field 
                    type="time" 
                    name="startTime" 
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                  />
                  <ErrorMessage name="startTime" component="div" className="text-red-500 text-sm" />
                </div>
                {/* End Time */}
                <div className="flex-1 mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">End Time <span className="text-red-500">*</span></label>
                  <Field 
                    type="time" 
                    name="endTime" 
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                  />
                  <ErrorMessage name="endTime" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

               {/* Hashtags */}
               
<FieldArray name="hashtags">
                {({ remove, push }) => (
                  <div className='my-3'>
                    {values.hashtags && values.hashtags.length > 0 && values.hashtags.map((hashtag, index) => (
                      <div key={index} className="p-4 border border-black rounded-lg space-y-4 mb-3">
                        <div className="flex flex-col">
                          <label className="block text-gray-700 text-sm font-bold mb-2">Hashtag <span className="text-red-500">*</span></label>
                          <Field
                            name={`hashtags.${index}`}
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage name={`hashtags.${index}`} component="div" className="text-red-500 text-sm" />
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
                      Add Hashtag
                    </button>
                  </div>
                )}
              </FieldArray>
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

export default CreateEvent