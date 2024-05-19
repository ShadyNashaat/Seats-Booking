import React, { useContext, useEffect, useState } from 'react';
import DuckImage from '../../imgs/Duck.png';
import { Link, useNavigate } from 'react-router-dom';
import { SuperContext } from '../../Context/SuperContext';
import { BsBuildings } from "react-icons/bs";
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useFormik } from 'formik';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner'

import * as Yup from 'yup';

function NewTrip() {
    const navigate = useNavigate();
    const { setSuperToken, setsuperName } = useContext(SuperContext);
    let [isLoading, SetisLoading] = useState(false);
    let superName = localStorage.getItem('supername');
    const [stationData, setStationData] = useState({ data: { stations: [] } });
    const [vehicleData, setVehicleData] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    let [added, setadded] = useState(null);
    let [error, seterror] = useState(null);

    const token = localStorage.getItem('superAdminToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [stationsResponse, vehiclesResponse] = await Promise.all([
                    axios.get(`https://seated-booking.onrender.com/stations`),
                    axios.get(`https://seated-booking.onrender.com/vehicles`)
                ]);
                setStationData(stationsResponse.data);
                setVehicleData(vehiclesResponse.data);
                setIsDataLoading(false);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    function logout() {
        localStorage.removeItem('superAdminToken');
        localStorage.removeItem('supername');
        setsuperName(null);
        setSuperToken(null);
        navigate('/');
    }
    async function addNewTrip(values) {
        SetisLoading(true);
        try {
            let response = await axios.post(`https://seated-booking.onrender.com/trips`, values, config);
            if (response.data.message === 'Success') {
                setadded("Trip Added successfully")
                SetisLoading(false);
            }
        } catch (error) {
            seterror("Error, Can't add this trip.")
            SetisLoading(false);
        }
    }

    let validationSchema = Yup.object({
        Boarding_Station: Yup.string().required('Boarding station is required'),
        Destination_Station: Yup.string().required('Destination station is required'),
        Trip_Start_Date: Yup.string().required('Trip start date is required'),
        Trip_End_Date: Yup.string().required('Trip end date is required'),
        Vehicle_ID: Yup.string().required('Vehicle ID is required'),
        Trip_Notes: Yup.string().required('Trip notes are required'),
    });

    let formik = useFormik({
        initialValues: {
            Boarding_Station: '',
            Destination_Station: '',
            Trip_Start_Date: '',
            Trip_End_Date: '',
            Vehicle_ID: '',
            Trip_Notes: ''
        },
        validationSchema: validationSchema,
        onSubmit: addNewTrip
    });
    if (isDataLoading) {
        return <div className='w-100 py-5 d-flex justify-content-center'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }
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
                                <img src={DuckImage} alt="Duck Image" />
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

                        <h4>New Trip</h4>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row mt-5">
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="Boarding_Station" className='form-label'>Boarding station name </label>
                                        <select
                                            id="Boarding_Station"
                                            name="Boarding_Station"
                                            className='form-control'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.Boarding_Station}
                                        >
                                            <option value="" disabled>Select Boarding Station</option>
                                            {stationData?.data.stations && stationData.data.stations.map((station) => (
                                                <option key={station._id} value={station._id}>
                                                    {station.station_name}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.Boarding_Station && formik.errors.Boarding_Station ? (
                                            <div className="text-danger">{formik.errors.Boarding_Station}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="ms-5 col-md-4">
                                    <div>
                                        <label htmlFor="Destination_Station" className='form-label'>Destination station name </label>
                                        <select
                                            id="Destination_Station"
                                            name="Destination_Station"
                                            className='form-control'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.Destination_Station}
                                        >
                                            <option value="" disabled>Select Destination Station</option>
                                            {stationData?.data.stations && stationData.data.stations.map((station) => (
                                                <option key={station._id} value={station._id}>
                                                    {station.station_name}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.Destination_Station && formik.errors.Destination_Station ? (
                                            <div className="text-danger">{formik.errors.Destination_Station}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <span className='mb-2'>Time details</span>
                                <div className='col-md-4'>
                                    <span className='mb-2'>Trip start date</span>
                                    <div className="mt-2">
                                        <div>
                                            <input
                                                type="text"
                                                id="Trip_Start_Date"
                                                name="Trip_Start_Date"
                                                className='form-control'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.Trip_Start_Date}
                                            />
                                            {formik.touched.Trip_Start_Date && formik.errors.Trip_Start_Date ? (
                                                <div className="text-danger">{formik.errors.Trip_Start_Date}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 ms-5'>
                                    <span className='mb-2'>Trip end date</span>
                                    <div className="mt-2">
                                        <div>
                                            <input
                                                type="text"
                                                id="Trip_End_Date"
                                                name="Trip_End_Date"
                                                className='form-control'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.Trip_End_Date}
                                            />
                                            {formik.touched.Trip_End_Date && formik.errors.Trip_End_Date ? (
                                                <div className="text-danger">{formik.errors.Trip_End_Date}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <span className='mb-2'>Vehicle details</span>
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="Vehicle_ID" className='form-label'>Vehicle Name</label>
                                        <select
                                            id="Vehicle_ID"
                                            name="Vehicle_ID"
                                            className='form-control'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.Vehicle_ID}
                                        >
                                            <option value="" disabled>Select Vehicle Name</option>
                                            {vehicleData?.data.map((vehicle) => (
                                                <option key={vehicle._id} value={vehicle._id}>
                                                    {vehicle.Vehicle_Name}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.Vehicle_ID && formik.errors.Vehicle_ID ? (
                                            <div className="text-danger">{formik.errors.Vehicle_ID}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="Trip_Notes" className='form-label'>Trip notes</label>
                                <textarea
                                    id="Trip_Notes"
                                    name="Trip_Notes"
                                    placeholder='Enter Trip notes'
                                    className='form-control'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Trip_Notes}
                                />
                                {formik.touched.Trip_Notes && formik.errors.Trip_Notes ? (
                                    <div className="text-danger">{formik.errors.Trip_Notes}</div>
                                ) : null}
                            </div>
                            {isLoading ? <button className='btn btn-primary mb-5 d-flex ms-auto mt-5'    type="button">
                                <BallTriangle
                                    height={30}
                                    width={60}
                                    radius={5}
                                    color="white"
                                    ariaLabel="ball-triangle-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </button> : <button type="submit" className='btn btn-primary mb-5 d-flex ms-auto mt-5'>Add Trip</button>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewTrip;
