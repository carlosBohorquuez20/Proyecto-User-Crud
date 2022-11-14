import React from 'react';
import { set } from 'react-hook-form';

const UsersList = ({ usersList, selectUser, deleteProduct, modalStatus, setEdit }) => {
  return (
    <div className='flex bg-white w-full p-3 rounded text-xs'>
      <ul>
        {usersList.map(user => (
          <li key={user.id}>
            <div className='flex gap-x-2'>
              <p className='font-medium'>Name:</p>
              <h2>{user.first_name} {user.last_name}</h2>
            </div>
            <div className='flex gap-x-2'>
              <p className='font-medium'>Email:</p>
              <p>{user.email}</p>
            </div>
            <div className='flex gap-x-2'>
              <p className='font-medium'>Birthday Date:</p>
              <p>{user.birthday}</p>
            </div>
            <div className='mt-2 flex gap-x-3'>
              <button className='p-2 bg-red-600 text-white rounded w-8 h-8 hover:scale-110 transition' onClick={() => deleteProduct(user.id)}><i className="fa-solid fa-trash"></i></button>
              <button className='p-2 bg-blue-600 text-white rounded w-8 h-8 hover:scale-110 transition' onClick={() => {selectUser(user); modalStatus(true); setEdit("Edit")}}>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;