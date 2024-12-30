import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId }, // ID của giáo viên (được tạo tự động bởi MongoDB)
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',  // Liên kết với bảng 'users', tham chiếu đến người dùng
    },
    isActive: { type: Boolean },
    isDeleted: { type: Boolean },
    code: {
        type: String,
        unique: true,  // Mã giáo viên phải duy nhất
        required: true,  // Bắt buộc phải có mã
        match: /^[0-9]{10}$/,  // Mã chỉ chứa 10 chữ số
    },
    startDate: Date,  // Ngày bắt đầu làm việc
    endDate: Date,  // Ngày kết thúc làm việc
    teacherPositions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teacherPositions' }],  // Liên kết tới bảng 'teacherPositions'
    degrees: [
        {
            type: {
                type: String,
                required: true
            },
            school: String,  // Tên trường học
            major: String,  // Chuyên ngành
            year: { type: Number },  // Năm tốt nghiệp
            isGraduated: Boolean  // Trạng thái đã tốt nghiệp hay chưa
        }
    ],
}, {
    timestamps: true  // Tự động thêm trường createdAt và updatedAt
});

const TeacherModel = mongoose.model('teacher', teacherSchema);
export default TeacherModel;
