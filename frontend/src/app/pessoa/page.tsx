"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [pessoa, setPessoa] = useState<any>({})
  const [pessoas, setPessoas] = useState<any>([])

  useEffect(() => {
    obterFilmes()
  }, [])

  async function obterFilmes(){
    const resp = await fetch("http://localhost:3003/pessoa")
    const filmes = await resp.json()
    setPessoas(filmes)
  }

  async function criarFilme() {
    await fetch('http://localhost:3003/pessoa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pessoa),
    })
    setPessoa({})
    await obterFilmes()
  }

  async function alterarFilme() {
    await fetch('http://localhost:3003/pessoa/' + pessoa.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pessoa),
    })
    setPessoa({})
    await obterFilmes()
  }

  async function excluirFilme(id: any) {
    await fetch('http://localhost:3003/pessoa/' + id, {
      method: 'DELETE'
    })
    await obterFilmes()
  }

  async function obterFilmePorId(id: any) {
    const resp = await fetch("http://localhost:3003/pessoa/" + id)
    const filme = await resp.json()
    setPessoa(filme)
  }

  function renderizarFormFilme(){
    return(
      <div className="flex gap-5 items-end">
        <div className="flex flex-col">
          <label htmlFor="nome">Nome da Pessoa</label>

          <input
            id="nome"
            type="text"
            placeholder="Nome da Pessoa"
            value={pessoa.nome}
            onChange={e => setPessoa({...pessoa, nome: e.target.value})}
            className="rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="desc">Está na Escola?</label>

          <input
            id="desc"
            type="text"
            placeholder="Responda com Sim ou Não"
            value={pessoa.descricao}
            onChange={e => setPessoa({...pessoa, escola: e.target.value})}
            className="rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="desc">Idade da Pessoa</label>

          <input
            id="desc"
            type="number"
            placeholder="Idade da Pessoa"
            value={pessoa.idade}
            onChange={e => setPessoa({...pessoa, idade: Number(e.target.value)})}
            className="rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
          />
        </div>

        <div className="flex flex-col">
          {pessoa.id ? (
            <button className="bg-blue-600 p-2 rounded-md outline-none" onClick={alterarFilme}>Alterar Pessoa</button>
          ) : (
            <button className="bg-blue-600 p-2 rounded-md outline-none" onClick={criarFilme}>Cadastrar Pessoa</button>
          )}
        </div>
      </div>
    )
  }

  function renderizarFilme(){
    return(
      <div className="flex flex-col gap-2">
        {pessoas.map((pessoa: any) => (
          <div key={pessoa.id} className="flex items-center justify-between gap-10 bg-slate-800 p-2 rounded-md">
            <div>{pessoa.nome}</div>
            <div>Idade: {pessoa.idade}</div>
            <div className="flex gap-1">
              <button
                onClick={() => obterFilmePorId(pessoa.id)}
                className="bg-green-500 p-2 rounded-md"
              >
                Alt.
              </button>

              <button
                onClick={() => excluirFilme(pessoa.id)}
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