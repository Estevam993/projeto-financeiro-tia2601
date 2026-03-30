from sqlalchemy import select

from db import SessionLocal
from models.Despesas import Despesas
from datetime import date

from models.Usuario import Usuario


class DespesaRepo:
    def __init__(self):
        return

    @staticmethod
    def criar_despesa(valor, tipo, descricao, user_id):
        with SessionLocal() as session:
            usuario = session.get(Usuario, user_id)

            if not usuario:
                return "Usuário não encontrado"

            despesa = Despesas(
                valor=valor,
                tipo=tipo,
                descricao=descricao,
                date=date.today(),
                usuario=usuario
            )

            session.add(despesa)
            session.commit()
            session.refresh(despesa)

            return despesa

    @staticmethod
    def listar_despesas():
        with SessionLocal() as session:
            return session.query(Despesas).all()

    @staticmethod
    def procurar_despesa(user_id):
        with SessionLocal() as session:
            stmt = select(Despesas).where(Despesas.user_id == user_id)
            return session.execute(stmt).scalars().all()