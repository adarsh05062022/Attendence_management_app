import Attendance from "../../models/Attendance.js";
import Class from "../../models/Class.js";

const GET_ATTENDANCE_OF_PARTICULAR_CLASS = async (req, res) => {
  try {
    const { classId } = req.params;

    // Find attendance records for the specified class ID
    const attendanceRecords = await Attendance.find({ classId });

    // Respond with the attendance records
    res.json({ success: true, data: attendanceRecords[0] });
  } catch (error) {
    console.error("Error getting attendance records by class:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const GET_ATTENDANCE_OF_PARTICULAR_DATE = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    // Parse the date string to obtain a Date object
    const date = new Date(req.params.date);

    // Set the start date to the beginning of the given date
    const startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    // Set the end date to the end of the given date
    const endDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    // Find classes on the given date
    const classes = await Class.find({
      teacherId: teacherId,
      classDate: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    console.log(classes);

    // If no classes found for the given date, return an empty array
    if (!classes || classes.length === 0) {
      return res
        .status(404)
        .json({ message: "No classes found for the given date" });
    }

    // Extract classIds from the classes found
    const classIds = classes.map((cls) => cls._id);

    // Find attendance records for the classIds found
    const attendanceRecords = await Attendance.find({
      classId: { $in: classIds },
    }).populate("classId")

    res.json(attendanceRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// by student

const GET_ATTENDANCE_RECORDS_BY_STUDENT_OF_ALL_CLASSES = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find attendance records for the specified student ID
    const attendanceRecords = await Attendance.find({
      "attendanceRecords.studentId": studentId,
    });

    // Respond with the attendance records
    res.json({ success: true, data: attendanceRecords });
  } catch (error) {
    console.error(
      "Error getting attendance records by student across all classes:",
      error
    );
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const GET_ATTENDANCE_RECORDS_BY_STUDENT_OF_PARTICULAR_DATE = async (
  req,
  res
) => {
  try {
    const { studentId, date } = req.params;

    // Parse the date string into a JavaScript Date object
    const [day, month, year] = date.split("-");
    const parsedDate = new Date(`${year}-${month}-${day}`);

    // Find attendance records for the specified student ID and date
    const attendanceRecords = await Attendance.find({
      "attendanceRecords.studentId": studentId,
      date: parsedDate,
    });

    // Respond with the attendance records
    res.json({ success: true, data: attendanceRecords });
  } catch (error) {
    console.error(
      "Error getting attendance records by student and date:",
      error
    );
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export {
  GET_ATTENDANCE_OF_PARTICULAR_CLASS,
  GET_ATTENDANCE_RECORDS_BY_STUDENT_OF_ALL_CLASSES,
  GET_ATTENDANCE_RECORDS_BY_STUDENT_OF_PARTICULAR_DATE,
  GET_ATTENDANCE_OF_PARTICULAR_DATE,
};
