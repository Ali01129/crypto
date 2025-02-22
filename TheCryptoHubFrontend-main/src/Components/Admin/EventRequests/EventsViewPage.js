import { PaperClipIcon } from '@heroicons/react/20/solid';
import { SERVERURL } from '../../../ServerUrl';
import DOMPurify from 'dompurify';

export default function EventsViewPage({ selectedRow, onCloseDialog }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75 z99">
      <div className="absolute top-1/2 z100 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg max-w-4xl scrolll">
      <button className="absolute top-4 right-4 p-2 rounded-md bg-gray-50 text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={onCloseDialog}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div>
          <div className="px-2 sm:px-0">
          <h1 className="text-2xl font-semibold leading-7 text-gray-900 mb-2">Event Details of {selectedRow.title}</h1>
    <p className="mt-1 max-w-2xl text-base leading-6 text-gray-500">All Details are Below</p>
            </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {/* Basic Info */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Basic Info</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  
                  <p><strong>Category:</strong> {selectedRow.type}</p>
                  <p><strong>Short Description:</strong> {selectedRow.shortDescription}</p>
                  <p><strong>Country Code:</strong> {selectedRow.countryCode}</p>
                  <p><strong>Location:</strong> {selectedRow.location}</p>
                </div>
              </div>
              
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Content</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></div>
              <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedRow.description) }}></div>  
                </div>
              </div>
                           {/* Financial Info */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Date & Time</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p><strong>Start Date:</strong> {selectedRow.startDate}</p>
                  <p><strong>End Date:</strong> {selectedRow.endDate}</p>
                  <p><strong>Start Time:</strong> {selectedRow.startTime}</p>
                  <p><strong>End Time:</strong> {selectedRow.endTime}</p>
                </div>
              </div>
              {/* Marketing and Communication */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Marketing and Communication</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <strong className="me-2">Website Link:</strong><br />

                <a target="_blank" rel="noopener noreferrer" href={selectedRow.websiteLink} class="ml-2 text-blue-500 hover:text-gray-700 transition duration-300 inline-flex items-center justify-center p-2 text-base font-medium text-gray-800 rounded-lg bg-gray-100">
  
  <span>{selectedRow.websiteLink}</span>
</a>
<br />
<strong className="me-2">LinkedIn Link:</strong><br />

<a target="_blank" rel="noopener noreferrer" href={selectedRow.linkedinLink} class="ml-2 text-blue-500 hover:text-gray-700 transition duration-300 inline-flex items-center justify-center p-2 text-base font-medium text-gray-800 rounded-lg bg-gray-100">
  
  <span>{selectedRow.linkedinLink}</span>
</a>
<br />
<strong className="me-2">Twitter Link:</strong><br />


<a target="_blank" rel="noopener noreferrer" href={selectedRow.twitterLink} class="ml-2 text-blue-500 hover:text-gray-700 transition duration-300 inline-flex items-center justify-center p-2 text-base font-medium text-gray-800 rounded-lg bg-gray-100">
  <span>{selectedRow.twitterLink}</span>
</a>
<br />
 <strong className="me-2">Instagram Url:</strong><br />

<a target="_blank" rel="noopener noreferrer" href={selectedRow.instagramLink} class="ml-2 text-blue-500 hover:text-gray-700 transition duration-300 inline-flex items-center justify-center p-2 text-base font-medium text-gray-800 rounded-lg bg-gray-100">
 
  <span>{selectedRow.instagramLink}</span>
</a>
<br />


                </div>
              </div>
{/* Partners */}
<div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Hashtags</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {selectedRow.hashtags.map((partner, index) => (
                    <div key={index} className="border-t border-gray-200 pt-4">
                      <p><strong>Hashtag:</strong> 
                      <br />
<a target="_blank" rel="noopener noreferrer" href={partner} class="ml-2 text-blue-500 hover:text-gray-700 transition duration-300 inline-flex items-center justify-center p-2 text-base font-medium text-gray-800 rounded-lg bg-gray-100">
  <span>{partner}</span>
</a>
<br />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </dl>
          </div>
         
        </div>
      </div>
    </div>
  );
}