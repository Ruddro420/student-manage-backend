import { useState } from 'react';
import LiveClass from '../Recording/LiveClass';
import Module from './Module';
import AllAssignments from './AllAssignments';
import ResourceTable from "../../components/Table/ResourceTable"; 
import data from '../../../data/module.json'
import Students from '../Students/Students';

// eslint-disable-next-line react/prop-types
const CourseTab = ({course}) => {
    const [activeTab, setActiveTab] = useState(0);
    /* const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); */

    // Get module data
    /* useEffect(() => {
        axios.get('../../../data/module.json')
            .then(function (response) {
                setData(response.data);
                setLoading(false); 
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false); 
            });
    }, []); */

    return (
        <div>
            
            <div className="rounded-xl dark:text-white p-1 mb-3 max-w-md overflow-hidden">
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
                            className={`inline-flex cursor-pointer items-center gap-2 rounded border px-3 py-2 hover:shadow ${activeTab === 3 ? 'tab-color shadow' : ''}`}>
                            রিসোর্স
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => setActiveTab(4)}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded border px-3 py-2 hover:shadow ${activeTab === 4 ? 'tab-color shadow' : ''}`}>
                            স্টুডেন্টস
                        </a>
                    </li>
                </ul>
            </div>
            <div className="py-3">
                <div className={`${activeTab === 0 ? 'block' : 'hidden'} transition-opacity duration-600`}>
                    <Module data={course} />
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
                <div className={`${activeTab === 4 ? 'block' : 'hidden'} transition-opacity duration-600`}>
                    <Students data={data} />
                </div>
            </div>
        </div>
    );
};

export default CourseTab;
