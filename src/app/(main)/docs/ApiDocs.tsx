"use client"

import { TerminalCodeBlock } from "@/components/api/TerminalBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import data from './CodeSnippetsData.json';

export default function ApiDocs() {

    const [activeLanguage, setActiveLanguage] = useState<"next" | "react" | "vue" | "python">('next');

    const result = `   {
    results : [
         {
            "id": "603d9e8bfc13ae1f7c000001",
            "email": "example1@gmail.com",
            "domain": "gmail.com",
            "reason": "Valid Email",
            "isExist": true,
            "isDisposable": false,
            "isValidSyntax": true,
            "isValidDomain": true,
            "riskLevel": "Low",
            "isDisable": false,
            "is2FA": true,
            "mxRecords": [
                {
                    "priority": 10,
                    "host": "smtp.gmail.com"
                }
            ],
            "userId": "603d9e8bfc13ae1f7c000002",
            "apiTokenId": "603d9e8bfc13ae1f7c000003",
            "createdAt": "2024-11-30T10:00:00.000Z"
        }
      ]
    }`



    return (
        <div className=" py-10 ">

            <Tabs className="" defaultValue="next">
                <TabsList>
                    <TabsTrigger
                        value="next"
                        onClick={() => setActiveLanguage("next")}
                    >
                        Next Js</TabsTrigger>
                    <TabsTrigger
                        value="react"
                        onClick={() => setActiveLanguage("react")}
                    >
                        React Js</TabsTrigger>
                    <TabsTrigger
                        value="vue"
                        onClick={() => setActiveLanguage("vue")}
                    >
                        Vue Js</TabsTrigger>
                    <TabsTrigger
                        value="python"
                        onClick={() => setActiveLanguage("python")}
                    >
                        Python</TabsTrigger>
                </TabsList>
                <TabsContent value={activeLanguage}>
                    {
                        activeLanguage === "python" &&
                        <TerminalCodeBlock command={"pip install requests"} />
                    }
                    {
                        activeLanguage === "react" &&
                        <TerminalCodeBlock command={"npm install axios"} />
                    }
                    <TerminalCodeBlock command={data.codeSnippets[activeLanguage] || 'npm run dev'} />
                </TabsContent>
            </Tabs>
            <div className=" flex text-sm text-yellow-400 items-center gap-4">
                <Info size={18} />
                <p>You can get your USER_ID from your dashboard Api Section. <Link href={'/user/api'} className=" underline">Go now</Link></p>
            </div>
            <div className=" flex text-sm text-yellow-400 items-center gap-4">
                <Info size={18} />
                <p>You can get your SECRET_ID from your dashboard Api. But Create will be decreased by 1 from which you use secret_key in your fetch request. <Link href={'/user/api'} className=" underline">Go now</Link></p>
            </div>
            <div className=" mt-12">
                <h1>Request Result</h1>
                <TerminalCodeBlock command={result} />
            </div>
        </div>
    )
}
