import React, { useEffect, useState } from 'react'
import './summary-box.scss'
import Box from '../box/Box'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { colors } from '../../constants'
import { Line } from 'react-chartjs-2';
import { Link, useLocation } from 'react-router-dom'
import { Firestore, addDoc, collection, collectionGroup, getDocs } from 'firebase/firestore';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { db } from '../../firebase'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const SummaryBox1 = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {

        await getDocs(collectionGroup(db, "Payments"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setUsers(newData);
                console.log(newData);
            })

    }

    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <Link to={'orders'}>
            <Box>
                <div className='summary-box'>
                    <div className="summary-box__info">
                        <div className="summary-box__info__title">
                            <div>Payments</div>
                            <span>All Orders</span>
                        </div>
                        <div className="summary-box__info__value">
                            {users?.length}
                        </div>
                    </div>
                    {/* <div className="summary-box__chart">
                        <CircularProgressbarWithChildren
                            value={70}
                            strokeWidth={5}
                            styles={buildStyles({
                                pathColor: 30 < 50 ? colors.red : colors.purple,
                                trailColor: 'transparent',
                                strokeLinecap: 'round'
                            })}
                        >
                            <div className="summary-box__chart__value">
                                {30}%
                            </div>
                        </CircularProgressbarWithChildren>
                    </div> */}
                </div>
            </Box>
        </Link>
    )
}


export default SummaryBox1


