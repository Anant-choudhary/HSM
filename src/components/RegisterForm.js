import { DevTool } from '@hookform/devtools';
import React from 'react';
import { useForm } from 'react-hook-form';

const RegisterForm = () => {
    const form =useForm()
    const {register,control,handleSubmit} =form;

    function submitHandler(data)
    {
        console.log("form submitted " , data)
    }
  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
      <div className="text-center mb-16">
        
        <h4 className="text-gray-800 text-base font-semibold mt-6">Sign up into your account</h4>
      </div>

      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">First Name</label>
            <input
              name="name"
              id='name'
              type="text"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter name"
              required
              {...register('name')}
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
            <input
              name="lname"
              id='lname'
              type="text"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter last name"
              required
              {...register('lname')}
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
            <input
              name="email"
              id='email'
              type="email"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter email"
              required
              {...register('email')}

            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Mobile No.</label>
            <input
              name="number"
              type="text"
              id='number'
              pattern="[0-9]*"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter mobile number"
              onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
              style={{ appearance: 'textfield', '-moz-appearance': 'textfield', '-webkit-appearance': 'none' }}
              required
              {...register('number')}
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Student id</label>
            <input
              name="sid"
              type="text"
                id='sid'
                {...register('sid')}
              pattern="[0-9]*"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter student id"
              onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
              style={{ appearance: 'textfield', '-moz-appearance': 'textfield', '-webkit-appearance': 'none' }}
              required
            />
          </div>
          
         
        </div>

        <div className="!mt-12">
          <button
            type="submit"
            className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Register
          </button>
        </div>
      </form>
      <DevTool control={control}/>
    </div>
  );
};

export default RegisterForm;
