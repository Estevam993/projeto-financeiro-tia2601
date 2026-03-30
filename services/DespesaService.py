from repositories.DespesaRepo import DespesaRepo


class DespesaService:
    def __init__(self, session):
        self.session = session

    @staticmethod
    def criar_despesa(valor, tipo, descricao, user_id):
        despesa = DespesaRepo.criar_despesa(valor, tipo, descricao, user_id)

        return despesa

    @staticmethod
    def get_despesa(user_id):
        despesas = DespesaRepo.procurar_despesa(user_id)

        despesas_dict = {
            "total": 0,
            "despesas": [d.to_dict() for d in despesas],
            "valores": {}
        }

        for despesa in despesas:
            if despesa.tipo not in despesas_dict["valores"]:
                despesas_dict["valores"][despesa.tipo] = despesa.valor

            despesas_dict["valores"][despesa.tipo] += despesa.valor

            despesas_dict["total"] = despesa.valor + despesas_dict["total"]

        return despesas_dict
