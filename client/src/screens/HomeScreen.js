import React,{useState,useEffect} from "react";
import axios from "axios";
import Room from "../components/room";
import Loader from "../components/Loader";
import 'antd/dist/antd.min.css';
import { DatePicker } from 'antd';
import moment from "moment";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
    duration:400
});

const { RangePicker } = DatePicker;


function HomeScreen(){
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState();

    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [duplicateRooms, setDuplicateRooms] = useState([]);
    
    const [searchKey, setSearchKey] = useState('');
    const [type, setType] = useState('all');
    
    useEffect(()=>{
        async function fetchData(){
            try {
                setLoading(true);
                const data = (await axios.get("/api/rooms/getallrooms")).data;
                setRooms(data);
                setDuplicateRooms(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchData();
    },[])
    
    function filterByDate(dates){
        console.log(dates);
        setFromDate(moment(dates[0]).format('DD-MM-YYYY'));
        setToDate(moment(dates[1]).format('DD-MM-YYYY'));
        console.log(fromDate);
        var temprooms = [];
        var availability ;
        duplicateRooms.forEach((room)=>{
            availability = false;
            if(room.currentbookings.length>0){
                room.currentbookings.forEach((booking)=>{
                    if(!moment(fromDate).isBetween(booking.fromDate,booking.toDate) 
                    && !moment(toDate).isBetween(booking.fromDate,booking.toDate)){
                        if(fromDate !== booking.fromDate && toDate !== booking.fromDate
                        && fromDate !== booking.toDate && toDate!== booking.toDate){
                            availability=true;
                        }
                    }
                })
            }
            if(availability === true || room.currentbookings.length===0){
                temprooms.push(room);
            }
        })
        // for(const room of duplicateRooms){
        //     availability = false;
        //     if(room.currentbookings.length>0){
        //         for(const booking of room.currentbookings){
        //             if(!moment(fromDate).isBetween(booking.fromDate,booking.toDate) 
        //             && !moment(toDate).isBetween(booking.fromDate,booking.toDate)){
        //                 if(fromDate !== booking.fromDate && toDate !== booking.fromDate
        //                 && fromDate !== booking.toDate && toDate!== booking.toDate){
        //                     availability=true;
        //                 }
        //             }
        //         }
        //     }
        //     if(availability === true || room.currentbookings.length===0){
        //         temprooms.push(room);
        //     }
        // }
        setRooms(temprooms);
    }
    function filterBySearch(){
        const temprooms = duplicateRooms.filter(room=>room.name.toLowerCase().includes(searchKey.toLowerCase()));
        setRooms(temprooms);
    }
    function filterByType(type){
        setType(type);
        if(type !== 'all'){
            const temprooms = duplicateRooms.filter(room=>room.type.toLowerCase() === type.toLowerCase());
            setRooms(temprooms);
        } else {
            setRooms(duplicateRooms);
        }
    }
    return(
        <div className="container" style={{"marginTop": "100px"}}>
            <div className="row shadow">
                <div className="col-sm-3 m-3">
                    <RangePicker className="border-dark" format='DD-MM-YYYY' onChange={filterByDate}/>
                </div>
                <div className="col-sm-4 m-3">
                    <input type='text' className="form-control border-dark" placeholder="search rooms"
                        value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}} onKeyUp={filterBySearch} 
                    />
                </div>
                <div className="col-sm-3 m-3">
                    <select className="form-control border-dark" value={type} onChange={e=>filterByType(e.target.value)}>
                        <option value='all'>All</option>
                        <option value='delux'>Delux</option>
                        <option value='non-delux'>Non-Delux</option>
                    </select>
                </div>
                
            </div>
            <div className="row justify-content-center mt-5">
                {loading?<Loader/>:(
                    rooms.map((room)=>{
                        return <div className="col-md-8" data-aos="fade-up">
                            <Room room={room} fromDate={fromDate} toDate={toDate} key={room._id}/>
                        </div>
                    })
                )}
            </div>
        </div>
    )
}
export default HomeScreen;