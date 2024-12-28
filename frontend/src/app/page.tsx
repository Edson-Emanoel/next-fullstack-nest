"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [produto, setProduto] = useState<any>({})
  const [produtos, setProdutos] = useState<any>([])

  useEffect(() => {
    obterProdutos()
  }, [])

  async function obterProdutos(){
    const resp = await fetch("http://localhost:3003/produtos")
    const produtos = await resp.json()
    setProdutos(produtos)
  }

  async function criarProduto() {
    await fetch('http://localhost:3003/produtos', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    })
    setProduto({})
    await obterProdutos()
  }

  async function alterarProduto() {
    await fetch('http://localhost:3003/produtos/' + produto.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    })
    setProduto({})
    await obterProdutos()
  }

  async function excluirProduto(id: any) {
    await fetch('http://localhost:3003/produtos/' + id, {
      method: 'DELETE'
    })
    await obterProdutos()
  }

  async function obterProdutoPorId(id: any) {
    const resp = await fetch("http://localhost:3003/produtos/" + id)
    const produto = await resp.json()
    setProduto(produto)
  }

  function renderizarFormProdutos(){
    return(
      <div className="flex gap-5 items-end">
        <div className="flex flex-col">
          <label htmlFor="nome">Nome do Produto</label>

          <input
            id="nome"
            type="text"
            placeholder="Nome do Produto"
            value={produto.nome}
            onChange={e => setProduto({...produto, nome: e.target.value})}
            className="rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="desc">Descrição</label>

          <input
            id="desc"
            type="text"
            placeholder="Descrição do Produto"
            value={produto.descricao}
            onChange={e => setProduto({...produto, descricao: e.target.value})}
            className="rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="preco">Preço</label>

          <input
              id="preco"
              type="number"
              value={produto.preco ?? ''}
              onChange={(e) => setProduto({ ...produto, preco: + e.target.value })}
              className="bg-slate-800 h-[35px] p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          {produto.id ? (
            <button className="bg-blue-600 p-2 rounded-md outline-none" onClick={alterarProduto}>Alterar Produto</button>
          ) : (
            <button className="bg-blue-600 p-2 rounded-md outline-none" onClick={criarProduto}>Cadastrar Produto</button>
          )}
        </div>
      </div>
    )
  }

  function renderizarProdutos(){
    return(
      <div className="flex flex-col gap-2">

        {produtos.map((produto: any) => (
          <div key={produto.id} className="flex items-center gap-10 bg-slate-800 p-2 rounded-md">
            <div>{produto.nome}</div>
            <div>{produto.preco}</div>
            <div className="flex gap-1">
              <button
                onClick={() => obterProdutoPorId(produto.id)}
                className="bg-green-500 p-2 rounded-md"
              >
                  Alt.
              </button>

              <button
                onClick={() => excluirProduto(produto.id)}
                className="bg-red-500 p-2 rounded-md"
              >
                  Excl.
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return(
    <div className="gap-10 flex flex-col items-center justify-center h-screen text-white">
      {renderizarFormProdutos()}
      {renderizarProdutos()}
    </div>
  )
}