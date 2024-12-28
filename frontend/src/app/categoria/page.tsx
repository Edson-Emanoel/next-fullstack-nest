"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [categoria, setCategoria] = useState<any>({})
  const [categorias, setCategorias] = useState<any>([])

  useEffect(() => {
    obterCategorias()
  }, [])

  async function obterCategorias(){
    const resp = await fetch("http://localhost:3003/categoria")
    const categorias = await resp.json()
    setCategorias(categorias)
  }

  async function criarCategoria() {
    await fetch('http://localhost:3003/categoria', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoria),
    })
    setCategoria({})
    await obterCategorias()
  }

  async function alterarCategoria() {
    await fetch('http://localhost:3003/categoria/' + categoria.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoria),
    })
    setCategoria({})
    await obterCategorias()
  }

  async function excluirCategoria(id: any) {
    await fetch('http://localhost:3003/categoria/' + id, {
      method: 'DELETE'
    })
    await obterCategorias()
  }

  async function obterCategoriaPorId(id: any) {
    const resp = await fetch("http://localhost:3003/categoria/" + id)
    const categoria = await resp.json()
    setCategoria(categoria)
  }

  function renderizarFormCategoria(){
    return(
      <div className="flex gap-5 items-end">
        <div className="flex flex-col">
          <label htmlFor="nome">Nome da Categoria</label>

          <input
            id="nome"
            type="text"
            placeholder="Nome da Categoria"
            value={categoria.nome}
            onChange={e => setCategoria({...categoria, nome: e.target.value})}
            className="rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="desc">Descrição da Categoria</label>

          <input
            id="desc"
            type="text"
            placeholder="Descrição da Categoria"
            value={categoria.descricao}
            onChange={e => setCategoria({...categoria, descricao: e.target.value})}
            className="rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
          />
        </div>

        <div className="flex flex-col">
          {categoria.id ? (
            <button className="bg-blue-600 p-2 rounded-md outline-none" onClick={alterarCategoria}>Alterar Categoria</button>
          ) : (
            <button className="bg-blue-600 p-2 rounded-md outline-none" onClick={criarCategoria}>Cadastrar Categoria</button>
          )}
        </div>
      </div>
    )
  }

  function renderizarCategorias(){
    return(
      <div className="flex flex-col gap-2">
        {categorias.map((categoria: any) => (
          <div key={categoria.id} className="flex items-center gap-10 bg-slate-800 p-2 rounded-md">
            <div>{categoria.nome}</div>
            <div>{categoria.preco}</div>
            <div className="flex gap-1">
              <button
                onClick={() => obterCategoriaPorId(categoria.id)}
                className="bg-green-500 p-2 rounded-md"
              >
                  Alt.
              </button>

              <button
                onClick={() => excluirCategoria(categoria.id)}
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
      {renderizarFormCategoria()}
      {renderizarCategorias()}
    </div>
  )
}