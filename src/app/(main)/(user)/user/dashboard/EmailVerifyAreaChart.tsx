"use client"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getLast30DayMailVerifyData } from './actions';

interface EmailVerifyAreaChartProps {
    data: getLast30DayMailVerifyData[]
}

export default function EmailVerifyAreaChart({ data }: EmailVerifyAreaChartProps) {


    return (
        <div className=' w-full aspect-[10/5] md:aspect-[10/5] '>
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
                        <linearGradient id="colorApiUsage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#005ac9" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#005ac9" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorUndeliverable" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF5000" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#FF5000" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorDeliverable" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00c30d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#00c30d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="day" style={{ fontSize: '10px', fontWeight: '500' }} />
                    <YAxis style={{ fontSize: '12px', fontWeight: '500' }} />
                    <Tooltip contentStyle={{ fontSize: '16px', borderRadius: "10px", background: "white" }} />

                    <Area type="monotone" dataKey="deliverable" stroke="#00c30d" fill="url(#colorDeliverable)" />
                    <Area type="monotone" dataKey="unDeliverable" stroke="#FF5000" fill="url(#colorUndeliverable)" />
                    <Area type="monotone" dataKey="apiUsage" stroke="#005ac9" fill="url(#colorApiUsage)" />
                </AreaChart>
            </ResponsiveContainer>
        </div >
    )
}
