'use client'

import {useContext} from "react";
import {GlobalContext} from "@/context";

export default function Home() {

    const {isAuthUser} = useContext(GlobalContext)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Hello</h1>
        </main>
    );
}