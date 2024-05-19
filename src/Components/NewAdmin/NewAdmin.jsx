import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SuperContext } from '../../Context/SuperContext';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BsBuildings } from "react-icons/bs";
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome, CiLogout } from "react-icons/ci";
import DuckImage from '../../imgs/Duck.png';
import { BallTriangle } from 'react-loader-spinner'

function NewAdmin() {
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	let [isLoading, SetisLoading] = useState(false);

	let superName = localStorage.getItem('supername');

	const token = localStorage.getItem('superAdminToken');
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	async function addNewAdmin(values) {
		SetisLoading(true);

		try {
			const { data } = await axios.post(
				'https://seated-booking.onrender.com/users/orgAdmin',
				values,
				config
			);
			if (data.message === 'success') {
				setSuccess(data.message);
				console.log("success")
				SetisLoading(false);

			}
		} catch (err) {
			if (err.response && err.response.data && err.response.data.error) {
				setError(err.response.data.error);
				console.log("fail")
				SetisLoading(false);


			} else {
				setError('Error, Cant add new admin.');
				console.log("fail2")
				SetisLoading(false);


			}
		}
	}

	function getAllOrganizations() {
		return axios.get(`https://seated-booking.onrender.com/org/all`, config);
	}

	let { data: organizations } = useQuery('getallorganizations', getAllOrganizations);
	let navigate = useNavigate();
	let { setSuperToken, setsuperName } = useContext(SuperContext);

	function logout() {
		localStorage.removeItem('superAdminToken');
		localStorage.removeItem('supername');
		setsuperName(null);
		setSuperToken(null);
		navigate('/');
	}

	let validationSchema = Yup.object({
		UserEmail: Yup.string().email('Invalid email address').required('Email is required'),
		OrganizationName: Yup.string().required('Please select an organization name'),
		BusinessUserID: Yup.number().required('Organization ID is required').positive('Organization ID must be a positive number').integer('Organization ID must be an integer'),
		Username: Yup.string().required('Username is required'),
		UserNationalID: Yup.number().required('National ID is required').positive('National ID must be a positive number').integer('National ID must be an integer'),
		UserMobileNumber: Yup.number().required('User Mobile Number is required').integer('User Mobile Number must be an integer'),
		UserPassword: Yup.string().required('Password is required'),
	});

	let formik = useFormik({
		initialValues: {
			OrganizationName: '',
			UserStatus: false,
			BusinessUserID: '',
			UserEmail: '',
			Username: '',
			UserNationalID: '',
			UserMobileNumber: '',
			UserPassword: '',
		},
		validationSchema,
		onSubmit: addNewAdmin
	});

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
						{error && <div className="alert mt-2 p-2 alert-danger">{error}</div>}
						{success && <div className="alert alert-success">{success}</div>}
						<h4>New Admin</h4>
						<form onSubmit={formik.handleSubmit}>
							<div className="row mt-5">
								<div className="col-md-3">
									<label htmlFor="OrganizationName" className="form-label">Choose Organization name</label>
									<select
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										name="OrganizationName"
										id="OrganizationName"
										className="form-select"
										value={formik.values.OrganizationName}
									>
										<option value="" disabled>Select organization name</option>
										{organizations?.data && organizations.data.data.map(org => (
											<option key={org.id} value={org.OrganizationName}>{org.OrganizationName}</option>
										))}
									</select>
									{formik.touched.OrganizationName && formik.errors.OrganizationName && (
										<div className="alert mt-2 p-2 alert-danger">{formik.errors.OrganizationName}</div>
									)}
								</div>
								<div className="col-md-3">
									<div>
										<label htmlFor="UserStatus" className='form-label'>Admin Status</label>
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
												/>											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="row mt-5">
								<div className="col-md-3">
									<div>
										<label htmlFor="BusinessUserID" className='form-label'>Business user ID</label>
										<input value={formik.values.BusinessUserID} onChange={formik.handleChange} onBlur={formik.handleBlur} name="BusinessUserID" id="BusinessUserID" type="number" placeholder='Enter the business user ID' className='form-control' />
									</div>
								</div>
							</div>

							<div className="row mt-5">
								<div className="col-md-4">
									<div>
										<label htmlFor="UserEmail" className='form-label'>Admin's Email</label>
										<input value={formik.values.UserEmail} onChange={formik.handleChange} onBlur={formik.handleBlur} name="UserEmail" id="UserEmail" type="email" placeholder='Enter the admin email' className='form-control' />
									</div>
								</div>
								<div className="col-md-4">
									<div>
										<label htmlFor="Username" className='form-label'>Admin Username</label>
										<input value={formik.values.Username} onChange={formik.handleChange} onBlur={formik.handleBlur} name="Username" id="Username" type="text" placeholder='Enter the admin username' className='form-control' />
										{formik.touched.Username && formik.errors.Username && (
											<div className="alert mt-2 p-2 alert-danger">{formik.errors.Username}</div>
										)}
									</div>
								</div>
							</div>

							<div className="row my-5">
								<div className="col-md-4">
									<div>
										<label htmlFor="UserNationalID" className='form-label'>National ID</label>
										<input value={formik.values.UserNationalID} onChange={formik.handleChange} onBlur={formik.handleBlur} name="UserNationalID" id="UserNationalID" type="number" placeholder='Enter the admin national ID' className='form-control' />
									</div>
								</div>
								<div className="col-md-4">
									<div>
										<label htmlFor="UserMobileNumber" className='form-label'>Mobile Number</label>
										<input value={formik.values.UserMobileNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} name="UserMobileNumber" id="UserMobileNumber" type="number" placeholder='Enter the admin Mobile Number' className='form-control' />
									</div>
								</div>
								<div className="col-md-4">
									<div>
										<label htmlFor="UserPassword" className='form-label'>Password</label>
										<input value={formik.values.UserPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} name="UserPassword" id="UserPassword" type="password" placeholder='Enter the Password' className='form-control' />
									</div>
								</div>
							</div>
							{isLoading ? <button className='btn btn-primary mb-5 d-flex ms-auto' type="button">
								<BallTriangle
									height={30}
									width={80}
									radius={5}
									color="white"
									ariaLabel="ball-triangle-loading"
									wrapperStyle={{}}
									wrapperClass=""
									visible={true}
								/>
							</button> : <button type='submit' className='btn btn-primary mb-5 d-flex ms-auto'>Add Admin</button>
							}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewAdmin;
