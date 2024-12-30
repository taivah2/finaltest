import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const TeacherPositionList = () => {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/teachers/getPosition');
                setPositions(response.data.data); 
            } catch (error) {
                setError('Không thể tải danh sách vị trí công tác');
            } finally {
                setLoading(false);
            }
        };

        fetchPositions();
    }, []); 

    if (loading) return <div>Loading ...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container">
            <h3>Danh sách vị trí công tác</h3>
            <div className="add-teacher mb-3">
                <Link to="/position/create" className="btn btn-primary">
                    Tạo mới
                </Link>
            </div>
            {positions.length === 0 && (
                <div>Không có dữ liệu.</div>
            )}
            {positions.length > 0 && (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã</th>
                            <th>Tên</th>
                            <th>Trạng thái</th>
                            <th>Mô tả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((position, index) => (
                            <tr key={position.code}>
                                <td>{index + 1}</td>
                                <td>{position.code || 'Không có mã'}</td>
                                <td>{position.name || 'Không có tên'}</td>
                                <td>{position.isActive ? 'Đang công tác' : 'Không hoạt động'}</td>
                                <td>{position.des || 'Không có mô tả'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TeacherPositionList;