import React from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import HomeTopBar from "../Components/HomeTopBar/HomeTopBar";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().max(50, 'Title cannot exceed 50 characters').required('Title is required'),
  description: yup.string().required('Description is required'),
  startDate: yup.date().required('Start date is required').min(new Date(), 'Start date cannot be in the past'),
  endDate: yup.date().required('End date is required').min(yup.ref('startDate'), 'End date must be later than start date'),
  type: yup.string().oneOf(['Game', 'AI', 'Defi', 'Metaverse', 'Crypto'], 'Invalid event type').required('Type is required'),
  location: yup.string().required('Location is required'),
  countryCode: yup.string().matches(/^[A-Z]{2}$/, 'Invalid country code').required('Country code is required'),
  websiteLink: yup.string().url('Please enter a valid URL').nullable(),
  instagramLink: yup.string().url('Please enter a valid URL').nullable(),
  twitterLink: yup.string().url('Please enter a valid URL').nullable(),
  linkedinLink: yup.string().url('Please enter a valid URL').nullable(),
  hashtags: yup.array().of(yup.string()).nullable(),
  startTime: yup.string().matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format').required('Start time is required'),
  endTime: yup.string().matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format').required('End time is required'),
  coverImage: yup.mixed().required('Cover image is required').test('fileSize', 'File too large', value => value && value[0] && value[0].size <= 5 * 1024 * 1024), // Max 5MB
});

const EventForm = ({ userId }) => { // Accept userId as a prop
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hashtags',
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('startDate', data.startDate);
      formData.append('endDate', data.endDate);
      formData.append('type', data.type);
      formData.append('location', data.location);
      formData.append('countryCode', data.countryCode);
      formData.append('websiteLink', data.websiteLink);
      formData.append('instagramLink', data.instagramLink);
      formData.append('twitterLink', data.twitterLink);
      formData.append('linkedinLink', data.linkedinLink);
      formData.append('startTime', data.startTime);
      formData.append('endTime', data.endTime);
      formData.append('coverImage', data.coverImage[0]); // Adding cover image
      formData.append('hashtags', JSON.stringify(data.hashtags));
      formData.append('userId', userId); // Add userId to the form data

      await axios.post('/api/addEvent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <>
    
      <Header />
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10 mb-10">
      <div className="mb-8 bg-[#03BABC] p-6 rounded-lg">
  <h2 className="text-4xl font-bold text-white mb-4">
    Upload New Event
  </h2>
  <p className="text-lg text-white mt-2">
    Provide the details of your event. Ensure all fields are filled out accurately to share your event with the world.
  </p>
  <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-4"></div>
</div>
//form
      </div>
      <Footer />
    </>
  );
};

export default EventForm;

