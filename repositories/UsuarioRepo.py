from db import SessionLocal
from sqlalchemy import select
from models.Usuario import Usuario

class UsuarioRepo():
    def __init__(self):
        return

    @staticmethod
    def criar_usuario(nome, email):
        with SessionLocal() as session:
            usuario = Usuario(nome=nome, email=email)
            session.add(usuario)
            session.commit()
            session.refresh(usuario)
            return usuario

    @staticmethod
    def listar_usuarios():
        with SessionLocal() as session:
            return session.query(Usuario).all()

    @staticmethod
    def procurar_usuario(email):
        with SessionLocal() as session:
            stmt = select(Usuario).where(Usuario.email == email)
            return session.execute(stmt).scalars().first()