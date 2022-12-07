import React, {useState} from 'react'
//import { useNavigate, Link, createRoutesFromElements } from 'react-router-dom'
import Header from './Header'
import './../../css/AdminStyle.css'
import {IconButton, Stack } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function Reportboard(props) {
    //const navigate = useNavigate();

    const column = ['ID', 'Writer', 'Restaurant', 'Date', 'Contents', 'Processed']
    const dataset = [
        {
            id: 1,
            writer: '홍길동',
            restaurant: '필동함박',
            date: '2022-12-01',
            contents: '위생상태점검요',
            processed: 0
        },
        {
            id: 2,
            writer: '김대한',
            restaurant: '필동함박',
            date: '2022-12-02',
            contents: '위생상태점검요',
            processed: 0
        },
        {
            id: 3,
            writer: '황민국',
            restaurant: '이삭토스트',
            date: '2022-12-03',
            contents: '위생상태점검요',
            processed: 0
        },
        {
            id: 4,
            writer: '양만세',
            restaurant: '필동면옥',
            date: '2022-12-04',
            contents: '위생상태점검요',
            processed: 0
        }
    ]
    const [data, setData] = useState(dataset);

    return (
        <>
            <Header isManager={true} />
            <div className="box">
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                {column.map((col)=> (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(({id, writer, restaurant, date, contents, processed}, idx) => (
                                <tr key={writer}>
                                    <td width="80px">{id}</td>
                                    <td width="80px">{writer}</td>
                                    <td width="100px">{restaurant}</td>
                                    <td width="180px">{date}</td>
                                    <td width="180px">{contents}</td>
                                    <td width="80px">{processed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>        
        </>
    )
}
export default Reportboard;