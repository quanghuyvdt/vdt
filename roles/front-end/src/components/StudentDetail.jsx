import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from '../config/constants'
const StudentDetail = () => {
    const { _id } = useParams();
    const navigate = useNavigate()
    const [student, setStudent] = useState({
        _id: '',
        name: '',
        gender: '',
        yob: '',
        university: '',
        major: ''
    });
    useEffect(() => {
        if (_id) {
            fetch(`${URL}/detail/${_id}`)
                .then(response => response.json())
                .then(data => setStudent(data))
                .catch((err) => console.log(err))
        }
    }, [_id])
    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudent(prevStudent => ({ ...prevStudent, [name]: value }))
    }
    const handleUpdate = (event) => {
        event.preventDefault();
        console.log(_id)
        const endpoint = _id === undefined ? `${URL}/add` : `${URL}/update/${_id}`
        console.log(endpoint)
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
            .then(response => {
                if (!response.ok) {
                    toast.error('Lỗi mạng!', {
                        autoClose: 1000
                    })
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                const message = _id ? 'Cập nhật thành công!' : 'Thêm thành công!' 
                
                toast.success(message, {
                    autoClose: 1000
                })
                navigate('/')
            })
            .catch(error => {
                const message = _id ? 'Không thể cập nhật!' : 'Không thể thêm!'

                toast.error(message, {
                    autoClose: 1000
                })
                console.error('There was a problem with your fetch operation:', error);
            });
    }
    return (
        <div className='min-w-96 bg-white rounded-lg p-6'>
            <div className='pb-3'>
                <div>_ID</div>
                <input type="text" value={student._id} disabled name="_id" className='w-full border-[1px] border-[#aaa] outline-none focus:border-[rgb(11,116,229)] rounded px-2 py-1' />
            </div>
            <div className='pb-3'>
                <div>Họ tên:</div>
                <input type="text" value={student.name} name="name" onChange={handleChange} className='w-full border-[1px] border-[#aaa] outline-none focus:border-[rgb(11,116,229)] rounded px-2 py-1' />
            </div>
            <div className='pb-3'>
                <div>Năm sinh:</div>
                <input type="number" value={student.yob} name="yob" onChange={handleChange} className='w-full border-[1px] border-[#aaa] outline-none focus:border-[rgb(11,116,229)] rounded px-2 py-1' />
            </div>
            <div className='pb-3'>
                <div>Giới tính:</div>
                <div className='flex gap-x-12'>
                    <div className='flex items-center gap-x-3'>
                        <input type="radio" name="gender" id="male" value="Nam" checked={student.gender === 'Nam'} onChange={handleChange} />
                        <label htmlFor="male">Nam</label>
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <input type="radio" name="gender" id="female" value="Nữ" checked={student.gender === 'Nữ'} onChange={handleChange} />
                        <label htmlFor="female">Nữ</label>
                    </div>
                </div>


            </div>
            <div className='pb-3'>
                <div>Đại học:</div>
                <input type="text" value={student.university} name="university" onChange={handleChange} className='w-full border-[1px] border-[#aaa] outline-none focus:border-[rgb(11,116,229)] rounded px-2 py-1' />
            </div>
            <div className='pb-3'>
                <div>Quốc gia:</div>
                <input type="text" value={student.country} name="country" onChange={handleChange} className='w-full border-[1px] border-[#aaa] outline-none focus:border-[rgb(11,116,229)] rounded px-2 py-1' />
            </div>
            <input type="submit" value="Lưu" onClick={handleUpdate} className='float-right px-3 py-1 cursor-pointer rounded bg-[rgb(11,116,229)] text-white' />
        </div>
    );
};

export default StudentDetail;