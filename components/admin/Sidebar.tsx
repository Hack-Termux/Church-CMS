"use client";

import Link from "next/link";

export default function Sidebar(){

const menu = [
["Dashboard","/admin"],
["Profile","/admin/profile"],
["Hero","/admin/settings/hero"],
["About","/admin/settings/about"],
["Ministries","/admin/ministries"],
["Events","/admin/events"],
["Sermons","/admin/sermons"],
["Announcements","/admin/announcements"],
["Gallery","/admin/gallery"],
["Prayer Requests","/admin/prayer"],
["Contact","/admin/settings/contact"],
["Footer","/admin/settings/footer"]
];


return(
<aside className="w-64 min-h-screen bg-blue-900 text-white p-6">

<h1 className="text-2xl font-bold mb-8">
Church CMS
</h1>

<nav className="space-y-3">

{menu.map((item)=>(

<Link
key={item[1]}
href={item[1]}
className="block px-4 py-3 rounded hover:bg-blue-800"
>
{item[0]}
</Link>

))}

</nav>

</aside>
);

}
