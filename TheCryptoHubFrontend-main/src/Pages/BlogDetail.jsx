import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import '../Components/Events/eventDetails.css';
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { SERVERURL } from '../ServerUrl';
import ReactPlayer from 'react-player';

function BlogDetail() {

  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(0);

  const { blogId } = useParams();
  const location = useLocation();
  const { state } = location;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      const data = { email };

      console.log("email is :", email);
      console.log("Sending request to:", `${SERVERURL}/api/v1/subscribe`);

      setLoader(1);

      try {
        const response = await axios.post(`${SERVERURL}/api/v1/subscribe`, data);

        console.log("Response:", response);
        setLoader(0);

        if (response.data.success === true) {
          Swal.fire(response?.data?.message, response.data.status, 'success');
          setEmail("");
        } else {
          Swal.fire(response?.data?.message, response.data.status, 'warning');
          setEmail("");
        }
      } catch (error) {
        console.error("Error:", error);
        setLoader(0);
        Swal.fire('Error', 'An error occurred while subscribing TCH', 'error');
      }
    } else {
      Swal.fire('Empty Field', 'Please Enter Email', 'warning');
    }
  };

  return (
    <div>
      <Header />
      <div className='eventDetails-first-div'>
        <div className='second-component-middle2'>
          <div className="flex flex-wrap items-center space-x-2">
            <h4 className="main-heading-event-details bg-gray-200 text-gray-600 px-2 py-0 rounded-md" style={{
  paddingBottom:'5px',

}}>
              {state.category}
            </h4>
            <h2 className="text-3xl font-extrabold text-gray-900">{state.title}</h2>
          </div>

          <p className="text-gray-600 text-left text-base sm:text-lg w-full">{state.shortDescription}</p>

          <div className="userlinee flex items-center space-x-0" style={{
  marginTop:'-17px',
}}>
            <div className="pictureee">
              <img
                src={SERVERURL + '/uploads/' + state.authorProfilePic}
                alt="AuthorPic"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div style={{
    display:'flex',
    flexWrap:'wrap'
}}>
            <div className="text-gray-600 font-bold" style={{
    alignItems:'center',
}}>{state.authorName} • </div>
            <div className="text-gray-600" style={{
  alignItems:'center',
  paddingLeft:'7px',
}}>Posted {state.postedDate} • </div>
            <div className="text-gray-600 " style={{
  alignItems:'center',
  paddingLeft:'7px',
}}>{state.readTime} read</div>
            </div>
          </div>

          <img className='image-middle-event-details' src={SERVERURL + '/uploads/' + state.image} />

          <div className='backkkk'>
            <p className="text-gray-600 text-left text-base sm:text-lg w-full" 
               dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(state.description) }}></p>
          </div>

          <div className='second-component-middle2'>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">References</h3>
            <ol className="flex flex-wrap gap-2 nextlevel">
              {state.references && state.references.length > 0 ? (
                state.references.map((reference, index) => (
                  reference && (
                    <li className="flex" key={index}>
                      <a
                        href={reference}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800 transition-colors duration-300 rounded-full py-2 px-4 shadow-md linkClassAbc2"
                      >
                        <i className="fas fa-link mr-2 text-gray-600 linkClassAbc"></i>
                        {reference}
                      </a>
                    </li>
                  )
                ))
              ) : (
                <li className="text-gray-500">No references available.</li>
              )}
            </ol>
          </div>
        </div>

        <div className='first-component-right2'>
          {state.ytVideo && (
            <div className='first-component-right22'>
              <ReactPlayer
                url={state.ytVideo}
                width='100%'
                height='100%'
                controls={true}
              />
            </div>
          )}
          <div className='belowCard sticky top-0 w-full'>
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md sm:max-w-lg mx-auto h-auto sm:h-[350px] flex flex-col justify-center items-start space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-left w-full">Subscribe to Our Newsletter</h2>
              <p className="text-gray-600 text-left text-base sm:text-lg w-full">Stay updated with our latest news and offers. Enter your email below to subscribe.</p>
              <form className="w-full flex flex-col sm:flex-row" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 flex-grow"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <button
                  type="submit"
                  className="h-12 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 60 }}>
        <Footer />
      </div>
    </div>
  );
}

export default BlogDetail;
