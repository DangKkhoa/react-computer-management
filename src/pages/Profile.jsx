import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import { AuthContext } from '../context/AuthContext'
import { ImageUp, SquarePen, X, Check } from 'lucide-react'
import Input from '../components/Input'
import { useNavigate, useSearchParams } from 'react-router'

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [ searchParams ] = useSearchParams();
  const editable = searchParams.get('editable') === 'true';
  // console.log(editable)
  const navigate = useNavigate();

  const [preview, setPreview] = useState(`http://localhost:3000/uploads/${user.image}`);
  const [updatedInfo, setUpdatedInfo] = useState(user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      const imgURL = URL.createObjectURL(file);
      setPreview(imgURL);
    }
  }

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo(prev => ({...prev, [name]: value}));
  }
  return (
    <div>
      <Header title="Trang cá nhân" />
      <main className='w-full mt-6 p-6'>
        <div className='w-full flex flex-col items-center gap-y-4'>
          <div 
            className='w-48 h-48 bg-cover bg-center bg-no-repeat rounded-md'
            style={{backgroundImage: `url(${preview})`}}>
          </div>
          <label htmlFor="image" className='cursor-pointer text-sky-500 flex'>
            <ImageUp />
            <span className='text-md font-semibold'>Đổi ảnh đại diện</span>
            <input 
              type='file' 
              id='image' 
              className='hidden'
              onChange={handleImageChange}/>
          </label>
          <div className='w-3/4 grid grid-cols-2 gap-4'>
            <div className='bg-gray-100 p-4 rounded-md'>
              <Input 
                type='text'
                id='firstname'
                name='firstname'
                label='Họ'
                value={updatedInfo.firstname}
                labelClass='text-gray-400 font-semibold'
                inputClass='w-full text-gray-800 text-lg font-semibold outline-none'
                readOnly={!editable}
                onChange={handleValueChange}/>
            </div>
            <div className='bg-gray-100 p-4 rounded-md'>
              <Input 
                type='text'
                id='lastname'
                name='lastname'
                label='Tên'
                value={updatedInfo.lastname}
                labelClass='text-gray-400 font-semibold'
                inputClass='w-full text-gray-800 text-lg font-semibold outline-none'
                readOnly={!editable}
                onChange={handleValueChange}/>
            </div>
            <div className='bg-gray-100 p-4 rounded-md'>
                <Input 
                  type='email'
                  id='email'
                  name='email'
                  label='Email'
                  value={updatedInfo.email}
                  labelClass='text-gray-400 font-semibold'
                  inputClass='w-full text-gray-800 text-lg font-semibold outline-none'
                  readOnly={!editable}
                  onChange={handleValueChange}/>
              </div>
              <div className='bg-gray-100 p-4 rounded-md'>
                <Input 
                  type='text'
                  id='phonenumber'
                  name='phonenumber'
                  label='Số điện thoại'
                  value={updatedInfo.phonenumber}
                  labelClass='text-gray-400 font-semibold'
                  inputClass='w-full text-gray-800 text-lg font-semibold outline-none'
                  readOnly={!editable}
                  onChange={handleValueChange}/>
                
              </div>
              <div className='bg-gray-100 p-4 rounded-md'>
                <Input 
                  type={editable ? 'text' : 'password'}
                  id='password'
                  name='phonenumber'
                  label='Mật khẩu'
                  value=''
                  labelClass='text-gray-400 font-semibold'
                  inputClass='w-full text-gray-800 text-lg font-semibold outline-none'
                  readOnly={!editable}/>
                
              </div>
              <div className='col-span-full mt-4 flex gap-4 '>
                
                {editable ? (
                  <>
                    <button className='bg-gray-300 text-lg font-semibold px-4 py-3 rounded-md flex items-center' onClick={() => navigate('/profile', { replace: false })}><X className='mr-2'/> Hủy bỏ</button>
                    <button className='bg-green-500 text-white text-lg font-semibold px-4 py-3 rounded-md flex items-center'><Check className='mr-2'/> Xác nhận</button>
                  </>
                )
                :
                <button className='bg-amber-500 text-white text-lg font-semibold px-4 py-3 rounded-md flex items-center' onClick={() => navigate('/profile?editable=true', { replace: false })}><SquarePen className='mr-1'/> Chỉnh sửa</button>
              }
              </div>
          </div>
          
        </div>
        
        
      </main>
    </div>
  )
}

export default Profile