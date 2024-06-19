import { useEffect, useState } from 'react';
import LiveClass from '../Recording/LiveClass';
import Module from './Module';
import axios from 'axios';
import AllAssignments from './AllAssignments';
import ResourceTable from "../../components/Table/ResourceTable";

const CourseTab = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [data, setData] = useState([])
    // get module data
    useEffect(() => {
        axios.get('../../../data/module.json')
            .then(function (response) {
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })

    }, [])

    return (
        <div>
            <div className="overflow-hidden rounded-xl p-1 mb-3">
                <ul className="flex items-center gap-2 text-sm font-medium">
                    <li>
                        <a
                            onClick={() => setActiveTab(0)}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded px-3 py-2 hover:shadow border ${activeTab === 0 ? 'tab-color shadow' : ''}`}>
                            মডিউলসমূহ
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => setActiveTab(1)}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded px-3 py-2 hover:shadow border ${activeTab === 1 ? 'tab-color shadow' : ''}`}>

                            এসাইনমেন্ট
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => setActiveTab(2)}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded border px-3 py-2 hover:shadow ${activeTab === 2 ? 'tab-color shadow' : ''}`}>
                            রেকডিং
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => setActiveTab(3)}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded border px-3 py-2  hover:shadow ${activeTab === 3 ? 'tab-color shadow' : ''}`}>
                            রিসোর্স
                        </a>
                    </li>
                </ul>
            </div>
            <div className="py-3">
                <div className={`${activeTab === 0 ? 'block' : 'hidden'} transition-opacity duration-600`}>
                    <Module />
                </div>
                <div className={`${activeTab === 1 ? 'block' : 'hidden'} transition-opacity duration-600`}>
                    <AllAssignments data={data} />
                </div>
                <div className={`${activeTab === 2 ? 'block' : 'hidden'} transition-opacity duration-600`}>
                    <LiveClass data={data} />
                </div>
                <div className={`${activeTab === 3 ? 'block' : 'hidden'} transition-opacity duration-600`}>
                    <ResourceTable data={data} />
                </div>
            </div>
        </div>
    );
};

export default CourseTab;
