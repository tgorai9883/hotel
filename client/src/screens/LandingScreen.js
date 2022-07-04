import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
    duration:2000
});

function LandingScreen() {
    return <div className='row justify-content-center' style={{'backgroundColor':'black','height':'100vh'}}>
        <div className='col-md-9 my-auto text-center' style={{'marginTop':'250px','borderRight':'8px solid white'}}>
            <h1 className='w-col' style={{'fontSize':'1000%'}} data-aos="zoom-in">HotelWith</h1>
            <h3 className='w-col' data-aos="zoom-out">Enjoy your holidays with HotelWith</h3>
            <h1 className='w-col' data-aos="zoom-out">Luxurious Stay With Affordable Price</h1>
            <a href='/home' className="btn btn-light m-3" data-aos="fade-up"><h2>Get Started</h2></a>
        </div>

    </div>
}
export default LandingScreen;