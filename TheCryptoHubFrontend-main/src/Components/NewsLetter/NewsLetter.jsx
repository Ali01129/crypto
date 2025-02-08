import React, { useState } from 'react';
import './NewsLetter.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import emailImg from './../../images/emailBox.png';
import { BiLoaderAlt } from 'react-icons/bi';
import { SERVERURL } from '../../ServerUrl';

const NewsLetter = () => {
    const [email, setEmail] = useState('');
    const [valid, setValid] = useState();
    const [loader, setLoader] = useState(0);
    const [isChecked, setIsChecked] = useState(false); // State for checkbox

    const subscribeClicked = async () => {
        if (email && isChecked) { // Check if email is entered and checkbox is checked
            const data = {
                email: email,
            };

            console.log("email is :", email);
            console.log("Sending request to:", `${SERVERURL}/api/v1/subscribe`);

            setLoader(1);

            try {
                const response = await axios.post(
                    `${SERVERURL}/api/v1/subscribe`,
                    data
                );

                console.log("Response:", response);
                setLoader(0);

                if (response.data.success === true) {
                    Swal.fire(
                        response?.data?.message,
                        response.data.status,
                        'success'
                    );
                    setEmail("");
                    setIsChecked(false); // Reset checkbox
                } else {
                    Swal.fire(
                        response?.data?.message,
                        response.data.status,
                        'warning'
                    );
                    setEmail("");
                }

            } catch (error) {
                console.error("Error:", error);
                setLoader(0);
                Swal.fire(
                    'Error',
                    'An error occurred while subscribing',
                    'error'
                );
            }
        } else {
            Swal.fire(
                'Empty Field',
                email ? 'Please agree to the Terms and Privacy statements' : 'Please Enter Email',
                'warning'
            );
        }
    }

    return (
        <>
            <div className='mainNewLLetter' id='newsletter' >
              
                <div className='topLeftNews'>
                    <div className='topMiddlNewsTxt'>
                        <div className='newsLetterTxt fontheading2 leftpadiss' style={{ letterSpacing: "0.6px" }}>
                        Our Newsletter
                        </div>
                        <div className='subKepTxt'>
                        Join our weekly newsletter to stay updated on the latest news & analysis sent to your mailbox.
                        </div>
                    </div>
                </div>
                <div className='topInputBtn'>
                    <div>
                        <input
                            placeholder='Type your email address '
                            className='inputEmail'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    {/* Checkbox for Terms and Privacy statements */}
                    <div className='checkboxContainer'>
                        <input
                            type='checkbox'
                            id='termsCheckbox'
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        <label htmlFor='termsCheckbox'>
                            By joining, I agree to TCH Terms & Privacy statements
                        </label>
                    </div>

                    <div
                        className='btnSubscribe'
                        onClick={subscribeClicked}
                    >
                        {loader === 1 ?
                            <BiLoaderAlt className='loaderNewLetter' /> :
                            "Subscribe"}
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewsLetter;
