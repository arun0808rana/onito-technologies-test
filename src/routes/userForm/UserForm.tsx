import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './UserForm.css';
import CommandImage from '../../assets/command.svg';

const schema = yup.object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function UserForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: FormData) => console.log(data);

    return (
        <div className="user_form_container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="personal_details">
                    <h3 className="personal_details__title">Personal Details</h3>

                    <div className="personal_details__controls controls_container">
                        <div className="personal_details__controls control">
                            <label htmlFor="nameID">Name*</label>
                            <input type="text" name="name" id="nameID" placeholder="Enter name" />
                        </div>

                        <div className="personal_details__controls control">
                            <label htmlFor="DOBageID">Date of Birth or Age</label>
                            <input type="text" name="dobAge" id="DOBageID" placeholder="DD/MM/YYYY or Age in Years" />
                        </div>

                        <div className="personal_details__controls control">
                            <label htmlFor="sexID">Sex*</label>
                            <select name="sex" id="sexID">
                                <option hidden value="" className="hidden_option">Enter Sex</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="personal_details__controls control">
                            <label htmlFor="mobileID">Mobile</label>
                            <input type="number" name="mobile" id="mobileID" placeholder="Enter Mobile" />
                        </div>

                        <div className="personal_details__controls control">
                            <label htmlFor="govTypeID">Govt Issued ID</label>
                            <select name="govIDtype" id="govTypeID">
                                <option hidden value="" className="hidden_option">ID Type</option>
                                <option value="aadhar">Aadhar</option>
                                <option value="pan">PAN</option>
                            </select>
                            <input type="number" name="govId" id="govID" placeholder="Enter Govt ID" />
                        </div>
                    </div>

                </div>

                <div className="contact_details">
                    <h3>Contact Details</h3>
                    <div className="contact_details__controls controls_container">
                        <div className="contact_details__controls control">
                            <label htmlFor="guardianID">Guardian Details</label>
                            <select name="guardianSelector" id="guardianID">
                                <option hidden value="" className="hidden_option">Enter Label</option>
                            </select>
                            <input type="text" name="guardian" id="guardianNameID" placeholder="Enter Guardian Name" />
                        </div>

                        <div className="contact_details__controls control">
                            <label htmlFor="emailID">Email</label>
                            <input type="email" name="email" id="emailID" placeholder="Enter Email" />
                        </div>

                        <div className="contact_details__controls control">
                            <label htmlFor="emergencyContactNoID">Emergency Contact Number</label>
                            <input type="email" name="email" id="emergencyContactNoID" placeholder="Enter Emergency Contact No" />
                        </div>
                    </div>
                </div>

                <div className="address_details">
                    <h3>Address Details</h3>

                    <div className="address_details__controls controls_container">
                        <div className="address_details__controls control">
                            <label htmlFor="addressID">Address</label>
                            <input type="text" name="address" id="addressID" placeholder="Enter Address" />
                        </div>

                        <div className="address_details__controls control">
                            <label htmlFor="stateID">State</label>
                            <select name="stateSelect" id="stateID">
                                <option hidden value="" className="hidden_option">Enter State</option>
                            </select>
                        </div>

                        <div className="address_details__controls control">
                            <label htmlFor="cityID">City</label>
                            <select name="citySelect" id="cityID">
                                <option hidden value="" className="hidden_option">Enter city/town/village</option>
                            </select>
                        </div>

                        <div className="address_details__controls control">
                            <label htmlFor="countryID">Country</label>
                            <select name="citySelect" id="countryID">
                                <option hidden value="" className="hidden_option">Enter Country</option>
                                <option value="India">India</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Australia">Australia</option>
                            </select>
                        </div>

                        <div className="address_details__controls control">
                            <label htmlFor="pincodeID">Pincode</label>
                            <input type="number" name="pincode" id="pincodeID" placeholder="Enter Pincode" />
                        </div>
                    </div>
                </div>

                <div className="other_details">
                    <h3>Other Details</h3>

                    <div className="other_details__controls controls_container">
                        <div className="other_details__controls control">
                            <label htmlFor="occupationID">Occupation</label>
                            <input type="text" name="occupation" id="occupationID" placeholder="Enter Occupation" />
                        </div>

                        <div className="other_details__controls control">
                            <label htmlFor="religionID">Religion</label>
                            <select name="religionSelect" id="religionID">
                                <option hidden value="" className="hidden_option">Enter Religion</option>
                            </select>
                        </div>

                        <div className="other_details__controls control">
                            <label htmlFor="maritalStatusID">Marital Status</label>
                            <select name="maritalStatusSelect" id="maritalStatusID">
                                <option hidden value="" className="hidden_option">Enter Marital Status</option>
                                <option value="married">Married</option>
                                <option value="unmarried">Unmarried</option>
                            </select>
                        </div>

                        <div className="other_details__controls control">
                            <label htmlFor="bloodGroupID">Blood Group</label>
                            <select name="bloodGroupSelect" id="bloodGroupID">
                                <option hidden value="" className="hidden_option">Group</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="O">O</option>
                            </select>
                        </div>

                        <div className="other_details__controls control">
                            <label htmlFor="nationalityID">Nationality</label>
                            <select name="nationalitySelect" id="nationalityID">
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
