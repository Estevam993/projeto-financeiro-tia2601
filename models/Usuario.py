from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from db import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, nullable=False)

    despesas = relationship("Despesas", back_populates="usuario")

    def __repr__(self):
        return f"<Usuario(nome={self.nome})>"