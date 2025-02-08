import React, { useState,useEffect, useRef } from "react";
import { Formik, Form, Field,FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Footer from "../Footer/Footer";
import AdminHeader from "./AdminHeader/AdminHeader";
import SideBarAdmin from "./SideBar/SideBar";
import Header from "../Header/Header";
import HomeTopBar from "../HomeTopBar/HomeTopBar";
import axios from "axios";
import { SERVERURL } from "../../ServerUrl";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Swal from "sweetalert2";
const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/JPEG', 'image/JPG', 'image/PNG'];
    const allowedDocTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']; // PDF, DOC, DOCX
const schema = Yup.object().shape({
  funded:Yup.boolean(),   
  chain: Yup.string().oneOf(['Solana', 'Ethereum', 'Polygon']).required('Chain is required'),
  sortbyy: Yup.string().oneOf(['Active', 'Ended', 'Upcoming']).required('Sort by is required'),
  category: Yup.string().oneOf(['AI', 'DEFI', 'Metaverse', 'NFTs', 'Infrastructure', 'Gaming']).required('Category is required'),

  title: Yup.string().max(30, 'Title cannot exceed 30 characters').required('Title is required'),
  description: Yup.string().max(110, 'Description cannot exceed 110 characters').required('Description is required'),
  
  special: Yup.boolean(),
  privatee: Yup.boolean().required('Private field is required'),

  logo: Yup.mixed().required('Logo image is required').test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => {
    return !file || allowedFileTypes.includes(file.type);
  }),
  image: Yup.mixed().required('Cover image is required').test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => {
    return !file || allowedFileTypes.includes(file.type);
  }),
  highlightsImage: Yup.mixed().nullable().test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => {
    return !file || allowedFileTypes.includes(file.type);
  }),
  utilityImage: Yup.mixed().nullable().test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => {
    return !file || allowedFileTypes.includes(file.type);
  }),
  uspImage: Yup.mixed().nullable().test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => {
    return !file || allowedFileTypes.includes(file.type);
  }),
  roadMapImage: Yup.mixed().nullable().test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => {
    return !file || allowedFileTypes.includes(file.type);
  }),
  revenueStreamImage: Yup.mixed().nullable().test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => {
    return !file || allowedFileTypes.includes(file.type);
  }),
  marketingStrategyImage: Yup.mixed().nullable().test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => {
    return !file || allowedFileTypes.includes(file.type);
  }),
  technologyImage: Yup.mixed().nullable().test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => {
    return !file || allowedFileTypes.includes(file.type);
  }),
  tokenomicImage: Yup.mixed().nullable().test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => {
    return !file || allowedFileTypes.includes(file.type);
  }),
  pictures: Yup.array()
  .of(
    Yup.mixed()
      .required('Picture is required')
      .test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => file && allowedFileTypes.includes(file.type))
  )
  .min(1, 'At least one picture is required')
  .required('Pictures are required'),

  tge: Yup.string(),
  tgeDate: Yup.date(),

  stage: Yup.string().oneOf(['Seed', 'Private Sale']).required('Stage is required'),
  location: Yup.string(),

  fundingGoal: Yup.number().min(0, 'Funding Goal must be greater than or equal to 0')
  .required('Funding Goal is required'),
  allocation: Yup.number().min(0, 'Allocation must be greater than or equal to 0')
  .required('Allocation is required'),

  investorAmount: Yup.number().min(0, 'Investor Amount must be greater than or equal to 0')
  .required('Investor Amount is required'),
  raisedMoney: Yup.number().min(0, 'Raised Money must be greater than or equal to 0')
  .required('Raied Money is required'),

  minimumInvestment: Yup.number().min(0, 'Minimum Investment must be greater than or equal to 0')
  .required('Minimum Investment is required'),
  maximumInvestment: Yup.number().min(0, 'Maximum Investment must be greater than or equal to 0')
  .required('Maximum Investment is required'),

  highlights: Yup.string(),
  utility: Yup.string(),

  usp: Yup.string(),
  roadMap: Yup.string(),

  revenueStream: Yup.string(),
  technology: Yup.string(),

  marketingStrategy: Yup.string(),
  tokenomic: Yup.string(),

  securityType: Yup.string(),
  nomineeLead: Yup.string(),

  valuationCap: Yup.number().min(0, 'Valuation Cap must be greater than or equal to 0')
  .required('Valuation Cap is required'),
  deadline: Yup.date(),
  
  discount: Yup.number()
    .min(0, 'Discount Percentage must be greater than or equal to 0')
    .max(100, 'Discount Percentage must be between 0 and 100')
    .when('special', {
      is: true,
      then: (schema) => schema.required('Discount Percentage is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  discountedValuationCap: Yup.number()
    .min(0, 'Must be greater than or equal to 0')
    .when('special', {
      is: true,
      then: (schema) => schema.required('Discounted Valuation Cap is required'),
      otherwise: (schema) => schema.notRequired(),
    }),

  docs: Yup.array().of(Yup.mixed() .test('fileType', 'Only PDF, DOC, and DOCX files are allowed', (file) => {
    return file && allowedDocTypes.includes(file.type);
  })).nullable(),

  partners: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().max(23, 'Name cannot exceed 23 characters').required('Partner name is required'),
      title: Yup.string().max(21, 'Title cannot exceed 21 characters').required('Partner title is required'),
      description: Yup.string().max(43, 'Description cannot exceed 43 characters').required('Description is required'),
      linkedinLink: Yup.string().url('Please enter a valid LinkedIn URL').required('LinkedIn link is required'),
      profilePhoto: Yup.mixed().required('Profile picture is required').test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => file && allowedFileTypes.includes(file.type)),
    })
  ).nullable(),

  teamMembers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().max(23, 'Name cannot exceed 23 characters').required('Team member name is required'),
      title: Yup.string().max(21, 'Title cannot exceed 21 characters').required('Team member title is required'),
      description: Yup.string().max(43, 'Description cannot exceed 43 characters').required('Description is required'),
      linkedinLink: Yup.string().url('Please enter a valid LinkedIn URL').required('LinkedIn link is required'),
      profilePhoto: Yup.mixed().required('Profile picture is required').test('fileType', 'Only JPG, JPEG, PNG, and SVG images are allowed', (file) => file && allowedFileTypes.includes(file.type)),
    })
  ).nullable(),

  youtubeLink: Yup.string().url('Please enter a valid URL'),
  linkedinLink: Yup.string().url('Please enter a valid URL'),
  twitterLink: Yup.string().url('Please enter a valid URL'),
});

const CreateProject = () => {
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
            Upload New Project
          </h2>
          <p className="text-lg text-white mt-2">
            Provide the details of your project. Ensure all fields are filled out accurately to share your project with the world.
          </p>
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-4"></div>
        </div>
        <Formik
          initialValues={{
            chain: '',
            sortbyy: '',
            category: '',
            title: '',
            funded:false,
            privatee: false,
            special: false,
            logo: null,
            image: null,
            highlightsImage: null,
            utilityImage: null,
            uspImage: null,
            revenueStreamImage: null,
            marketingStrategyImage: null,
            tokenomicImage: null,
            roadMapImage: null,
            technologyImage: null,
            pictures: [],
            description: '',
            youtubeLink: 'https://www.youtube.com',
            linkedinLink: 'https://www.linkedin.com',
            twitterLink: 'https://twitter.com',
            minimumInvestment: 0,
            maximumInvestment: 0,
            investorAmount:0,
            raisedMoney:0,
            stage:"N/A",
            location:'N/A',
            fundingGoal:0,
            allocation:0,
            tgeDate:'N/A',
            tge:'N/A',
            highlights:'<p>N/A<p>',
            utility:'<p>N/A<p>',
            usp:'<p>N/A<p>',
            roadMap:'<p>N/A<p>',
            revenueStream:'<p>N/A<p>',
            technology:'<p>N/A<p>',
            marketingStrategy:'<p>N/A<p>',
            tokenomic:'<p>N/A<p>',
            securityType:'N/A',
            nomineeLead:'N/A',
            valuationCap:0,
            discountedValuationCap:null,
            discount:null,
            deadline:'N/A',
            docs: [],
            partners: [
                {
                  name: '',
                  title: '',
                  description: '',
                  linkedinLink: '',
                  profilePhoto: null,
                },
            ],
            teamMembers: [
                {
                    name: '',
                    title: '',
                    description: '',
                    linkedinLink: '',
                    profilePhoto: null,
                  },
            ],
          }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            const formData = new FormData();
            // Append simple fields
            formData.append('chain', values.chain);
            formData.append('sortbyy', values.sortbyy);
            formData.append('category', values.category);
            formData.append('title', values.title);
            formData.append('funded', values.funded);
            formData.append('privatee', values.privatee);
            formData.append('special', values.special);
            formData.append('description', values.description);
            formData.append('youtubeLink', values.youtubeLink);
            formData.append('linkedinLink', values.linkedinLink);
            formData.append('twitterLink', values.twitterLink);
            formData.append('minimumInvestment', values.minimumInvestment);
            formData.append('maximumInvestment', values.maximumInvestment);
            formData.append('investorAmount', values.investorAmount);
            formData.append('raisedMoney', values.raisedMoney);
            formData.append('stage', values.stage);
            formData.append('location', values.location);
            formData.append('fundingGoal', values.fundingGoal);
            formData.append('allocation', values.allocation);
            formData.append('tgeDate', values.tgeDate);
            formData.append('tge', values.tge);
            formData.append('highlights', values.highlights);
            formData.append('utility', values.utility);
            formData.append('usp', values.usp);
            formData.append('roadMap', values.roadMap);
            formData.append('revenueStream', values.revenueStream);
            formData.append('technology', values.technology);
            formData.append('marketingStrategy', values.marketingStrategy);
            formData.append('tokenomic', values.tokenomic);
            formData.append('securityType', values.securityType);
            formData.append('nomineeLead', values.nomineeLead);
            formData.append('valuationCap', values.valuationCap);
            formData.append('discountedValuationCap', values.discountedValuationCap);
            formData.append('discount', values.discount);
            formData.append('deadline', values.deadline);

            // Handle logoImage
            if (values.logo) {
                    formData.append('logo', values.logo);
            }
            
            // Handle coverImage
            if (values.image) {
                    formData.append('image', values.image);
                }
            if (values.highlightsImage) {
                formData.append('highlightsImage', values.highlightsImage);
            }
            if (values.utilityImage) {
                formData.append('utilityImage', values.utilityImage);
            }if (values.uspImage) {
                formData.append('uspImage', values.uspImage);
            }
            if (values.roadMapImage) {
                formData.append('roadMapImage', values.roadMapImage);
            }
            if (values.tokenomicImage) {
                formData.append('tokenomicImage', values.tokenomicImage);
            }if (values.technologyImage) {
                formData.append('technologyImage', values.technologyImage);
            }
            if (values.marketingStrategyImage) {
                formData.append('marketingStrategyImage', values.marketingStrategyImage);
            }if (values.revenueStreamImage) {
                formData.append('revenueStreamImage', values.revenueStreamImage);
            }    

            // Handle pictures array
            values.pictures.forEach((file, index) => {
                    formData.append(`pictures[${index}]`, file);  
            });
            // Handle documents array
            values.docs.forEach((file, index) => {
                
                    formData.append(`docs[${index}]`, file);
            });

            const partnersJSON = JSON.stringify(values.partners);
    formData.append('partners', partnersJSON);
    values.partners.forEach((partner, index) => {
            formData.append(`partnersProfilePhoto[${index}]`, partner.profilePhoto);
    });
    // Handle teamMembers array - serialize team members to JSON
    const teamMembersJSON = JSON.stringify(values.teamMembers);
    formData.append('teamMembers', teamMembersJSON);
    values.teamMembers.forEach((teamMember, index) => {
        if (teamMember.profilePhoto) {
                formData.append(`teamMembersProfilePhoto[${index}]`, teamMember.profilePhoto);
        }
    });
            // printing data on screen
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            console.log("formData is",formData);
            const token = localStorage.getItem('token'); 
            try{
                    
            
            if(token)
            {
                const headers = {
                    'Authorization': `Bearer ${token}`, // Corrected header format
                  };
      
                  
                const response = await axios.post(
                    `${SERVERURL}/api/v1/AddProject`,formData, {
                      headers: headers, // Include the headers object in the request configuration
                      onUploadProgress: (progressEvent) => {
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                      
                        setProgress(progress);
                        setUploading(true);
                        // You can also update your UI with the current progress if needed
                    },
                    
                    });
                    if(response.status === 200)
                        {
                          Swal.fire({
                            icon: "success",
                            title: "Uploaded Successfully",
                            text: response.data.message,
                          });
                        }
                        else
                        {
                            Swal.fire({
                                icon: "error",
                                title: "An error occurred",
                                text: response. data.message,
                              });
                     
                    }
            }
            else
            {
                Swal.fire({
                    icon: "error",
                    title: "Sign in to upload Project",
                    text: "Guest User can't upload Project.",
                  });
            } 
        }catch (error) {
            Swal.fire({
              icon: "error",
              title: "An error occurred",
              text: "Project Not Uploaded.",
            });
          } finally {
            setUploading(false); // Reset uploading state to false
        }

            setSubmitting(false);     
              }
              
            }
            
        >
          {({ values,isSubmitting, setFieldValue }) => (
            <Form>

                {/* Blockchain Field */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chain">
                    Blockchain <span className="text-red-500">*</span>
                    </label>
                    <Field as="select" name="chain" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Select Chain</option>
                    <option value="Solana">Solana</option>
                    <option value="Ethereum">Ethereum</option>
                    <option value="Polygon">Polygon</option>
                    </Field>
                    <ErrorMessage name="chain" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="mt-4 mb-4 flex flex-col md:flex-row md:mb-0">
                    {/* Chain Field */}
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Category <span className="text-red-500">*</span></label>
                        <Field as="select" name="category" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                            <option value="">Select a category</option>
                            <option value="AI">AI</option>
                            <option value="DEFI">DEFI</option>
                            <option value="Metaverse">Metaverse</option>
                            <option value="NFTs">NFTs</option>
                            <option value="Infrastructure">Infrastructure</option>
                            <option value="Gaming">Gaming</option>
                        </Field>
                        <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Sort By */}
                    <div className="w-full md:w-1/2 md:pl-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sortBy">Sort By <span className="text-red-500">*</span></label>
                        <Field as="select" name="sortbyy" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                            <option value="">Select an option</option>
                            <option value="Active">Active</option>
                            <option value="Ended">Ended</option>
                            <option value="Upcoming">Upcoming</option>
                        </Field>
                        <ErrorMessage name="sortbyy" component="div" className="text-red-500 text-sm" />
                    </div>
                </div>


                <div className="mt-4 mb-4 flex flex-col md:flex-row md:mb-0">
                    {/* Private */}
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <Field
                        type="checkbox"
                        name="privatee"
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-700">Private</label>
                    </div>
                    {/* Funded */}
                    <div className="w-full md:w-1/2 md:pl-2">
                        <Field
                        type="checkbox"
                        name="funded"
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-700">Funded</label>
                    </div>
                </div>

                {/* Title Field */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title <span className="text-red-500">*</span></label>
                    <Field type="text" name="title" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mt-3 mb-3 md:mb-0 flex flex-col md:flex-row justify-between">
                    {/* Logo Image Field */}
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logo">
                            Logo Image <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            name="logo"
                            onChange={(event) => setFieldValue('logo', event.currentTarget.files[0])}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="logo" component="div" className="text-red-500 text-xs italic" />
                    </div>

                    {/* Cover Image Field */}
                    <div className="w-full md:w-1/2 md:pl-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Cover Image <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="image" component="div" className="text-red-500 text-xs italic" />
                    </div>
                </div>

                
                {/* Description Field */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description <span className="text-red-500">*</span></label>
                    <Field as="textarea" name="description" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Pictures Field */}
                <div className='my-3'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Pictures  <span className="text-red-500">*</span></label>
                    <input 
                        type="file" 
                        multiple 
                        onChange={(event) => setFieldValue("pictures", Array.from(event.currentTarget.files))} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                    />
                    <ErrorMessage name="pictures" component="div" className="text-red-500 text-sm" />
                </div>
                
                {/* Stage Field and location field */}
                <div className="my-4 flex justify-between">
                    {/* Stage */}
                    <div className='w-1/2 pr-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Stage <span className="text-red-500">*</span></label>
                        <Field as="select" name="stage" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                            <option value="">Select a stage</option>
                            <option value="Seed">Seed</option>
                            <option value="Private Sale">Private Sale</option>
                        </Field>
                        <ErrorMessage name="stage" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Location */}
                    <div className='w-1/2 pl-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Location </label>
                        <Field type="text" name="location" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                    </div>
                </div>

                <div className="my-4 flex">
                    {/* TGE */}
                    <div className="w-1/2 pr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">TGE </label>
                        <Field type="text" name="tge" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="tge" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* TGE Date */}
                    <div className="w-1/2 pl-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">TGE Date <span className="text-red-500">*</span></label>
                        <Field type="date" name="tgeDate" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="tgeDate" component="div" className="text-red-500 text-sm" />
                    </div>
                </div>

                {/* Funding Fields and alloaction */}
                <div className="my-4 flex justify-between">
                    {/* Investor Amount */}
                    <div className='w-1/2 pr-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Funding Goal in Dollars</label>
                        <Field type="number" name="fundingGoal" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="fundingGoal" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Raised Money */}
                    <div className='w-1/2 pl-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Allocation in Dollars</label>
                        <Field type="number" name="allocation" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="allocation" component="div" className="text-red-500 text-sm" />
                    </div>
                </div>

                {/* Investment Fields */}
                <div className="my-4 flex justify-between">
                    {/* Investor Amount */}
                    <div className='w-1/2 pr-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Investor Amount in Dollars</label>
                        <Field type="number" name="investorAmount" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="investorAmount" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Raised Money */}
                    <div className='w-1/2 pl-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Raised Money in Dollars</label>
                        <Field type="number" name="raisedMoney" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="raisedMoney" component="div" className="text-red-500 text-sm" />
                    </div>
                </div>

                <div className="my-4 flex justify-between">
                    {/* Minimum Investment */}
                    <div className="w-1/2 pr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Minimum Investment in Dollars</label>
                        <Field type="number" name="minimumInvestment" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="minimumInvestment" component="div" className="text-red-500 text-sm" />
                    </div>
                    
                    {/* Maximum Investment */}
                    <div className="w-1/2 pl-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Maximum Investment in Dollars</label>
                        <Field type="number" name="maximumInvestment" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="maximumInvestment" component="div" className="text-red-500 text-sm" />
                    </div>
                </div>

                {/* {valuation and deadline} */}
                <div className="my-4 flex justify-between">
                    <div className='w-1/2 pr-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Valuation Cap in Dollars</label>
                        <Field type="number" name="valuationCap" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="valuationCap" component="div" className="text-red-500 text-sm" />
                    </div>
                    {/* Deadline */}
                    <div className='w-1/2 pl-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Deadline <span className="text-red-500">*</span></label>
                        <Field type="date" name="deadline" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="deadline" component="div" className="text-red-500 text-sm" />
                    </div>
                </div>

                {/* { discount and discounted valuation cap} */}
                {values.special && (
                <div className="my-4 flex justify-between">
                    {/* Discount */}
                    <div className='w-1/2 pr-2'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Discount Percentage 0-100 <span className="text-red-500">*</span></label>
                    <Field 
                        type="number" 
                        name="discount" 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                    />
                    <ErrorMessage name="discount" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className='w-1/2 pl-2'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Discounted Valuation Cap in Dollars <span className="text-red-500">*</span></label>
                    <Field 
                        type="number" 
                        name="discountedValuationCap" 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                    />
                    <ErrorMessage name="discountedValuationCap" component="div" className="text-red-500 text-sm" />
                    </div>
                </div>
                )}

                {/* Special */}
                <div className='mb-4'>
                    <Field
                    type="checkbox"
                    name="special"
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">Special</label>
                </div>

                {/* {hightlights and utility} */}
                <div className="">
                    {/* highlights */}
                    <div className='mb-3'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Highlights</label>
                        <ReactQuill 
                            value={values.highlights} 
                            onChange={(content) => setFieldValue('highlights', content)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="highlights" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="highlightsImage">
                            Highlights Image
                        </label>
                        <input
                            type="file"
                            name="highlightsImage"
                            onChange={(event) => setFieldValue('highlightsImage', event.currentTarget.files[0])}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="highlightsImage" component="div" className="text-red-500 text-xs italic" />
                    </div>                    

                    {/* utility */}
                    <div className='mb-3'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Utility</label>
                        <ReactQuill 
                            value={values.utility} 
                            onChange={(content) => setFieldValue('utility', content)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="utility" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="utilityImage">
                        Utility Image
                        </label>
                        <input
                            type="file"
                            name="utilityImage"
                            onChange={(event) => setFieldValue('utilityImage', event.currentTarget.files[0])}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="utilityImage" component="div" className="text-red-500 text-xs italic" />
                    </div>

                </div>

                {/* {usp and roadmap} */}
                <div className="">
                    {/* usp */}
                    <div className='mb-3'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">USP</label>
                        <ReactQuill 
                            value={values.usp} 
                            onChange={(content) => setFieldValue('usp', content)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="usp" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uspImage">
                        Usp Image
                        </label>
                        <input
                            type="file"
                            name="uspImage"
                            onChange={(event) => setFieldValue('uspImage', event.currentTarget.files[0])}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="uspImage" component="div" className="text-red-500 text-xs italic" />
                    </div>

                    {/* roadMap */}
                    <div className='mb-3'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">RoadMap</label>
                        <ReactQuill 
                            value={values.roadMap} 
                            onChange={(content) => setFieldValue('roadMap', content)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="roadMap" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roadMapImage">
                        RoadMap Image
                        </label>
                        <input
                            type="file"
                            name="roadMapImage"
                            onChange={(event) => setFieldValue('roadMapImage', event.currentTarget.files[0])}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="roadMapImage" component="div" className="text-red-500 text-xs italic" />
                    </div>
                </div>

                {/* {marketing strategy and tokenomics} */}
                <div className="">
                    {/* Marketing Strategy */}
                    <div className='mb-3'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Marketing Strategy</label>
                        <ReactQuill 
                            value={values.marketingStrategy} 
                            onChange={(content) => setFieldValue('marketingStrategy', content)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="marketingStrategy" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marketingStrategyImage">
                        Marketing Strategy Image
                        </label>
                        <input
                            type="file"
                            name="marketingStrategyImage"
                            onChange={(event) => setFieldValue('marketingStrategyImage', event.currentTarget.files[0])}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="marketingStrategyImage" component="div" className="text-red-500 text-xs italic" />
                    </div>



                    {/* Tokenomics */}
                    <div className='mb-3'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Tokenomics</label>
                        <ReactQuill 
                            value={values.tokenomic} 
                            onChange={(content) => setFieldValue('tokenomic', content)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="tokenomic" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tokenomicImage">
                        Tokenomic Image
                        </label>
                        <input
                            type="file"
                            name="tokenomicImage"
                            onChange={(event) => setFieldValue('tokenomicImage', event.currentTarget.files[0])}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="tokenomicImage" component="div" className="text-red-500 text-xs italic" />
                    </div>

                </div>

                {/* revenuestream */}
                <div className='mb-3'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Revenue Stream</label>
                    <ReactQuill 
                        value={values.revenueStream} 
                        onChange={(content) => setFieldValue('revenueStream', content)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="revenueStream" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="revenueStreamImage">
                        Revenue Stream Image
                        </label>
                        <input
                            type="file"
                            name="revenueStreamImage"
                            onChange={(event) => setFieldValue('revenueStreamImage', event.currentTarget.files[0])}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="revenueStreamImage" component="div" className="text-red-500 text-xs italic" />
                    </div>

                <div className='mb-3'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Technology</label>
                    <ReactQuill 
                        value={values.technology} 
                        onChange={(content) => setFieldValue('technology', content)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="technology" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="technologyImage">
                        Technology Image
                        </label>
                        <input
                            type="file"
                            name="technologyImage"
                            onChange={(event) => setFieldValue('technologyImage', event.currentTarget.files[0])}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="technologyImage" component="div" className="text-red-500 text-xs italic" />
                    </div>


                {/* {security type and nominee lead} */}
                <div className="my-4 flex justify-between">
                    {/* security type */}
                    <div className='w-1/2 pr-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Security Type</label>
                        <Field type="text" name="securityType" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="securityType" component="div" className="text-red-500 text-sm" />
                    </div>
                    {/* nominee lead */}
                    <div className='w-1/2 pl-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nominee Lead</label>
                        <Field type="text" name="nomineeLead" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="nomineeLead" component="div" className="text-red-500 text-sm" />
                    </div>
                </div>

                 {/* {twitterlink and technology} */}
                 <div className="my-4 flex justify-between">
                
                    {/* twitterLink */}
                    <div className='w-1/2 pl-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Twitter Link</label>
                        <Field type="url" name="twitterLink" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="twitterLink" component="div" className="text-red-500 text-sm" />
                    </div>
                </div>

                {/* {links} */}
                <div className="my-4 flex justify-between">
                    {/* YouTube Link */}
                    <div className='w-1/2 pr-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">YouTube Link</label>
                        <Field type="url" name="youtubeLink" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="youtubeLink" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* LinkedIn Link */}
                    <div className='w-1/2 pl-2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">LinkedIn Link</label>
                        <Field type="url" name="linkedinLink" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        <ErrorMessage name="linkedinLink" component="div" className="text-red-500 text-sm" />
                    </div>
                </div>

                {/* add partners */}
                <FieldArray name="partners">
                    {({ remove, push }) => (
                    <div>
                        {values.partners && values.partners.length > 0 && values.partners.map((partner, index) => (
                        <div key={index} className="p-4 border border-black rounded-lg space-y-4 mb-3">
                            <div className="flex flex-col">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name <span className="text-red-500">*</span></label>
                            <Field
                                name={`partners.${index}.name`}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage name={`partners.${index}.name`} component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex flex-col">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Title <span className="text-red-500">*</span></label>
                            <Field
                                name={`partners.${index}.title`}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage name={`partners.${index}.title`} component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex flex-col">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description <span className="text-red-500">*</span></label>
                            <Field
                                name={`partners.${index}.description`}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage name={`partners.${index}.description`} component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex flex-col">
                            <label className="block text-gray-700 text-sm font-bold mb-2">LinkedIn Link <span className="text-red-500">*</span></label>
                            <Field
                                name={`partners.${index}.linkedinLink`}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage name={`partners.${index}.linkedinLink`} component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex flex-col">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture <span className="text-red-500">*</span></label>
                            <input
                                id={`partners.${index}.profilePhoto`}
                                name={`partners.${index}.profilePhoto`}
                                type="file"
                                onChange={(event) => {
                                setFieldValue(`partners.${index}.profilePhoto`, event.currentTarget.files[0]);
                                }}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage name={`partners.${index}.profilePhoto`} component="div" className="text-red-500 text-sm" />
                            </div>

                            <button type="button" onClick={() => remove(index)}
                            className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded">
                            Remove Partner
                            </button>

                        </div>
                        ))}

                        <button
                        type="button"
                        onClick={() => push({ name: '', title: '', description: '', linkedinLink: '', profilePic: null })}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                        Add Partner
                        </button>
                    </div>
                    )}
                </FieldArray>

                {/* documents Field */}
                <div className='mb-4'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Documents</label>
                    <input 
                        type="file" 
                        multiple 
                        onChange={(event) => setFieldValue("docs", Array.from(event.currentTarget.files))} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                    />
                    <ErrorMessage name="docs" component="div" className="text-red-500 text-sm" />
                </div>

                {/* add teamMembers */}
                <FieldArray name="teamMembers">
                    {({ remove, push }) => (
                    <div>
                        {values.teamMembers && values.teamMembers.length > 0 && values.teamMembers.map((partner, index) => (
                        <div key={index} className="p-4 border border-black rounded-lg space-y-4 mb-4">
                            <div className="flex flex-col">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name <span className="text-red-500">*</span></label>
                            <Field
                                name={`teamMembers.${index}.name`}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage name={`teamMembers.${index}.name`} component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex flex-col">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Title <span className="text-red-500">*</span></label>
                            <Field
                                name={`teamMembers.${index}.title`}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage name={`teamMembers.${index}.title`} component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex flex-col">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description <span className="text-red-500">*</span></label>
                            <Field
                                name={`teamMembers.${index}.description`}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage name={`teamMembers.${index}.description`} component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex flex-col">
                            <label className="block text-gray-700 text-sm font-bold mb-2">LinkedIn Link <span className="text-red-500">*</span></label>
                            <Field
                                name={`teamMembers.${index}.linkedinLink`}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage name={`teamMembers.${index}.linkedinLink`} component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex flex-col">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture <span className="text-red-500">*</span></label>
                            <input
                                id={`teamMembers.${index}.profilePhoto`}
                                name={`teamMembers.${index}.profilePhoto`}
                                type="file"
                                onChange={(event) => {
                                setFieldValue(`teamMembers.${index}.profilePhoto`, event.currentTarget.files[0]);
                                }}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage name={`teamMembers.${index}.profilePhoto`} component="div" className="text-red-500 text-sm" />
                            </div>

                            <button type="button" onClick={() => remove(index)}
                            className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded">
                            Remove Team-Member
                            </button>

                        </div>
                        ))}

                        <button
                        type="button"
                        onClick={() => push({ name: '', title: '', description: '', linkedinLink: '', profilePic: null })}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                        Add Team-Member
                        </button>
                    </div>
                    )}
                </FieldArray>

              {/* Submit button */}
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
  );
};

export default CreateProject;