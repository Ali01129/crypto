import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import HomeTopBar from "../Components/HomeTopBar/HomeTopBar";

const schema = Yup.object().shape({
  //chain: Yup.string().oneOf(['Solana', 'Ethereum', 'Polygon']).required('Chain is required'),
  //private: Yup.boolean().required('Private field is required'),
  //category: Yup.string().oneOf(['AI', 'DEFI', 'Metaverse', 'NFTs', 'Infrastructure', 'Gaming']).required('Category is required'),
  //sortBy: Yup.string().oneOf(['Active', 'Ended', 'Upcoming']).required('Sort by is required'),
  //tge: Yup.string().required('TGE is required'),
  //valuationCap: Yup.number().required('Valuation cap is required').positive('Valuation cap must be positive'),
  //special: Yup.boolean(),
  // discountedValuationCap: Yup.number().when('special', {
  //   is: true,
  //   then: Yup.number().positive('Discounted valuation cap must be positive'),
  //   otherwise: Yup.number().notRequired()
  // }),
  // discount: Yup.number().when('special', {
  //   is: true,
  //   then: Yup.number().min(0).max(100, 'Discount Percentage must be between 0 and 100'),
  //   otherwise: Yup.number().notRequired()
  // }),
  //stage: Yup.string().oneOf(['Seed', 'Private Sale']).required('Stage is required'),
  //location: Yup.string().required('Location is required'),
  //title: Yup.string().max(30, 'Title cannot exceed 30 characters').required('Title is required'),
  //investorAmount: Yup.number().required('Investor amount is required').positive('Investor amount must be positive'),
  //raisedMoney: Yup.number().required('Raised money is required').positive('Raised money must be positive'),
  //minimumInvestment: Yup.number().required('Minimum investment is required').positive('Minimum investment must be positive'),
  //maximumInvestment: Yup.number().required('Maximum investment is required').positive('Maximum investment must be positive'),
  //description: Yup.string().max(110, 'Description cannot exceed 110 characters').required('Description is required'),
  //logoImage: Yup.mixed().required('Logo image is required'),
  //coverImage: Yup.mixed().required('Cover image is required'),
  //fundingGoal: Yup.number().required('Funding goal is required').positive('Funding goal must be positive'),
  //tgeDate: Yup.date().required('TGE date is required'),
  //allocation: Yup.number().required('Allocation is required').positive('Allocation must be positive'),
  //youtubeLink: Yup.string().url('Please enter a valid URL').required('YouTube link is required'),
  //linkedinLink: Yup.string().url('Please enter a valid URL').required('LinkedIn link is required'),
  //twitterLink: Yup.string().url('Please enter a valid URL').required('Twitter link is required'),
  //pictures: Yup.array().of(Yup.mixed()).min(1, 'At least one picture is required').required('Pictures are required'),
  //youtubeVideoLink: Yup.string().url('Please enter a valid YouTube URL').nullable(),
  //highlights: Yup.string().required('Highlights are required'),
  //utility: Yup.string().required('Utility is required'),
  //usp: Yup.string().required('USP is required'),
  //roadMap: Yup.string().required('Road Map is required'),
  //revenueStream: Yup.string().required('Revenue Stream is required'),
  //technology: Yup.string().required('Technology is required'),
  
  //marketingStrategy: Yup.string().required('Marketing Strategy is required'),
  //tokenomics: Yup.string().required('Tokenomics is required'),
  
  // deadline: Yup.date().required('Deadline is required'),

  //securityType: Yup.string().required('Security Type is required'),
  //nomineeLead: Yup.string().required('Nominee Lead is required'),

  partners: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Partner name is required'),
      title: Yup.string().required('Partner title is required'),
      description: Yup.string().max(25, 'Description cannot exceed 25 characters').required('Description is required'),
      linkedinLink: Yup.string().url('Please enter a valid LinkedIn URL').required('LinkedIn link is required'),
      profilePic: Yup.mixed().required('Profile picture is required'),
    })
  ).nullable(),
  teamMembers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Team member name is required'),
      title: Yup.string().required('Team member title is required'),
      description: Yup.string().max(25, 'Description cannot exceed 25 characters').required('Description is required'),
      linkedinLink: Yup.string().url('Please enter a valid LinkedIn URL').required('LinkedIn link is required'),
      profilePic: Yup.mixed().required('Profile picture is required'),
    })
  ).nullable(),
  // documents: Yup.array().of(Yup.mixed()).nullable()
});

const CreateProject = () => {
  return (
    <>
      <Header />
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
            private: false,
            category: '',
            sortBy: '',
            tge: '',
            valuationCap: '',
            special: false,
            discountedValuationCap: '',
            discount: '',
            stage: '',
            location: '',
            title: '',
            investorAmount: '',
            raisedMoney: '',
            minimumInvestment: '',
            maximumInvestment: '',
            description: '',
            logoImage: null,
            coverImage: null,
            fundingGoal: '',
            tgeDate: '',
            allocation: '',
            youtubeLink: '',
            linkedinLink: '',
            twitterLink: '',
            pictures: [],
            youtubeVideoLink: '',
            highlights: '',
            utility: '',
            usp: '',
            roadMap: '',
            revenueStream: '',
            technology: '',
            marketingStrategy: '',
            tokenomics: '',
            deadline: '',
            securityType: '',
            nomineeLead: '',
            partners: [],
            teamMembers: [],
            documents: []
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              {/* Example of a single field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chain">
                  Blockchain Chain
                </label>
                <Field as="select" name="chain" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Select Chain</option>
                  <option value="Solana">Solana</option>
                  <option value="Ethereum">Ethereum</option>
                  <option value="Polygon">Polygon</option>
                </Field>
                <ErrorMessage name="chain" component="div" className="text-red-500 text-xs italic" />
              </div>

              {/* Add more fields as needed following the same pattern */}

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logoImage">
                  Logo Image
                </label>
                <input
                  type="file"
                  name="logoImage"
                  onChange={(event) => setFieldValue('logoImage', event.currentTarget.files[0])}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="logoImage" component="div" className="text-red-500 text-xs italic" />
              </div>

              {/* Submit button */}
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
};

export default CreateProject;