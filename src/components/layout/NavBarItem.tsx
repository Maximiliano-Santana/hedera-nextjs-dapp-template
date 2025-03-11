import Link from "next/link";
import { ReactNode } from 'react';

type Props = {
    children: ReactNode,
    path: string,
    className?: string
}

export default function NavbarItem({children, path, className}: Props) {
    return <>
        <li>
            <Link className={`p-4 transition-all hover:outline-2 hover:outline-white hover:text-black hover:bg-white ${className}`} href={path}>{children}</Link>
        </li>
    </>
}