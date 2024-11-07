import React from "react";
import { Link } from "react-router-dom";
import useDelete from "../hooks/useDelete";
import Swal from "sweetalert2";

const ActivityList = ({ activities, refetch, urlAPI }) => {
  const { deleteData, loading: deleteLoading } = useDelete(urlAPI);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await deleteData(id);
        
        Swal.fire(
          'Deleted!',
          'Your activity has been deleted.',
          'success'
        );
        
        refetch();
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete activity!',
      });
    }
  };

  return (
    <ul className="list-group">
      {activities.map((activity) => (
        <li 
          className="list-group-item d-flex justify-content-between align-items-center" 
          key={activity.id}
        >
          <span>{activity.title}</span>
          <div>
            <Link 
              to={`/activity/${activity.id}`} 
              className="btn btn-primary btn-sm mx-1"
            >
              Details
            </Link>
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(activity.id)}
              disabled={deleteLoading}
            >
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ActivityList;