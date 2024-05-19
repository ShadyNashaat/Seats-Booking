import React, { useContext, useState } from 'react';
import DuckImage from '../../imgs/Duck.png';
import { Link, useNavigate } from 'react-router-dom';
import { MdInsertPhoto } from "react-icons/md";
import { BsBuildings } from "react-icons/bs";
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { SuperContext } from '../../Context/SuperContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner'

function NewOrg() {
    let navigate = useNavigate();
    let { setSuperToken, setsuperName } = useContext(SuperContext);
    let [isLoading, SetisLoading] = useState(false);
    let superName = localStorage.getItem('supername');
    let [added, setadded] = useState(null);
    let [error, seterror] = useState(null);
    function logout() {
        localStorage.removeItem('superAdminToken');
        localStorage.removeItem('supername');
        setsuperName(null);
        setSuperToken(null);
        navigate('/');
    }

    let validationSchema = Yup.object({
        OrganizationName: Yup.string().required('Organization name is required'),
        OrgStatus: Yup.boolean(),
        LicenceID: Yup.number().required('License ID is required'),
        OrganizationType: Yup.string().required('Organization type is required'),
        BankAccount: Yup.number().required('Bank account number is required'),
        OrganizationFinancialID: Yup.number().required('Financial ID is required'),
        FinancialLimitFrom: Yup.string().required('Financial limit start is required'),
        FinancialLimitTo: Yup.string().required('Financial limit end is required'),
        OrganizationImage: Yup.mixed().required('Organization image is required'),
        OrganizationAttachments: Yup.array().required('Organization attachments are required'),
    });

    async function newOrgSubmit(values) {
        SetisLoading(true);
        try {
            const formData = new FormData();
            formData.append('OrganizationName', values.OrganizationName);
            formData.append('OrgStatus', values.OrgStatus);
            formData.append('LicenceID', values.LicenceID);
            formData.append('OrganizationType', values.OrganizationType);
            formData.append('BankAccount', values.BankAccount);
            formData.append('OrganizationFinancialID', values.OrganizationFinancialID);
            formData.append('FinancialLimitFrom', values.FinancialLimitFrom);
            formData.append('FinancialLimitTo', values.FinancialLimitTo);
            formData.append('files', values.OrganizationImage);

            values.OrganizationAttachments.forEach((file) => {
                formData.append('files', file);
            });

            const response = await axios.post('https://seated-booking.onrender.com/org/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.message === 'success') {
                setadded("Organization added successfully");
                SetisLoading(false);
            }
        } catch (error) {
            seterror("Error, Can't add this organization.");
            SetisLoading(false);
        }
    }

    let formik = useFormik({
        initialValues: {
            LicenceID: '',
            OrgStatus: false,
            OrganizationType: '',
            OrganizationName: '',
            OrganizationFinancialID: '',
            FinancialLimitFrom: '',
            FinancialLimitTo: '',
            BankAccount: '',
            OrganizationImage: null,
            OrganizationAttachments: [],
        },
        validationSchema: validationSchema,
        onSubmit: newOrgSubmit
    });

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        formik.setFieldValue('OrganizationAttachments', [...formik.values.OrganizationAttachments, ...files]);
    };

    const handleImageChange = (event) => {
        formik.setFieldValue('OrganizationImage', event.currentTarget.files[0]);
    };

    return (
        <div className='homeBg container-fluid'>
            <div className='row pb-3'>
                <div className='col-md-2 ms-4 mt-5 position-relative'>
                    <div>
                        <div className="d-flex align-items-center ms-2">
                            <h4 className='text-white p me-2'>P</h4>
                            <h5 className='text-black'>Travel</h5>
                            <h5 className='text-white'>Pro</h5>
                        </div>
                        <div className='d-flex mt-5'>
                            <div>
                                <img src={DuckImage} alt="Duck" />
                            </div>
                            <div className='align-self-center'>
                                <h4>Duck UI</h4>
                                <h6>{superName}</h6>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <div>
                                <CiHome />
                                <Link to="/home" className='text-decoration-none text-dark ms-2'>Home</Link>
                            </div>
                            <div className='mt-3'>
                                <BsBuildings />
                                <Link to="/organizations" className='text-decoration-none text-dark ms-2'>Organization</Link>
                            </div>
                            <div className='mt-3'>
                                <GiRoad />
                                <Link to="/trips" className='text-decoration-none text-dark ms-2'>Trips</Link>
                            </div>
                            <div className='mt-3'>
                                <FaBusAlt />
                                <Link to="/vehicles" className='text-decoration-none text-dark ms-2'>Vehicles</Link>
                            </div>
                            <div className='mt-3'>
                                <LuTicket />
                                <Link to="/bookings" className='text-decoration-none text-dark ms-2'>Bookings</Link>
                            </div>
                        </div>
                        <div className='position-absolute bottom-0 mb-4'>
                            <CiLogout />
                            <span onClick={() => logout()} className='text-decoration-none text-dark ms-2 cursor-pointer'>Logout</span>
                        </div>
                    </div>
                </div>
                <div className='col-md-9 ms-5 mt-5 dashboardBg rounded-3 p-4'>
                    <div>
                        {added !== null ? <div className="alert alert-success">{added}</div> : ''}
                        {error !== null ? <div className="alert alert-danger">{error}</div> : ''}
                        <h4>New Organization</h4>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='mt-4'>
                                <label htmlFor="OrganizationImage" className="custom-file-upload">
                                    <MdInsertPhoto /> Upload organization photo
                                </label>
                                <input
                                    onChange={handleImageChange}
                                    onBlur={formik.handleBlur}
                                    name="OrganizationImage"
                                    id="OrganizationImage"
                                    type="file"
                                    aria-describedby="inputGroupFileAddon04"
                                    aria-label="Upload"
                                />
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-3">
                                    <div>
                                        <label htmlFor="OrganizationName" className='form-label'>Organization's Name</label>
                                        <input
                                            value={formik.values.OrganizationName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name="OrganizationName"
                                            id="OrganizationName"
                                            type="text"
                                            placeholder='Enter organization name'
                                            className='form-control'
                                        />
                                    </div>
                                    {formik.touched.OrganizationName && formik.errors.OrganizationName ? (
                                        <div className="text-danger">{formik.errors.OrganizationName}</div>
                                    ) : null}
                                </div>
                                <div className="col-md-3">
                                    <div>
                                        <label htmlFor="OrgStatus" className='form-label'>Organization Status</label>
                                        <div className='d-flex justify-content-between bg-white form-control'>
                                            <h6>Active</h6>
                                            <div className="form-check form-switch">
                                                <input
                                                    value={formik.values.OrgStatus}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    name="OrgStatus"
                                                    id="OrgStatus"
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="LicenceID" className='form-label'>License ID</label>
                                        <input
                                            value={formik.values.LicenceID}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name="LicenceID"
                                            id="LicenceID"
                                            type="number"
                                            placeholder='Enter the organization license ID'
                                            className='form-control'
                                        />
                                    </div>
                                    {formik.touched.LicenceID && formik.errors.LicenceID ? (
                                        <div className="text-danger">{formik.errors.LicenceID}</div>
                                    ) : null}
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="OrganizationType" className='form-label'>Organizational Type</label>
                                        <input
                                            value={formik.values.OrganizationType}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name="OrganizationType"
                                            id="OrganizationType"
                                            type="text"
                                            placeholder='Enter the organizational type'
                                            className='form-control'
                                        />
                                    </div>
                                    {formik.touched.OrganizationType && formik.errors.OrganizationType ? (
                                        <div className="text-danger">{formik.errors.OrganizationType}</div>
                                    ) : null}
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="BankAccount" className='form-label'>Bank Account</label>
                                        <input
                                            value={formik.values.BankAccount}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name="BankAccount"
                                            id="BankAccount"
                                            type="number"
                                            placeholder='Enter the organization bank account'
                                            className='form-control'
                                        />
                                    </div>
                                    {formik.touched.BankAccount && formik.errors.BankAccount ? (
                                        <div className="text-danger">{formik.errors.BankAccount}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="OrganizationFinancialID" className='form-label'>Financial ID</label>
                                        <input
                                            value={formik.values.OrganizationFinancialID}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name="OrganizationFinancialID"
                                            id="OrganizationFinancialID"
                                            type="number"
                                            placeholder='Enter the organization financial ID'
                                            className='form-control'
                                        />
                                    </div>
                                    {formik.touched.OrganizationFinancialID && formik.errors.OrganizationFinancialID ? (
                                        <div className="text-danger">{formik.errors.OrganizationFinancialID}</div>
                                    ) : null}
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="FinancialLimitFrom" className='form-label'>Financial Limit From</label>
                                        <input
                                            value={formik.values.FinancialLimitFrom}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name="FinancialLimitFrom"
                                            id="FinancialLimitFrom"
                                            type="number"
                                            placeholder='Enter the financial limit start'
                                            className='form-control'
                                        />
                                    </div>
                                    {formik.touched.FinancialLimitFrom && formik.errors.FinancialLimitFrom ? (
                                        <div className="text-danger">{formik.errors.FinancialLimitFrom}</div>
                                    ) : null}
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="FinancialLimitTo" className='form-label'>Financial Limit To</label>
                                        <input
                                            value={formik.values.FinancialLimitTo}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name="FinancialLimitTo"
                                            id="FinancialLimitTo"
                                            type="number"
                                            placeholder='Enter the financial limit end'
                                            className='form-control'
                                        />
                                    </div>
                                    {formik.touched.FinancialLimitTo && formik.errors.FinancialLimitTo ? (
                                        <div className="text-danger">{formik.errors.FinancialLimitTo}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-6">
                                    <div>
                                        <label htmlFor="OrganizationAttachments" className='form-label'>Upload Organization Documents</label>
                                        <input
                                            onChange={handleFileChange}
                                            onBlur={formik.handleBlur}
                                            name="OrganizationAttachments"
                                            id="OrganizationAttachments"
                                            type="file"
                                            aria-describedby="inputGroupFileAddon04"
                                            aria-label="Upload"
                                            multiple
                                            className='form-control'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-end mt-5'>
                                {isLoading ? <button className='btn btn-primary text-white' type="button">
                                    <BallTriangle
                                        height={25}
                                        width={50}
                                        radius={5}
                                        color="white"
                                        ariaLabel="ball-triangle-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                </button> : <button type='submit' className='btn btn-primary text-white'>Add organization</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewOrg;  