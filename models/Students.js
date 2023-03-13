import mongoose from 'mongoose';
import moment from 'moment-timezone';

// const adressSchema = new mongoose.Schema([
//     {
//         line1: String,
//         line2: String,
//         line3: String,
//         province: String,
//         zipcode: String,
//         country: String,
//     }
// ])

const StudentsRecordSchema = new mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        // adress: [adressSchema],
        address: {
            type: String
        },
        // imgUrl: {
        //     type: String
        // },
        phoneNumber: {
            type: String
        }
    }, {timestamps: true})


export default mongoose.model("StudentsRecord", StudentsRecordSchema);