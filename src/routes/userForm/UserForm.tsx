import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './UserForm.css';
import CommandImage from '../../assets/command.svg';

/**
 * types for when a number field could be empty i.e "" or a number
 * this is required bcoz yup does't allow form submission if these number fields are empty
 * even though they are not marked empty 
 */
const stringOrNumber = yup.lazy((value) => value === '' ? yup.string() : yup.number().positive());
const stringOrPhoneNumber = yup.lazy((value) => value === '' ? yup.string() : yup.string()
    .matches(/^[6-9]\d{9}$/, "Please enter a valid mobile number"));

const schema = yup.object({
    name: yup.string().required(),
    DOBorAge: yup.string().required().test(
        "DOBorAge",
        "Please enter a valid age or date of birth in the format DD/MM/YYYY",
        function (value) {
            let isValid = false;

            const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
            // check if input value matches the expected pattern for DD/MM/YYYY
            if (pattern.test(value)) {
                // check if input value is a valid date
                const [dd, mm, yyyy] = value.split("/");
                const date = new Date(`${yyyy}-${mm}-${dd}`);
                if (!isNaN(date.getTime())) {
                    isValid = true;
                }
            } else {
                // check if age is valid
                const age = parseInt(value);
                if (!isNaN(age)) {
                    if (age > 1 && age < 100) {
                        isValid = true;
                    }
                }
            }
            return isValid;
        }
    ),
    sex: yup.string().required(),
    mobile: stringOrPhoneNumber,
    govIDtype: yup.string(),
    govID: stringOrNumber, // TODO: implement is:then:otherwise:
    guardianLabel: yup.string(),
    guardianName: yup.string(),
    email: yup.string().email(),
    emergencyNumber: stringOrPhoneNumber,
    address: yup.string(),
    state: yup.string(),
    city: yup.string(),
    country: yup.string(),
    pincode: stringOrNumber,
    occupation: yup.string(),
    religion: yup.string(),
    maritalStatus: yup.string(),
    bloodGroup: yup.string(),
    nationality: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

export default function UserForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: FormData) => console.log('form_dato', data);

    return (
        <div className="user_form_container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="personal_details">
                    <h3 className="personal_details__title">Personal Details</h3>

                    <div className="personal_details__controls controls_container">
                        <div className="personal_details__controls control">
                            <label htmlFor="nameID">Name*</label>
                            <div>
                                <input {...register("name")} type="text" id="nameID" placeholder="Enter name" />
                                <span className="error_msg">{errors.name?.message}</span>
                            </div>
                        </div>

                        <div className="personal_details__controls control">
                            <label htmlFor="DOBageID">Date of Birth or Age</label>
                            <div>
                                <input {...register("DOBorAge")} type="text" id="DOBageID" placeholder="DD/MM/YYYY or Age in Years" />
                                <span className="error_msg">{errors.DOBorAge?.message}</span>
                            </div>
                        </div>

                        <div className="personal_details__controls control">
                            <label htmlFor="sexID">Sex*</label>
                            <div>
                                <select {...register("sex")} id="sexID">
                                    <option hidden value="" className="hidden_option">Enter Sex</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <span className="error_msg">{errors.sex?.message}</span>
                            </div>
                        </div>

                        <div className="personal_details__controls control">
                            <label htmlFor="mobileID">Mobile</label>
                            <div>
                                <input {...register("mobile")} type="number" id="mobileID" placeholder="Enter Mobile" />
                                <span className="error_msg">{errors.mobile?.message}</span>
                            </div>
                        </div>

                        <div className="personal_details__controls control">
                            <label htmlFor="govTypeID">Govt Issued ID</label>
                            <select {...register("govIDtype")} id="govTypeID">
                                <option hidden value="" className="hidden_option">ID Type</option>
                                <option value="aadhar">Aadhar</option>
                                <option value="pan">PAN</option>
                            </select>
                            <input {...register("govID")} type="number" id="govID" placeholder="Enter Govt ID" />
                        </div>
                    </div>

                </div>

                <div className="contact_details">
                    <h3>Contact Details</h3>
                    <div className="contact_details__controls controls_container">
                        <div className="contact_details__controls control">
                            <label htmlFor="guardianID">Guardian Details</label>
                            <select {...register("guardianLabel")} id="guardianID">
                                <option hidden value="" className="hidden_option">Enter Label</option>
                            </select>
                            <input {...register("guardianName")} type="text" id="guardianNameID" placeholder="Enter Guardian Name" />
                        </div>

                        <div className="contact_details__controls control">
                            <label htmlFor="emailID">Email</label>
                            <input {...register("email")} type="email" id="emailID" placeholder="Enter Email" />
                        </div>

                        <div className="contact_details__controls control">
                            <label htmlFor="emergencyContactNoID">Emergency Contact Number</label>
                            <div>
                                <input {...register("emergencyNumber")} type="number" id="emergencyContactNoID" placeholder="Enter Emergency Contact No" />
                                <span className="error_msg">{errors.emergencyNumber?.message}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="address_details">
                    <h3>Address Details</h3>

                    <div className="address_details__controls controls_container">
                        <div className="address_details__controls control">
                            <label htmlFor="addressID">Address</label>
                            <input {...register("address")} type="text" id="addressID" placeholder="Enter Address" />
                        </div>

                        <div className="address_details__controls control">
                            <label htmlFor="stateID">State</label>
                            <select {...register("state")} id="stateID">
                                <option hidden value="" className="hidden_option">Enter State</option>
                            </select>
                        </div>

                        <div className="address_details__controls control">
                            <label htmlFor="cityID">City</label>
                            <select {...register("city")} id="cityID">
                                <option hidden value="" className="hidden_option">Enter city/town/village</option>
                            </select>
                        </div>

                        <div className="address_details__controls control">
                            <label htmlFor="countryID">Country</label>
                            <select {...register("country")} id="countryID">
                                <option hidden value="" className="hidden_option">Enter Country</option>
                                <option value="India">India</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Australia">Australia</option>
                            </select>
                        </div>

                        <div className="address_details__controls control">
                            <label htmlFor="pincodeID">Pincode</label>
                            <input {...register("pincode")} type="number" id="pincodeID" placeholder="Enter Pincode" />
                        </div>
                    </div>
                </div>

                <div className="other_details">
                    <h3>Other Details</h3>

                    <div className="other_details__controls controls_container">
                        <div className="other_details__controls control">
                            <label htmlFor="occupationID">Occupation</label>
                            <input {...register("occupation")} type="text" id="occupationID" placeholder="Enter Occupation" />
                        </div>

                        <div className="other_details__controls control">
                            <label htmlFor="religionID">Religion</label>
                            <select {...register("religion")} id="religionID">
                                <option hidden value="" className="hidden_option">Enter Religion</option>
                            </select>
                        </div>

                        <div className="other_details__controls control">
                            <label htmlFor="maritalStatusID">Marital Status</label>
                            <select {...register("maritalStatus")} id="maritalStatusID">
                                <option hidden value="" className="hidden_option">Enter Marital Status</option>
                                <option value="married">Married</option>
                                <option value="unmarried">Unmarried</option>
                            </select>
                        </div>

                        <div className="other_details__controls control">
                            <label htmlFor="bloodGroupID">Blood Group</label>
                            <select {...register("bloodGroup")} id="bloodGroupID">
                                <option hidden value="" className="hidden_option">Group</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="O">O</option>
                            </select>
                        </div>

                        <div className="other_details__controls control">
                            <label htmlFor="nationalityID">Nationality</label>
                            <select {...register("nationality")} id="nationalityID">
                                <option hidden value="" className="hidden_option">Enter Nationality</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="London">London</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* <input {...register("firstName")} />
            <p>{errors.firstName?.message}</p>

            <input {...register("age")} />
            <p>{errors.age?.message}</p> */}

                <div className="form-controls">
                    <button className="cancel_btn">
                        <span>CANCEL</span>
                        <br />
                        <span className="underline">(Esc)</span>
                    </button>
                    <button className="submit_btn" type="submit">
                        <span>SUBMIT</span>
                        <br />
                        <span className="submit_btn__icon_container underline">
                            <img className="submit_btn__icon" src={CommandImage} />
                            S
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
}
