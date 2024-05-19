import React, { useContext } from 'react'
import DuckImage from '../../imgs/Duck.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { SuperContext } from '../../Context/SuperContext';
import { BsBuildings } from "react-icons/bs";
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

function TripDetails() {
    let params = useParams();
    let superName = localStorage.getItem('supername');

    let navigate = useNavigate();
    let { setSuperToken,setsuperName } = useContext(SuperContext);
    function logout() {
        localStorage.removeItem('superAdminToken');
        localStorage.removeItem('supername');
        setsuperName(null);
        setSuperToken(null);
        navigate('/');
    }
    async function getSpecificTrip(id) {
        return await axios.get(`https://seated-booking.onrender.com/trips/${id}`);

    }
    const { data } = useQuery('getSpecificTrip', () => getSpecificTrip(params.id));
    return <>
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
                                <Link to="/organizations" className='text-decoration-none text-dark ms-2'>Organizaiton</Link>
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
                        <h4 className='mb-5'> Trip summary</h4>
                        <div className="frame-parent mx-auto">
                            <div className="nyc-wrapper">
                                <b className="nyc">Trip ID : {data?.data.data.Trip_ID}</b>
                            </div>
                            <div className="frame-group">
                                <div className="nyc-parent">
                                    <b className="nyc">{data?.data.data.Boarding_Station.Governorate_Name} </b>
                                    <b className="nyc">{data?.data.data.Trip_Start_Date}</b>
                                </div>
                                <div className="vector-parent">
                                    <b className="delta-airlines">{data?.data.data.Vehicle_ID.Organization_ID.OrganizationName}</b>

                                    <div className="non-stop-parent">
                                        <div className="nyc">{data?.data.data.Vehicle_ID.Vehicle_Class}</div>
                                    </div>
                                </div>
                                <div className="nyc-group">
                                    <b className="nyc">{data?.data.data.Trip_End_Date}</b>
                                    <b className="nyc">{data?.data.data.Destination_Station.Governorate_Name}</b>
                                </div>
                                <div className="frame-item">
                                </div>
                                <div className="nyc-group">
                                    <b className="nyc">{data?.data.data.Vehicle_ID.Vehicle_Name}</b>
                                </div>
                                
                                <div className="frame-item">
                                </div>
                                <div className="nyc-container">
                                    <b className="nyc6">{data?.data.data.Vehicle_ID.Vehicle_Type}</b>
                                </div>
                            </div>
                        </div>
                        <h4 className='mt-4'>Trip details</h4>

                        <div className="row mt-5">
                            <span className='mb-2'>Basic Details</span>
                            <div className="col-md-3">
                                <div>
                                    <label htmlFor="" className='form-label'>Organization's Name</label>
                                    <input value={data?.data.data.Vehicle_ID.Organization_ID.OrganizationName} disabled type="text" placeholder='Enter organization name' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <label htmlFor="" className='form-label'>Trip ID</label>
                                    <input value={data?.data.data.Trip_ID} disabled type="number" placeholder='Enter the Trip ID' className='form-control' />
                                </div>

                            </div>
                        </div>

                        <div className="row mt-5">
                            <span className='mb-2'>Boarding details</span>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Boarding governrate name </label>
                                    <input value={data?.data.data.Boarding_Station.Governorate_Name} disabled type="text" placeholder='Enter Boarding governrate name ' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Boarding city name </label>
                                    <input value={data?.data.data.Boarding_Station.City_Name} disabled type="text" placeholder='Enter Boarding city name ' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Boarding station name </label>
                                    <input value={data?.data.data.Boarding_Station.Station_Name} disabled type="text" placeholder='Enter Boarding station name ' className='form-control' />
                                </div>

                            </div>
                        </div>


                        <div className="row mt-5">
                            <span className='mb-2'>Destination details</span>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Destination governrate name  </label>
                                    <input value={data?.data.data.Destination_Station.Governorate_Name} disabled type="text" placeholder='Enter Destination governrate name  ' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Destination city name </label>
                                    <input value={data?.data.data.Destination_Station.City_Name} disabled type="text" placeholder='Enter Destination city name  ' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Destination station name  </label>
                                    <input value={data?.data.data.Destination_Station.Station_Name} disabled type="text" placeholder='Enter Destination station name  ' className='form-control' />
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <span className='mb-2'>Time details</span>
                            <div className='col-md-4'>
                                <span className='mb-2'>Trip start date</span>
                                <div className="mt-2">
                                    <div>
                                        <input value={data?.data.data.Trip_Start_Date} disabled type="text" placeholder='enter start date ' className='form-control' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4 ms-5'>
                                <span className='mb-2'>Trip end date</span>
                                <div className="mt-2">
                                    <div>
                                        <input value={data?.data.data.Trip_End_Date} disabled type="text" placeholder='enter end date ' className='form-control' />
                                    </div>
                                </div>
                            </div>

                        </div>



                        <div className="row mt-5">
                            <span className='mb-2'>Vehicle details</span>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Vehicle ID</label>
                                    <input value={data?.data.data.Vehicle_ID._id} disabled type="text" placeholder='Enter the Vehicle ID' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Vehicle type</label>
                                    <input value={data?.data.data.Vehicle_ID.Vehicle_Type} disabled type="text" placeholder='Enter Vehicle type ' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Vehicle Name </label>
                                    <input value={data?.data.data.Vehicle_ID.Vehicle_Name} disabled type="text" placeholder='Enter Vehicle Name ' className='form-control' />
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-3">
                                <div>
                                    <label htmlFor="" className='form-label'>Vehicle class</label>
                                    <input value={data?.data.data.Vehicle_ID.Vehicle_Class} disabled type="text" placeholder='Enter Vehicle class' className='form-control' />
                                </div>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="" className='form-label'>Trip notes</label>
                            <textarea value={data?.data.data.Trip_Notes} disabled type="text" placeholder='Enter Trip notes' className='form-control' />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </>
}

export default TripDetails;