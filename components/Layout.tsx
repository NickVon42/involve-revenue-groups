import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Layout({ children }: { children: JSX.Element }) {
	const router = useRouter()

	return (
		<>
			<nav className="bg-white border-gray-200 px-2  py-2.5 rounded dark:bg-gray-800 ml-9 mt-2">
				<div className="container flex flex-wrap justify-between items-center ">
					<ul className="flex flex-row space-x-8 mt-0 text-sm font-medium">
						<li className={router.pathname == "/" ? "nav-active" : "nav"}>
							<Link href="/" aria-current="page">
								Create
							</Link>
						</li>
						<li
							className={
								router.pathname == "/browse" ? "nav-active" : "nav"
							}
						>
							<Link href="/browse">Browse</Link>
						</li>
					</ul>
				</div>
			</nav>
			<Head>
				<title>Involve Revenue Group</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<main>{children}</main>
		</>
	)
}
