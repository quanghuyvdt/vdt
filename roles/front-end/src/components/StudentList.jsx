import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { URL } from '../config/constants';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentList = () => {
    const [students, setStudents] = useState([])
    const fetchStudent = () => {
        fetch(URL)
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchStudent();
    }, [])

    const handleDelete = (_id) => {
        console.log(_id)
        if (window.confirm('Bạn có chắc muốn xóa thành viên này?')) {
            fetch(`${URL}/delete/${_id}`, {
                method: 'POST'
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
                    fetchStudent()
                    toast.success('Xóa thành công!', {
                        autoClose: 1000
                    })

                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                    toast.error('Không thể xóa!', {
                        autoClose: 1000
                    })
                });
        }
    }
    return (
        <div className='flex items-center justify-center'>
            <div class="rounded-lg bg-white p-4">
                <div className='flex justify-between px-3'>
                    <div>VDT 2024</div>
                    <Link to="/add" className='rounded px-2 py-1 bg-[rgb(14,211,207)] font-medium text-white hover:bg-[rgba(14,211,207,0.7)]'>Thêm mới</Link>
                </div>
                <table className='relative min-w-full divide-y divide-gray-200 dark:divide-neutral-700 '>
                    <thead className=''>
                        <tr>
                            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">STT</th>
                            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">Họ và tên</th>
                            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">Năm sinh</th>
                            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">Giới tính</th>
                            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">Trường</th>
                            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">Quốc gia</th>
                            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student, id) => (
                                <tr className='odd:bg-white even:bg-gray-100 hover:bg-gray-200'>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>{id}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>{student.name}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>{student.yob}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>{student.gender}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>{student.university}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>{student.country}</td>
                                    <td className='px-6 py-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400'>
                                        <Link to={`/detail/${student._id}`} className='rounded'>Sửa</Link>
                                        <button onClick={() => handleDelete(student._id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default StudentList;