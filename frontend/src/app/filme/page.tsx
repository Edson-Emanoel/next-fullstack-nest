"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [filme, setFilme] = useState<any>({})
  const [filmes, setFilmes] = useState<any>([])

  useEffect(() => {
    obterFilmes()
  }, [])

  async function obterFilmes(){
    const resp = await fetch("http://localhost:3003/filme")
    const filmes = await resp.json()
    setFilmes(filmes)
  }

  async function criarFilme() {
    await fetch('http://localhost:3003/filme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filme),
    })
    setFilme({})
    await obterFilmes()
  }

  async function alterarFilme() {
    await fetch('http://localhost:3003/filme/' + filme.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filme),
    })
    setFilme({})
    await obterFilmes()
  }

  async function excluirFilme(id: any) {
    await fetch('http://localhost:3003/filme/' + id, {
      method: 'DELETE'
    })
    await obterFilmes()
  }

  async function obterFilmePorId(id: any) {
    const resp = await fetch("http://localhost:3003/filme/" + id)
    const filme = await resp.json()
    setFilme(filme)
  }

  function renderizarFormFilme(){
    return(
      <div className="flex gap-5 items-end">
        <div className="flex flex-col">
          <label htmlFor="nome">Nome da Pessoa</label>

          <input
            id="nome"
            type="text"
            placeholder="Nome do Filme"
            value={filme.titulo}
            onChange={e => setFilme({...filme, titulo: e.target.value})}
            className="rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="desc">Descrição do Filme</label>

          <input
            id="desc"
            type="text"
            placeholder="Descrição do Filme"
            value={filme.descricao}
            onChange={e => setFilme({...filme, descricao: e.target.value})}
            className="rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="desc">Duração do Filme</label>

          <input
            id="desc"
            type="number"
            placeholder="Em minutos"
            value={filme.duração_minutos}
            onChange={e => setFilme({...filme, duração_minutos: Number(e.target.value)})}
            className="rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
          />
        </div>

        <div className="flex flex-col">
          {filme.id ? (
            <button className="bg-blue-600 p-2 rounded-md outline-none" onClick={alterarFilme}>Alterar Filme</button>
          ) : (
            <button className="bg-blue-600 p-2 rounded-md outline-none" onClick={criarFilme}>Cadastrar Filme</button>
          )}
        </div>
      </div>
    )
  }

  function renderizarFilme(){
    return(
      <div className="flex flex-col gap-2">
        {filmes.map((filme: any) => (
          <div key={filme.id} className="flex items-center gap-10 bg-slate-800 p-2 rounded-md">
            <div>{filme.titulo}</div>
            <div>{filme.duração_minutos} min</div>
            <div className="flex gap-1">
              <button
                onClick={() => obterFilmePorId(filme.id)}
                className="bg-green-500 p-2 rounded-md"
              >
                Alt.
              </button>

              <button
                onClick={() => excluirFilme(filme.id)}
                className="bg-red-500 p-2 rounded-md"
              >
                Exc.
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return(
    <div className="gap-10 flex flex-col items-center justify-center h-screen text-white">
      {renderizarFormFilme()}
      {renderizarFilme()}
    </div>
  )
}