import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewTeacher = () => {
    const [teacher, setTeacher] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        identity: '',
        dob: '',
        teacherPositions: [], 
        degrees: [], 
    });

    const [positions, setPositions] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      
        const fetchPositions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/teachers/getPosition');
                setPositions(response.data.data || []);  
            } catch (err) {
                console.error("Error fetching positions:", err);
            }
        };

        fetchPositions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher({ ...teacher, [name]: value });
    };

    const handlePositionChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setTeacher({
                ...teacher,
                teacherPositions: [...teacher.teacherPositions, value]  
            });
        } else {
            setTeacher({
                ...teacher,
                teacherPositions: teacher.teacherPositions.filter(position => position !== value) 
            });
        }
    };

    const handleDegreeChange = (e, index) => {
        const { name, value } = e.target;
        const newDegrees = [...teacher.degrees];
        newDegrees[index] = { ...newDegrees[index], [name]: value };
        setTeacher({ ...teacher, degrees: newDegrees });
    };

    const handleGraduationChange = (e, index) => {
        const { checked } = e.target;
        const newDegrees = [...teacher.degrees];
        newDegrees[index].isGraduated = checked; 
        setTeacher({ ...teacher, degrees: newDegrees });
    };

    const handleAddDegree = () => {
        setTeacher({ ...teacher, degrees: [...teacher.degrees, { type: '', school: '', major: '', year: '', isGraduated: false }] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

   
        if (!teacher.name || !teacher.email || teacher.teacherPositions.length === 0) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }


        const teacherPositions = teacher.teacherPositions.map(position => position.trim());

        try {
            const response = await axios.post('http://localhost:5000/api/teachers/postTeacher', {
                ...teacher,
                teacherPositions: teacherPositions,  
            });
            setSuccess('Tạo giáo viên thành công!');
            setError('');
            setTimeout(() => navigate('/'), 2000);  
        } catch (err) {
            console.error('Error creating teacher:', err);
            setError(err.response?.data?.message || 'Không thể tạo giáo viên. Vui lòng thử lại.');
            setSuccess('');
        }
    };

    return (
        <div className="container">
            <h2>Tạo mới giáo viên</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Tên:</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={teacher.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={teacher.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Số điện thoại:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        className="form-control"
                        value={teacher.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Địa chỉ:</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={teacher.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>CMND/CCCD:</label>
                    <input
                        type="text"
                        name="identity"
                        className="form-control"
                        value={teacher.identity}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Ngày sinh:</label>
                    <input
                        type="date"
                        name="dob"
                        className="form-control"
                        value={teacher.dob}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label>Vị trí công tác:</label>
                    <div>
                        {positions.map((position) => (
                            <div key={position.code}>
                                <input
                                    type="checkbox"
                                    id={position.code}
                                    value={position._id}  
                                    onChange={handlePositionChange}
                                />
                                <label htmlFor={position.code}>{position.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label>Học vị:</label>
                    {teacher.degrees.map((degree, index) => (
                        <div key={index} className="degree-form">
                            <input
                                type="text"
                                name="type"
                                placeholder="Loại bằng cấp (Cử nhân, Thạc sĩ,...)"
                                value={degree.type}
                                onChange={(e) => handleDegreeChange(e, index)}
                                className="form-control mb-2"
                            />
                            <input
                                type="text"
                                name="school"
                                placeholder="Tên trường"
                                value={degree.school}
                                onChange={(e) => handleDegreeChange(e, index)}
                                className="form-control mb-2"
                            />
                            <input
                                type="text"
                                name="major"
                                placeholder="Chuyên ngành"
                                value={degree.major}
                                onChange={(e) => handleDegreeChange(e, index)}
                                className="form-control mb-2"
                            />
                            <input
                                type="number"
                                name="year"
                                placeholder="Năm tốt nghiệp"
                                value={degree.year}
                                onChange={(e) => handleDegreeChange(e, index)}
                                className="form-control mb-2"
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    name="isGraduated"
                                    checked={degree.isGraduated}
                                    onChange={(e) => handleGraduationChange(e, index)} 
                                />
                                Đã tốt nghiệp
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddDegree} className="btn btn-secondary">
                        Thêm học vị
                    </button>
                </div>

                <button type="submit" className="btn btn-primary">Lưu</button>
            </form>
        </div>
    );
};

export default NewTeacher;