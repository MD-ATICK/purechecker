"use client"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { last14DaysDataProps } from './actions';

interface UserAreaChartProps {
    data: last14DaysDataProps[]
}

export default function UserAreaChart({ data }: UserAreaChartProps) {

    return (
        <div className=' w-full aspect-[10/5] md:aspect-[10/3] '>
            <ResponsiveContainer width="100%" style={{}} height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    className=''
                    data={data}
                    margin={{
                        top: 5,
                        right: 5,
                        left: -35,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <defs>
                        {/* Gradient for uv */}
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#005ac9" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#005ac9" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="Day" style={{ fontSize: '10px', fontWeight: '500' }} />
                    <YAxis style={{ fontSize: '12px', fontWeight: '500' }} />
                    <Tooltip contentStyle={{ fontSize: '16px', borderRadius: "10px", background: "black" }} />

                    <Area type="monotone" dataKey="Users" stroke="#005ac9" fill="url(#colorCount)" />
                </AreaChart>
            </ResponsiveContainer>
        </div >
    )
}
