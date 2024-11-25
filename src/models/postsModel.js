//configuração-ligação com o banco de dados mongodb atlas
import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConfig.js';

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts(){
  const db = conexao.db('imersao-instabytes');
  const colecao = db.collection('posts');
  return colecao.find().toArray();
};

export async function criarPost(novoPost){
  const db = conexao.db('imersao-instabytes');
  const colecao = db.collection('posts');
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, attPost){
  const db = conexao.db('imersao-instabytes');
  const colecao = db.collection('posts');
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:attPost});
}