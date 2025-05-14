/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import LiveClass from '../Recording/LiveClass';
import Module from './Module';
import AllAssignments from './AllAssignments';
import ResourceTable from "../../components/Table/ResourceTable";
// import data from '../../../data/module.json'
// eslint-disable-next-line no-unused-vars
import Students from '../Students/Students';
import axios from 'axios';
import Present from '../Students/Present';

// eslint-disable-next-line react/prop-types
const CourseTab = ({ course, updateData }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Get module data
    useEffect(() => {
        axios.get(`${BASE_URL}/module/data`)
            .then(function (response) {
                setData(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }, [BASE_URL]);


    return (
        <div>

            <div className="rounded-xl dark:text-white p-1 mb-3 max-w-lg overflow-hidden">
                <ul className="flex py-4 items-center gap-2 text-sm font-medium flex-wrap">
                    <li>
                        <a
                            onClick={() => setActiveTab(0)}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded px-3 py-2 dark:bg-gray-800 dark:text-white hover:shadow border ${activeTab === 0 ? 'tab-color shadow' : ''}`}>
                            মডিউলসমূহ
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => setActiveTab(1)}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded px-3 py-2 dark:bg-gray-800 dark:text-white hover:shadow border ${activeTab === 1 ? 'tab-color shadow' : ''}`}>
                            এসাইনমেন্ট
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => setActiveTab(2)}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded border px-3 py-2 dark:bg-gray-800 dark:text-white hover:shadow ${activeTab === 2 ? 'tab-color shadow' : ''}`}>
                            রেকর্ডিং
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => setActiveTab(3)}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded border px-3 py-2 dark:bg-gray-800 dark:text-white hover:shadow ${activeTab === 3 ? 'tab-color shadow' : ''}`}>
                            রিসোর্স
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => setActiveTab(4)}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded border px-3 py-2 dark:bg-gray-800 dark:text-white hover:shadow ${activeTab === 4 ? 'tab-color shadow' : ''}`}>
                            স্টুডেন্টস
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => setActiveTab(5)}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded border px-3 py-2 dark:bg-gray-800 dark:text-white hover:shadow ${activeTab === 5 ? 'tab-color shadow' : ''}`}>
                            উপস্থিতি 
                        </a>
                    </li>
                </ul>
            </div>
            <div className="py-3 lg:px-0 px-2">
                <div className={`${activeTab === 0 ? 'block' : 'hidden'} transition-opacity duration-600`}>
                    <Module data={course} updateData={updateData} />
                </div>
                <div className={`${activeTab === 1 ? 'block' : 'hidden'} transition-opacity duration-600`}>
                    <AllAssignments data={course} updateData={updateData} />
                </div>
                <div className={`${activeTab === 2 ? 'block' : 'hidden'} transition-opacity duration-600`}>
                    <LiveClass data={course} updateData={updateData} />
                </div>
                <div className={`${activeTab === 3 ? 'block' : 'hidden'} transition-opacity duration-600`}>
                    <ResourceTable data={course} updateData={updateData} />
                </div>
                <div className={`${activeTab === 4 ? 'block' : 'hidden'} transition-opacity duration-600`}>
                    <Students data={course}  reloadData={updateData}/>
                </div>
                <div className={`${activeTab === 5 ? 'block' : 'hidden'} transition-opacity duration-600`}>
                    <Present data={course}  reloadData={updateData}/>
                </div>
            </div>
        </div>
    );
};

export default CourseTab;
