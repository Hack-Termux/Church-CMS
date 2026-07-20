"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";


export default function Login(){

const router = useRouter();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");


async function login(){

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

router.push("/admin");

}catch(error){

if(error instanceof Error){
alert(error.message);
}else{
alert("Login failed");
}

}

}


return(

<main className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

<h1 className="text-2xl font-bold mb-6">
Admin Login
</h1>


<input
className="w-full border p-3 mb-4"
placeholder="Email"
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>


<input
className="w-full border p-3 mb-4"
placeholder="Password"
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>


<button
onClick={login}
className="w-full bg-blue-700 text-white p-3 rounded"
>
Login
</button>


</div>

</main>

);

}
