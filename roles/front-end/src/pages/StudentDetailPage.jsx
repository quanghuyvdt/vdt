import React from 'react';
import Header from '../layout/Header';
import StudentDetail from '../components/StudentDetail';

const StudentDetailPage = () => {
    return (
        <div>
            <Header />
            <div className='h-[100vh] flex items-center justify-center'>
                <StudentDetail />
            </div>
        </div>
    );
};

export default StudentDetailPage;