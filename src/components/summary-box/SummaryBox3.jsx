import React, { useEffect, useState } from 'react'
import './summary-box.scss'
import Box from '../box/Box'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { colors } from '../../constants';
import { Firestore, addDoc, collection, collectionGroup, getDocs, serverTimestamp } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import { Link, useLocation } from 'react-router-dom'
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

const SummaryBox3 = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {

        await getDocs(collectionGroup(db, "OrderAttempt"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setProducts(newData);
            })

    }

    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <Link to={'products'}>
            <Box>
                <div className='summary-box'>
                    <div className="summary-box__info">
                        <div className="summary-box__info__title">
                            <div>Attempts</div>
                            <span>all Attempts</span>
                        </div>
                        <div className="summary-box__info__value">
                            {products?.length}
                        </div>
                    </div>
                    {/* <div className="summary-box__chart">
                        <CircularProgressbarWithChildren
                            value={70}
                            strokeWidth={10}
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


export default SummaryBox3


