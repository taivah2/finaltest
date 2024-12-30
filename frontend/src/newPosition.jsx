import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewTeacherPosition = () => {
    const [position, setPosition] = useState({
        name: '',
        des: '',
        isActive: true, // Trạng thái mặc định là hoạt động
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPosition({ ...position, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra tính hợp lệ của các trường bắt buộc
        if (!position.name || !position.des) {
            setError('Vui lòng điền đầy đủ thông tin tên và mô tả vị trí công tác!');
            setSuccess('');
            return;
        }

        try {

            const response = await axios.post('http://localhost:5000/api/teachers/postPosition', {
                ...position,
            });


            setSuccess('Vị trí công tác đã được tạo thành công!');
            setError('');
            setTimeout(() => navigate('/teacherPosition'), 1000); 
        } catch (err) {
    
            console.error('Error creating teacher position:', err);
            setError(err.response?.data?.message || 'Không thể tạo vị trí công tác. Vui lòng thử lại.');
            setSuccess('');
        }
    };

    return (
        <div className="container">
            <h2>Tạo mới vị trí công tác</h2>

           

            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Tên vị trí công tác:</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={position.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label>Mô tả:</label>
                    <textarea
                        name="des"
                        className="form-control"
                        value={position.des}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label>Trạng thái:</label>
                    <select
                        name="isActive"
                        className="form-control"
                        value={position.isActive}
                        onChange={handleChange}
                    >
                        <option value={true}>Hoạt động</option>
                        <option value={false}>Ngừng</option>
                    </select>
                </div>

 {error && <div className="alert alert-danger">{error}</div>}


{success && <div className="alert alert-success">{success}</div>}
   
                <button type="submit" className="btn btn-primary">
                    Lưu
                </button>

            </form>
        </div>
    );
};

export default NewTeacherPosition;