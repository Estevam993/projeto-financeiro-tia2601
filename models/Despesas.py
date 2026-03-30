from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship

from db import Base

class Despesas(Base):
    __tablename__ = "despesas"

    id = Column(Integer, primary_key=True, index=True)
    valor = Column(Float, nullable=False)
    tipo = Column(String, nullable=False)
    descricao = Column(String, nullable=False)
    date = Column(Date, nullable=False)

    user_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)

    usuario = relationship("Usuario", back_populates="despesas")

    def __repr__(self):
        return f"<Despesas(descricao={self.descricao}, valor={self.valor})>"

    def to_dict(self):
        return {
            "id": self.id,
            "valor": self.valor,
            "descricao": self.descricao,
            "tipo": self.tipo,
            "user_id": self.user_id,
            "date": str(self.date)
        }