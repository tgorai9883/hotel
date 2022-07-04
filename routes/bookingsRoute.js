const express = require('express');
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");

router.post("/bookroom",async(req,res)=>{
    const {room,
        userid,
        fromDate,
        toDate,
        totalAmount,
        totalDays} = req.body;
    
        try {
            const newBooking = new Booking({
                room: room.name,
                roomid: room._id,
                userid,
                fromDate: moment(fromDate).format('DD-MM-YYYY'),
                toDate: moment(toDate).format('DD-MM-YYYY'),
                totalAmount,
                totalDays,
                transactionid: '1234'
            })
            const booking = await newBooking.save();
            const tempRoom = await Room.findOne({_id:booking.roomid});
            tempRoom.currentbookings.push({
                bookingid:booking._id,
                fromDate:booking.fromDate,
                toDate:booking.toDate,
                userid: userid,
                status: booking.status
            });
            await tempRoom.save();
            res.send('Room Booked Successfully');
        } catch (error) {
            return res.status(400).json({error});
            // console.log(error);
        }
})

router.post("/getbookingsbyuserid",async(req,res)=>{
    const userid = req.body.userid;
    try {
        const bookings = await Booking.find({userid:userid});
        res.send(bookings);
    } catch (error) {
        // console.log(error);
        return res.status(400).json({error});
    }
})

router.post("/cancelbooking",async(req,res)=>{
    const {bookid, roomid} = req.body;
    try {
        const bookingItem = await Booking.findOne({_id: bookid});
        bookingItem.status = 'cancelled';
        await bookingItem.save();

        const room = await Room.findOne({_id:roomid})
        const bookings = room.currentbookings;
        const temp = bookings.filter(booking=>booking.bookingid.toString()!==bookid)
        room.currentbookings = temp;
        await room.save();
        res.send("Your booking is cancelled successfully");
    } catch (error) {
        return res.status(400).json({error});
    }
})

router.get("/getallbookings",async(req,res)=>{
    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({error});
    }
})

module.exports = router;