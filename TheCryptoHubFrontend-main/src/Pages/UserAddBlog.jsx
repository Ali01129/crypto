import React, { useState } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import HomeTopBar from "../Components/HomeTopBar/HomeTopBar";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().max(30, 'Title cannot exceed 30 characters').required('Title is required'),
  shortDescription: yup.string().max(50, 'Short description cannot exceed 50 characters').required('Short description is required'),
  description: yup.string().required('Description is required'),
  ytVideo: yup.string().url('Please enter a valid YouTube URL').nullable(),
  readTime: yup.string().required('Read time is required'),
  coverImage: yup.mixed().required('Cover image is required'),
  references: yup.array().of(yup.string().url('Please enter a valid URL')).nullable(),
});

const UserAddBlog = () => {
  const [richText, setRichText] = useState('');
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'references',
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('shortDescription', data.shortDescription);
      formData.append('description', richText);
      formData.append('coverImage', data.coverImage[0]);
      formData.append('ytVideo', data.ytVideo);
      formData.append('readTime', data.readTime);
      formData.append('userId', 'yourUserId');  // Replace with actual userId
      formData.append('currentDate', 'September 20, 2024');
      formData.append('references', JSON.stringify(data.references));

      await axios.post('/api/addBlog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Blog added successfully!');
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <>
      
      <Header />
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10 mb-10">
      <div className="mb-8 bg-[#03BABC] p-6 rounded-lg">
          <h2 className="text-4xl font-bold text-white mb-4">
            Upload New Blog
          </h2>
          <p className="text-lg text-white mt-2">
            Share your insights and experiences with the world by adding a new blog post. Make sure to include all the essential details and media.
          </p>
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-4"></div>
        </div>
        {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="title">Title</label>
            <input
              type="text"
              {...register('title')}
              className={`w-full mt-2 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.title && <p className="text-red-600 text-sm mt-2">{errors.title.message}</p>}
          </div>
          
          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="shortDescription">Short Description</label>
            <input
              type="text"
              {...register('shortDescription')}
              className={`w-full mt-2 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.shortDescription ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.shortDescription && <p className="text-red-600 text-sm mt-2">{errors.shortDescription.message}</p>}
          </div>
          
          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="description">Description</label>
            <ReactQuill
              value={richText}
              onChange={setRichText}
              className={`mt-2 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              theme="snow"
              placeholder="Write your blog content here..."
            />
            {errors.description && <p className="text-red-600 text-sm mt-2">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="coverImage">Cover Image</label>
            <input
              type="file"
              {...register('coverImage')}
              className={`w-full mt-2 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.coverImage ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.coverImage && <p className="text-red-600 text-sm mt-2">{errors.coverImage.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="ytVideo">YouTube Video Link</label>
            <input
              type="text"
              {...register('ytVideo')}
              className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              placeholder="https://www.youtube.com/..."
            />
            {errors.ytVideo && <p className="text-red-600 text-sm mt-2">{errors.ytVideo.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="readTime">Read Time(In mins)</label>
            <input
              type="text"
placeholder="10 mins"
              {...register('readTime')}
              className={`w-full mt-2 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.readTime ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.readTime && <p className="text-red-600 text-sm mt-2">{errors.readTime.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="references">Reference Links</label>
            <div className="space-y-4">
              {fields.map((item, index) => (
                <div key={item.id} className="flex items-center">
                  <input
                    type="text"
                    {...register(`references.${index}`)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 mr-2"
                    placeholder={`www.reference${index + 1}.com`}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => append('')}
              className="mt-4 text-blue-500 hover:text-blue-700 font-semibold"
            >
              + Add Reference
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Submit
          </button>
        </form> */}
        //form
      </div>
      <Footer />
    </>
  );
};

export default UserAddBlog;
