import React, { useContext} from 'react';
import DuckImage from '../../imgs/Duck.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { AdminContext } from '../../Context/AdminContext';

function BookingsOrgAdminDetails() {
    let { setAdminOrganizationId, setAdminName, setAdminToken } = useContext(AdminContext);
    let params = useParams();
    let adminname = localStorage.getItem('adminName');
    let navigate = useNavigate();
    function logout() {
        localStorage.removeItem('orgAdminToken');
        localStorage.removeItem('adminOrganizationId');
        localStorage.removeItem('adminName');
        localStorage.removeItem('adminToken');
        setAdminToken(null);
        setAdminOrganizationId(null);
        setAdminName(null);
        navigate('/');
    }
    async function getSpecificticket(id) {
        return await axios.get(`https://seated-booking.onrender.com/ticket//${id}`);

    }
    const { data } = useQuery('getSpecificticket', () => getSpecificticket(params.id));

    return <>
        <div className=' homeBg container-fluid'>
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
                                <img src={DuckImage} alt="Duck-Image" />
                            </div>
                            <div className='align-self-center'>
                                <h4>Duck UI</h4>
                                <h6>{adminname}</h6>
                            </div>
                        </div>

                        <div className='mt-5'>

                            <div>
                                <CiHome />
                                <Link to="/homeorgadmin" className='text-decoration-none text-dark ms-2'>Home</Link>
                            </div>

                            <div className='mt-3'>
                                <GiRoad />
                                <Link to="/tripsorgadmin" className='text-decoration-none text-dark ms-2'>Trips</Link>
                            </div>
                            <div className='mt-3'>
                                <FaBusAlt />
                                <Link to="/allvehiclesorgadmin" className='text-decoration-none text-dark ms-2'>Vehicles</Link>
                            </div>
                            <div className='mt-3'>
                                <LuTicket />
                                <Link to="/bookingsorgadmin" className='text-decoration-none text-dark ms-2'>Bookings</Link>
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
                        <h4 className='mb-5'>Booking Details</h4>
                        <div className="row mt-5">
                            <span className='mb-2'>Basic Details</span>
                            <div className="col-md-3">
                                <div>
                                    <label htmlFor="" className='form-label'>Trip ID</label>
                                    <input value={data?.data.data.Trip_ID.Trip_ID} disabled type="text" className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <label htmlFor="" className='form-label'>Organization name</label>
                                    <input value={data?.data.data.Trip_ID.Organization_ID.OrganizationName} disabled type="text" className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-3">
                                <div>
                                    <label htmlFor="" className='form-label'>Passenger name</label>
                                    <input value={data?.data.data.Passenger_Name} disabled type="text" className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <label htmlFor="" className='form-label'>Passenger mobile number</label>
                                    <input value={data?.data.data.Passenger_Mobile_Number} disabled type="number" className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <label htmlFor="" className='form-label'>Passenger national ID</label>
                                    <input value={data?.data.data.Passenger_National_ID} disabled type="number" className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <span className='mb-2'>Boarding details</span>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Boarding governrate name </label>
                                    <input value={data?.data.data.Trip_ID.Boarding_Station.Governorate_Name} disabled type="text" placeholder='Enter Boarding governrate name ' className='form-control' />
                                </div>

                            </div>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Boarding city name </label>
                                    <input value={data?.data.data.Trip_ID.Boarding_Station.City_Name} disabled type="text" placeholder='Enter Boarding city name ' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Boarding station name </label>
                                    <input value={data?.data.data.Trip_ID.Boarding_Station.Station_Name} disabled type="text" placeholder='Enter Boarding station name ' className='form-control' />
                                </div>

                            </div>
                        </div>


                        <div className="row mt-5">
                            <span className='mb-2'>Destination details</span>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Destination governrate name  </label>
                                    <input value={data?.data.data.Trip_ID.Destination_Station.Governorate_Name} disabled type="text" placeholder='Enter Destination governrate name  ' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Destination city name </label>
                                    <input value={data?.data.data.Trip_ID.Destination_Station.City_Name} disabled type="text" placeholder='Enter Destination city name  ' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Destination station name  </label>
                                    <input value={data?.data.data.Trip_ID.Destination_Station.Station_Name} disabled type="text" placeholder='Enter Destination station name  ' className='form-control' />
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <span className='mb-2'>Time details</span>
                            <div className='col-md-4'>
                                <span className='mb-2'>Trip start date</span>
                                <div className="mt-2">
                                    <div>
                                        <input value={data?.data.data.Trip_ID.Trip_Start_Date} disabled type="text" placeholder='enter start date ' className='form-control' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4 ms-5'>
                                <span className='mb-2'>Trip end date</span>
                                <div className="mt-2">
                                    <div>
                                        <input value={data?.data.data.Trip_ID.Trip_End_Date} disabled type="text" placeholder='enter end date ' className='form-control' />
                                    </div>
                                </div>
                            </div>

                        </div>



                        <div className="row mt-5">
                            <span className='mb-2'>Vehicle details</span>
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="" className='form-label'>Vehicle ID</label>
                                    <input value={data?.data.data.Seat_Number.Vehicle_ID} disabled type="text" placeholder='Enter the Vehicle ID' className='form-control' />
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-3">
                                <div>

                                    <label htmlFor="" className='form-label'>Seat number</label>
                                    <input value={data?.data.data.Seat_Number.Seat_Number} disabled type="text" placeholder='Enter Vehicle class' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <label htmlFor="" className='form-label'>Seat price</label>
                                    <input value={data?.data.data.Seat_Number.Seat_Price} disabled type="text" placeholder='Enter Vehicle class' className='form-control' />
                                </div>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="" className='form-label'>Trip notes</label>
                            <textarea value={data?.data.data.Trip_ID.Trip_Notes} disabled type="text" placeholder='Enter Trip notes' className='form-control' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default BookingsOrgAdminDetails;