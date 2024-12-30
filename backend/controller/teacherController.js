import TeacherModel from '../model/teacher.js';
import teacherPositionModel from '../model/teacherPosition.js';
import UserModel from '../model/user.js';

// 1.1 Trả ra danh sách toàn bộ thông tin giáo viên với phân trang
export const getTeacher = async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.pageNumber) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;

        const totalItems = await TeacherModel.countDocuments({ isActive: true });
        const totalPages = Math.ceil(totalItems / pageSize);
        const skip = (pageNumber - 1) * pageSize;

        const teachers = await TeacherModel.find({ isActive: true })
            .populate('teacherPositions')
            .populate('userId', 'name email phoneNumber address')
            .select('code degrees isActive')
            .skip(skip)
            .limit(pageSize);

        res.send({
            success: true,
            totalItems,
            totalPages,
            currentPage: pageNumber,
            pageSize,
            items: teachers,
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({ success: false, message: e.message });
    }
};

// 1.3 Tạo thông tin giáo viên mới
const generateRandomCode = () => Math.floor(1000000000 + Math.random() * 9000000000).toString();

export const postTeacher = async (req, res) => {
    try {
        const { name, email, phoneNumber, address, identity, dob, teacherPositions, degrees } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'Email already exists', success: false });
        }

        // Tạo mã giáo viên duy nhất
        let code;
        do {
            code = generateRandomCode();
        } while (await TeacherModel.findOne({ code }));

        const newTeacher = await TeacherModel.create({
            name,
            email,
            phoneNumber,
            address,
            identity,
            dob,
            code,
            isActive: true,
            teacherPositions,
            degrees,
            startDate: new Date(),
        });

        res.status(201).send({ message: 'Teacher created successfully!', success: true, data: newTeacher });
    } catch (error) {
        res.status(500).send({ message: error.message, success: false });
    }
};

// 1.4 Trả ra danh sách toàn bộ vị trí công tác
export const getPosition = async (req, res) => {
    try {
        const positions = await teacherPositionModel.find();
        if (!positions) throw new Error('Positions not found');
        res.status(200).send({ message: 'Get positions successfully!', success: true, data: positions });
    } catch (error) {
        res.status(404).send({ message: error.message, success: false });
    }
};

// 1.5 Tạo mới vị trí công tác
const generateUniqueCode = () => Math.floor(1000000000 + Math.random() * 9000000000).toString();

export const createTeacherPosition = async (req, res) => {
    try {
        const { name, des } = req.body;

        if (!name || !des) {
            return res.status(400).json({ message: 'Name and description are required', success: false });
        }

        let code;
        do {
            code = generateUniqueCode();
        } while (await teacherPositionModel.findOne({ code }));

        const newPosition = await teacherPositionModel.create({
            code,
            name,
            des,
            isActive: true,
            isDeleted: false,
        });

        res.status(201).json({ message: 'Teacher position created successfully!', success: true, data: newPosition });
    } catch (error) {
        console.error('Error creating teacher position:', error);
        res.status(500).json({ message: error.message, success: false });
    }
};
