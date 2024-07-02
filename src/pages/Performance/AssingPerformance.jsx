/* eslint-disable react/prop-types */

import './Perform.css';

const AssingPerformance = ({ percentage, label, unit, color, text }) => {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;

    return (
        <div id='performance' className='shadow p-1 lg:p-5 rounded-lg border-2'>
            <div className="circle-big">
                <div className="text">
                    <h2 className='text-3xl'>   {label}</h2>
                    <div className="small text-black">
                        <h2 className='text-xl'>{unit}</h2>
                    </div>
                </div>
                <svg width="120" height="120">
                    <circle
                        className="bg"
                        cx="57"
                        cy="57"
                        r={radius}
                        strokeWidth="8"
                    />
                    <circle
                        className="progress"
                        cx="57"
                        cy="57"
                        r={radius}
                        strokeWidth="8"
                        stroke={color}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (percentage / 100) * circumference}
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            <h5 className='text-center text-xl font-bold'>{text}</h5>
        </div>
    );
};

export default AssingPerformance;
