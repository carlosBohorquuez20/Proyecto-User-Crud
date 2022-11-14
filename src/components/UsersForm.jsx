import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const UsersForm = ({ getUsers, userSelect, deSelect, modalStatus, edit }) => {
  const { register, handleSubmit, reset } = useForm();

  const initialValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: ""
  }

  useEffect(() => {
    if (userSelect) {
      reset(userSelect)

    } else {
      reset(initialValues)
    }
  }, [userSelect]);

  const submit = (data) => {
    console.log(data)
    if (userSelect) {
      axios
        .put(`https://users-crud1.herokuapp.com/users/${userSelect.id}/`, data)
        .then(() => {
          getUsers();
          deSelect();
          modalStatus(false);
        })
        .catch((error) => console.log(error.response?.data))

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your information has been saved',
        showConfirmButton: false,
        background: '#DDBEA9',
        iconColor: 'green',
        timer: 1500
      })
    } else {
      axios
        .post("https://users-crud1.herokuapp.com/users/", data)
        .then(() => {
          getUsers();
          deSelect();
          modalStatus(false);
        })
        .catch((error) => console.log(error.response?.data))

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your information has been saved',
        showConfirmButton: false,
        timer: 1500
      })

    }
  }
  var container_inputs_styles = "flex flex-col font-medium text-xs";
  var inputs_styles = "p-2 border border-gray-300 rounded mt-1 font-normal"
  return (
    <div className='w-full h-auto p-4 bg-white rounded'>
      <form action="" onSubmit={handleSubmit(submit)}>
        <div className='w-full flex justify-between py-3 text-m mb-2'>
          <h3 className='font-bold'>Insert {edit} User</h3>
          <button onClick={() => {
            modalStatus(false)
          }}><i className="fa-solid fa-xmark close-modal"></i></button>
        </div>
        <div className='flex flex-col gap-y-3.5'>
          <div className={container_inputs_styles}>
            <label htmlFor="first_name">First Name</label>
            <input {...register("first_name")} className={inputs_styles} type="text" id='first_name' placeholder='First Name' required />
          </div>
          <div className={container_inputs_styles}>
            <label htmlFor="last_name">Last Name</label>
            <input {...register("last_name")} className={inputs_styles} type="text" id='last_name' placeholder='Last Name' required />
          </div>
          <div className={container_inputs_styles}>
            <label htmlFor="email">Correo</label>
            <input {...register("email")} className={inputs_styles} type="email" id='email' placeholder='Email' required />
          </div>
          <div className={container_inputs_styles}>
            <label htmlFor="passwordl">Password</label>
            <input {...register("password")} className={inputs_styles} type="password" id='password' placeholder='Password' required />
          </div>
          <div className={container_inputs_styles}>
            <label htmlFor="birthday">Birthday</label>
            <input {...register("birthday")} className={inputs_styles} type="date" id='birthday' required />
          </div>
          <button className='submit w-full bg-indigo-900 p-3 rounded font-medium text-white text-xs transition hover:bg-indigo-700'>Submit</button>
        </div>
      </form>
    </div>
  );
};
export default UsersForm;