import Header from '../layout/Header';
import StudentList from '../components/StudentList';

const StudentListPage = () => {

    return (
        <div>
            <Header />
            <div className='mt-20'>
                <StudentList />
            </div>
        </div>
    );
};

export default StudentListPage;