import express from 'express';
import { getTeacher, postTeacher, getPosition, createTeacherPosition } from '../controller/teacherController.js';

// Tạo router cho teacherRoute
const teacherRoute = express.Router();

// Route để lấy danh sách giáo viên với phân trang
teacherRoute.route('/getTeacher').get(getTeacher);

// Route để tạo mới thông tin giáo viên
teacherRoute.route('/postTeacher').post(postTeacher);

// Route để lấy danh sách các vị trí công tác
teacherRoute.route('/getPosition').get(getPosition);

// Route để tạo mới vị trí công tác
teacherRoute.route('/postPosition').post(createTeacherPosition);

// Export router để sử dụng trong app chính
export default teacherRoute;

