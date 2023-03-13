import asyncHandler from "../middleware/asyncHandler.js";
import Students from "../models/Students.js";
import ErrorResponse from "../utils/errorResponse.js";
import { paginate } from "../utils/function.js";
import { validateStudentCreation } from "../utils/validators.js";

// @desc        Create Student
// @route       POST /api/v1/students
// @access      PUBLIC
export const createStudentsRecord = asyncHandler(async (req, res, next) => {
  let { firstName, lastName, address, phoneNumber } = req.body;
  const { errors, valid } = validateStudentCreation(req.body);

  if (!valid) {
    return res.status(400).json({
      m: "Required Fields",
      c: 400,
      d: errors,
    });
  }

  let newStudent = await Students.create({
    firstName: firstName,
    lastName: lastName,
    address: address,
    phoneNumber: phoneNumber,
  });

  res.status(200).json({
    c: 201,
    m: "Success",
    d: newStudent,
  });
});

// @desc        Get all Students Record
// @route       GET /api/v1/students
// @access      PUBLIC
export const getStudentRecords = asyncHandler(async (req, res, next) => {
  let { searchString, startDate, endDate } = req.query;
  let filter = {};

  if (startDate && endDate) {
    filter.createdAt = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  if (searchString) {
    let options = [];

    options.push({
      firstName: { $regex: searchString, $options: "i" },
    });

    options.push({
      lastName: { $regex: searchString, $options: "i" },
    });

    options.push({
      address: { $regex: searchString, $options: "i" },
    });

    filter["$or"] = options;
  }

  let students = await Students.find(filter);

  students.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  students = paginate(students, page, limit);

  res.status(200).json({
    c: 200,
    m: "Success",
    d: {
      data: students.list,
      count: students.totalDocs,
      pagination: {
        next: students.nextPage,
        limit: students.limit,
        totalPages: students.totalPages,
      },
    },
  });
});

// @desc        Get Student Details by ID
// @route       GET /api/v1/students/:id
// @access      PUBLIC
export const getStudentRecord = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let student = await Students.findById({ _id: id });

  if (!student) {
    return next(
      new ErrorResponse(401, `No Student Record found for id: ${id}`)
    );
  }

  res.status(200).json({
    c: 200,
    m: "Success",
    d: student,
  });
});