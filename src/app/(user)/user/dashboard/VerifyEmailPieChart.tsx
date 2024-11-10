"use client"
import { useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Sector, SectorProps } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { ActiveShape } from 'recharts/types/util/types';


export default function VerifyEmailPieChart({ data }: { data?: { name : string, value : number }[] }) {

    const [activeIndex, setActiveIndex] = useState(0);



    return (
        <div>

{/* FOR MOBILE SCREEN */}
        <div className=' w-full aspect-square md:hidden '>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={RenderActiveShape as unknown as ActiveShape<PieSectorDataItem>}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={100}
                        outerRadius={120}
                        fill="#006aec"
                        dataKey="value"
                        onMouseEnter={(data, index) => setActiveIndex(index)}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
        {/*   FOR DESKTOP SCREEN */}
        <div className=' hidden md:block w-full aspect-[10/5] '>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={RenderActiveShape as unknown as ActiveShape<PieSectorDataItem>}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={130}
                        outerRadius={160}
                        fill="#006aec"
                        dataKey="value"
                        onMouseEnter={(data, index) => setActiveIndex(index)}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
        </div>
    );
}

interface ActiveShapeProps extends SectorProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload: { name: string };
    percent: number;
    value: number;
}

const RenderActiveShape = (props: ActiveShapeProps): JSX.Element => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};
