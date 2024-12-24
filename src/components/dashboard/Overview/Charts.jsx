import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

const Charts = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { spaces, webspaces, webTrashes, codeTrashes } = useData();

    const data = [];

    if (spaces.length > 0) {
        data.push({ name: 'CodeSpaces', value: spaces.length, link: '/dashboard/space/list' });
    }
    if (webspaces.length > 0) {
        data.push({ name: 'WebSpaces', value: webspaces.length, link: '/dashboard/webspace/list' });
    }
    if (codeTrashes.length > 0) {
        data.push({ name: 'CodeTrashes', value: codeTrashes.length, link: '/dashboard/trash/codespace' });
    }
    if (webTrashes.length > 0) {
        data.push({ name: 'WebTrashes', value: webTrashes.length, link: '/dashboard/trash/webspace' });
    }
    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const renderActiveShape = (props) => {
        const {
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload
        } = props;

        return (
            <Link to={payload.link} >
                <g>
                    <text className="text-4xl font-extrabold text-center" x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill}>
                        {payload.value}<tspan className='text-lg font-medium' x={cx} dy="1.5em" fill='#373A3C'>{payload.name}</tspan>
                    </text>
                    <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill="#212121"
                    />
                    <Sector
                        cx={cx}
                        cy={cy}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        innerRadius={outerRadius + 6}
                        outerRadius={outerRadius + 10}
                        fill="#212121"
                    />
                </g>
            </Link>
        );
    };

    return (
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    fill="#212121"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default Charts;