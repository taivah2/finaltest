import mongoose from 'mongoose';

const teacherPositionSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },  // ID tự động
    name: String,  // Tên vị trí công tác
    code: String,  // Mã vị trí công tác
    des: String,  // Mô tả vị trí công tác
    isActive: { type: Boolean },  // Trạng thái hoạt động của vị trí
    isDeleted: { type: Boolean },  // Trạng thái xóa của vị trí
}, {
    timestamps: true,  // Thêm createdAt và updatedAt
    collection: 'teacherPositions'  // Đặt tên collection là 'teacherPositions'
});

const TeacherPositionModel = mongoose.model('teacherPositions', teacherPositionSchema);
export default TeacherPositionModel;
