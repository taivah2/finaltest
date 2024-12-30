import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.css';
import './user.css';
import Pagination from './Pagination';

const API_BASE_URL = 'http://localhost:5000/api/teachers'; 

const UserList = () => {
    const [teachers, setTeachers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTeachers = async (pageNumber = 1, pageSize = 5) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getTeacher`, {
                params: { pageNumber, pageSize },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching teachers:', error);
            throw error;
        }
    };

    useEffect(() => {
        const getTeachers = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchTeachers(currentPage);
                console.log(data.items);  // Kiểm tra cấu trúc dữ liệu của các giáo viên
                setTeachers(data.items || []);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                setError('Không thể tải dữ liệu giáo viên. Vui lòng thử lại.');
                setTeachers([]);
            }
            setLoading(false);
        };
        getTeachers();
    }, [currentPage]);
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container">
            <h2 className="name">Danh sách giáo viên</h2>
            <div className="add-teacher mb-3">
                <Link to="/teachers/create" className="btn btn-primary">
                    Tạo mới
                </Link>
            </div>
            {loading && <div>Đang tải dữ liệu...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && teachers.length === 0 && (
                <div>Không có dữ liệu giáo viên.</div>
            )}
            {!loading && teachers.length > 0 && (
                <table className="table table-bordered">
                    <thead className="th-list">
                        <tr>
                            <th>Mã</th>
                            <th>Giáo viên</th>
                            <th>Địa chỉ</th>
                            <th>TT công tác</th>
                            <th>Trình độ</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher.code}>
                                <td>{teacher.code}</td>
                                <td>
    <div>Tên: {teacher.userId?.name || 'Không có tên'}</div>
    <div>Email: {teacher.userId?.email || 'Không có email'}</div>
    <div>SĐT: {teacher.userId?.phoneNumber || 'Không có số điện thoại'}</div>
  
</td>
<td>Địa chỉ: {teacher.userId?.address || 'Không có địa chỉ'}</td>
                                <td>
                                    {teacher.teacherPositions && teacher.teacherPositions.length > 0
                                        ? teacher.teacherPositions.join(', ')
                                        : 'Không có vị trí công tác'}
                                </td>
                                <td>
                                    {teacher.degrees && teacher.degrees.length > 0 ? (
                                        teacher.degrees.map((degree, index) => (
                                            <div key={index}>
                                                {degree.type} - {degree.school} ({degree.major}, {degree.year})
                                            </div>
                                        ))
                                    ) : (
                                        <span>Không có thông tin học vấn</span>
                                    )}
                                </td>
                                <td>{teacher.isActive ? 'Đang công tác' : 'Không hoạt động'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!loading && !error && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default UserList;