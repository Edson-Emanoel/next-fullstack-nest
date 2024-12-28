import Link from "next/link";

export default function Navbar() {
  return (
    <header className="text-white bg-slate-950">
      <ul className="px-2 gap-5 flex items-center h-[60px]">
            <li>
                  <Link href="/">Produtos</Link>
            </li>
            <li>
                  <Link href="/categoria">Categorias</Link>
            </li>
            <li>
                  <Link href="/filme">Filmes</Link>
            </li>
            <li>
                  <Link href="/pessoa">Pessoas</Link>
            </li>
      </ul>
    </header>
  )
}