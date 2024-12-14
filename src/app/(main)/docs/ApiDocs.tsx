"use client"

import CommandCard from "@/components/api/CommandCard";
import { TerminalCodeBlock } from "@/components/api/TerminalBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import data from './CodeSnippetsData.json';

export default function ApiDocs() {

    const [activeLanguage, setActiveLanguage] = useState<"next" | "php">('next');

    const singleResult = `{
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
        }`

    const bulkResult = `{
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
        <div className=" py-10 space-y-2 ">
            <div className="  text-yellow-400 text-xs sm:text-sm flex text-start gap-3">
                <div className=" h-4 aspect-square">
                    <Info size={16} className="" />
                </div>
                <span>You can get your USER_ID from your dashboard Api Section.
                    <Link href={'/user/api'} className=" underline">Go now</Link>
                </span>
            </div>
            <div className="  text-yellow-400 text-xs sm:text-sm flex text-start gap-3">
                <div className=" h-4 aspect-square">
                    <Info size={16} className="" />
                </div>
                <span>
                    You can get your SECRET_ID from your dashboard Api. But Create will be decreased by 1 from which you use secret_key in your fetch request.
                    <Link href={'/user/api'} className=" underline">Go now</Link>
                </span>
            </div>

            <br />
            <Tabs className="" defaultValue="next">
                <TabsList className=" h-10 md:h-16 w-full">
                    <TabsTrigger
                        value="next"
                        onClick={() => setActiveLanguage("next")}
                    >
                        Next Js
                    </TabsTrigger>
                    <TabsTrigger
                        value="php"
                        onClick={() => setActiveLanguage("php")}
                    >
                        Php
                    </TabsTrigger>
                </TabsList>
                <TabsContent value={activeLanguage}>
                    <TerminalCodeBlock command={data.codeSnippets.next} />
                </TabsContent>
            </Tabs>

            <div className=" mt-12">
                <h2>Single Check Result</h2>
                <CommandCard command={singleResult} />
            </div>
            <div className=" mt-12">
                <h2>Bulk Check Result</h2>
                <CommandCard command={bulkResult} />
            </div>
        </div>
    )
}
