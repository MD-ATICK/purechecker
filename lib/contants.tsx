import { Cable, CircleDollarSign, Cog, FileClock, LayoutGrid, Mails, PackageCheck } from 'lucide-react'

export const navRoutes = [
    {
        label : 'Home',
        href : '/'
    },
    {
        label : 'Pricing',
        href : '/pricing'
    },
    {
        label : 'Contact Us',
        href : '/contact-us'
    },
    {
        label : 'Docs',
        href : '/docs'
    },
    {
        label : 'Blog',
        href : '/blog'
    },
    {
        label : 'FAQ',
        href : '/faq'
    },
    {
        label : 'Test',
        href : '/test'
    },
]


export const userDashboardRoutes = [
    {
        href : '/user/dashboard',
        label : 'Dashboard',
        icon : <LayoutGrid />
    },
    {
        href : '/user/verify-emails',
        label : 'Verify Emails',
        icon : <Mails />
    },
    {
        href : '/user/orders',
        label : 'Orders',
        icon : <PackageCheck />
    },
    {
        href : '/user/credit-history',
        label : 'Credit History',
        icon : <FileClock />
    },
    {
        href : '/user/pricing',
        label : 'Pricing',
        icon : <CircleDollarSign />
    },
    {
        href : '/user/api',
        label : 'Api',
        icon : <Cable />
    },
    {
        href : '/user/settings',
        label : 'Settings',
        icon : <Cog />
    },

]


export const acceptedTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel', // .xls
    'text/csv', // .csv
  ];