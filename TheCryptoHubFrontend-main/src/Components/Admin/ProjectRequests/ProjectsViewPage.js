import { PaperClipIcon } from '@heroicons/react/20/solid';
import { SERVERURL } from '../../../ServerUrl';
import DOMPurify from 'dompurify';

export default function ProjectsViewPage({ selectedRow, onCloseDialog }) {
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
          <h1 className="text-2xl font-semibold leading-7 text-gray-900 mb-2">Project Details of {selectedRow.title}</h1>
    <p className="mt-1 max-w-2xl text-base leading-6 text-gray-500">All Details are Below</p>
            </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {/* Basic Info */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Basic Info</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p><strong>Chain:</strong> {selectedRow.chain}</p>
                  <p><strong>Private:</strong> {selectedRow.privatee?"Yes":"No"}</p>
                  <p><strong>Category:</strong> {selectedRow.category}</p>
                  <p><strong>Deadline:</strong> {selectedRow.deadline}</p>
                  <p><strong>Location:</strong> {selectedRow.location}</p>
                </div>
              </div>
              {/* Financial Info */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Financial Info</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p><strong>Investor Amount:</strong> {selectedRow.investorAmount}</p>
                  <p><strong>Raised Money:</strong> {selectedRow.raisedMoney}</p>
                  <p><strong>Minimum Investment:</strong> {selectedRow.minimumInvestment}</p>
                  <p><strong>Valuation Cap:</strong> {selectedRow.valuationCap}</p>
                </div>
              </div>
              {/* Funding Details */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Funding Details</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p><strong>Max Investment:</strong> {selectedRow.maximumInvestment}</p>
                  <p><strong>Funding Goal:</strong> {selectedRow.fundingGoal}</p>
                  <p><strong>TGE Date:</strong> {selectedRow.tgeDate}</p>
                  <p><strong>Allocation:</strong> {selectedRow.allocation}</p>
                </div>
              </div>
              {/* Marketing and Communication */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Marketing and Communication</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <strong className="me-2">Youtube Link:</strong><br />

                <a target="_blank" rel="noopener noreferrer" href={selectedRow.youtubeLink} class="ml-2 text-blue-500 hover:text-gray-700 transition duration-300 inline-flex items-center justify-center p-2 text-base font-medium text-gray-800 rounded-lg bg-gray-100">
  
  <span>{selectedRow.youtubeLink}</span>
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


                </div>
              </div>

              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Technology</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedRow.technology) }}></div>  
                </div>
              </div>

              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Highlights</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedRow.highlights) }}></div>  
                </div>
              </div>

              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">USP</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedRow.usp) }}></div>  
                </div>
              </div>

              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Utility</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedRow.utility) }}></div>  
                </div>
              </div>

              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Road Map</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedRow.roadMap) }}></div>  
                </div>
              </div>

              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Tokenomic</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedRow.tokenomic) }}></div>  
                </div>
              </div>

              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Revenue Stream</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedRow.revenueStream) }}></div>  
                </div>
              </div>

              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Marketing Strategy</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedRow.marketingStrategy) }}></div>  
                </div>
              </div>






              {/* Documents */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Documents</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {selectedRow.docs.map((doc, index) => (
                    <a href={SERVERURL+'/uploads/'+doc.docFile} className='dowDdiv'>
                    <div className='dowDdivl'> 
                    <i class="fa-regular fa-file-lines doccc"></i>           </div>
                               <div className='dowDdivr'> 
                               {doc.docName}           
                               </div>
                    </a>
                  ))}
                </div>
              </div>
              {/* Partners */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Partners</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {selectedRow.partners.map((partner, index) => (
                    <div key={index} className="border-t border-gray-200 pt-4">
                      <p><strong>Name:</strong> {partner.name}</p>
                      <p><strong>Title:</strong> {partner.title}</p>
                      <p><strong>Description:</strong> {partner.description}</p>
                      <p><strong>LinkedIn Link:</strong> 
                      <br />
<a target="_blank" rel="noopener noreferrer" href={partner.linkedinLink} class="ml-2 text-blue-500 hover:text-gray-700 transition duration-300 inline-flex items-center justify-center p-2 text-base font-medium text-gray-800 rounded-lg bg-gray-100">
  <span>{partner.linkedinLink}</span>
</a>
<br />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Team Members */}
              <div className="px-4 py-6 mb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Team Members</h3>
                <div className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {selectedRow.teamMembers.map((member, index) => (
                    <div key={index} className="border-t border-gray-200 pt-4">
                      <p><strong>Name:</strong> {member.name}</p>
                      <p><strong>Title:</strong> {member.title}</p>
                      <p><strong>Description:</strong> {member.description}</p>
                      <p><strong>LinkedIn Link:</strong> 
                      <br />
<a target="_blank" rel="noopener noreferrer" href={member.linkedinLink} class="ml-2 text-blue-500 hover:text-gray-700 transition duration-300 inline-flex items-center justify-center p-2 text-base font-medium text-gray-800 rounded-lg bg-gray-100">
  <span>{member.linkedinLink}</span>
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