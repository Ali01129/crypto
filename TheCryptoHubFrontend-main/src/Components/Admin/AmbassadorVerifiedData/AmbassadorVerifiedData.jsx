import { useDispatch } from "react-redux";
import { deletePartner } from "../../../redux/CustomerReducer";
import Swal from "sweetalert2";
import { verifyAmbassador } from "../../../redux/CustomerReducer";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useEffect } from "react";

export default function AmbassadorsVerifiedData(props) {
  const [deleteVeh, setDeleteVeh] = useState(0);
  const [Index, setIndex] = useState();
  const [flag, setFlag] = useState();
  const dispatch = useDispatch();
  const [alertIndex, setAlertIndex] = useState();


  let filtered = props.driverData?.filter(
    (item) =>
      item.verified === true &&
      item.verifieduser === true &&
      item.category === "ambassador"
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Twitter
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              LinkedIn
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((row, index) => (
            <tr
              key={row.fullName}
              className="border-b border-gray-200 transition-colors hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.fullName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a
                  href={row.twitter}
                  className="text-blue-500 hover:underline transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link here
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a
                  href={row.linkedIn}
                  className="text-blue-500 hover:underline transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link here
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.phone}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}
