import React,{useState,useEffect} from "react";
import { SERVERURL } from "../../../ServerUrl";
import PartnerEditPage from './PartnerEditPage';

import Swal from "sweetalert2";
import axios from "axios";

const PodcastsTable = (props) => {
  const [filtered2, setFiltered2] = useState([]);
  const [selectedRow2, setSelectedRow2] = useState(null);
 
  const updateFilteredData = () => {
    if (props.driverData) { 
      setFiltered2(props.driverData);
    }
  };

  const deleteClicked = async (index, id, row) => {
    console.log(index, id); //mongoid, array index
    console.log(row); //that particular object
  
    Swal.fire({
      title: '',
      text: 'Are you sure to Delete ' + row.title + '?',
      icon: 'warning', // Change 'alert' to 'info' for the icon
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then(async (result) => { // Add 'async' before (result)
      if (result.isConfirmed) {
        try {
  
          const token = localStorage.getItem('token'); 
          
          const headers = {
            'Authorization': `Bearer ${token}`, // Corrected header format
          };
          const response = await axios.post(`${SERVERURL}/api/v1/deletePodcast`, { id: index },{
            headers: headers, // Include the headers object in the request configuration
          });
          console.log("kuch ni aya" + response.data);
  
          if (response.data.message === "Podcast Deleted Successfully!" || response.data.success === true) {
            // Update the state or perform any action on successful verification
            Swal.fire(
              '',
              'Deleted Successfully!',
              'success'
            );

            let zz = filtered2.filter((item) => item.title !== row.title);
            setFiltered2(zz);
          }
          else
          {
            if(response.data.success === false)
            {
              Swal.fire(
                '',
                response.data.message,
                'error'
              );
            }

          }
        } catch (error) {
          console.log("response 4", error.response)
          if (error.response.data.message) {
            console.error(error.response);
            Swal.fire({
              title: "",
              text: error.response.data.message,
              icon: 'error', // Change 'Error' to 'error' for the icon
              showCancelButton: true,
              cancelButtonColor: '#d33',
            })
          }
        }
      }
    });
  
  };



  useEffect(() => {
    updateFilteredData();
  }, [props.driverData]); 
  
  return (
    <div className="min-w-full divide-y divide-gray-200">
      <table className="specialWidthTable" >
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded At:</th>

             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered2.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 transition-colors hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.link}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><div style={{width:"170px",height:"50px"}}>
              <img src={SERVERURL+"/uploads/"+item.thumbnail}
               style={{width:"100%",height:"100%",objectFit:"contain"}} />
            </div></td>            
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.createdAt}</td>

           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex nowrap justify-center spaceee" style={{alignItems:"center",height:"100%",paddingTop:"41px"}}>
                
                <button className="text-red-500 hover:cursor-pointer inline-block py-2 px-3 rounded-lg bg-red-100 hover:bg-red-200" style={{alignSelf:"center",marginTop:"5px"}} onClick={() => deleteClicked(item._id, index, item)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default PodcastsTable;