import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },  // ID tự động
  name: String,  // Tên người dùng
  email: { type: String, unique: true, required: true },  // Email duy nhất và bắt buộc
  phoneNumber: String,  // Số điện thoại
  address: String,  // Địa chỉ
  identity: String,  // CMND/CCCD hoặc mã định danh
  dob: Date,  // Ngày sinh
  isDeleted: { type: Boolean },  // Trạng thái xóa
  role: {
    type: String,
    enum: ['STUDENT', 'TEACHER', 'ADMIN'],  // Các quyền (Student, Teacher, Admin)
    required: true  // Bắt buộc phải có quyền
  }
}, {
  timestamps: true  // Tự động thêm createdAt và updatedAt
});

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
