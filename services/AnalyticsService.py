from sklearn.linear_model import LinearRegression
import numpy as np
from datetime import date, datetime
import calendar
from repositories.DespesaRepo import DespesaRepo
from collections import defaultdict


def agrupar_por_mes(despesas):
    """
    Agrupa uma lista de despesas por ano e mês, somando seus valores.

    Args:
        despesas (list): Lista de objetos de despesa que possuem
            os atributos `date` (datetime.date) e `valor` (float).

    Returns:
        dict: Um dicionário onde a chave é uma tupla (ano, mês)
        e o valor é o total gasto naquele período.
        Exemplo: {(2026, 4): 821.3}
    """
    totais_por_mes = defaultdict(float)

    for d in despesas:
        data = d.date

        chave = (data.year, data.month)
        totais_por_mes[chave] += d.valor

    return totais_por_mes


def preparar_dados_regressao(totais_por_mes):
    """
        Prepara os dados agrupados por mês para uso em um modelo de regressão linear.

        Converte o dicionário de totais mensais em arrays NumPy ordenados
        cronologicamente, onde:
        - X representa a sequência temporal dos meses
        - y representa os valores totais gastos em cada mês

        Args:
            totais_por_mes (dict): Dicionário no formato {(ano, mês): total}.

        Returns:
            tuple:
                - np.ndarray: Array 2D com os índices dos meses (X).
                - np.ndarray: Array 1D com os totais mensais (y).
        """
    meses = []
    valores = []

    itens_ordenados = sorted(totais_por_mes.items())

    for i, ((ano, mes), total) in enumerate(itens_ordenados, start=1):
        meses.append([i])
        valores.append(total)

    return np.array(meses), np.array(valores)


def prever_por_regressao(user_id):
    """
       Realiza uma previsão de gastos futuros utilizando regressão linear
       com base no histórico de despesas do usuário.

       O modelo é treinado com os totais mensais e projeta o valor
       para o próximo período.

       Args:
           user_id (int): Identificador do usuário.

       Returns:
           float | None: Valor previsto para o próximo mês.
           Retorna None caso não haja dados suficientes para treinar o modelo.
       """
    despesas = DespesaRepo.procurar_despesa(user_id)

    if len(despesas) < 3:
        return None

    totais_por_mes = agrupar_por_mes(despesas)
    X, y = preparar_dados_regressao(totais_por_mes)

    model = LinearRegression()
    model.fit(X, y)

    proximo_mes = [[len(X) + 1]]
    previsao = model.predict(proximo_mes)[0]

    return previsao


def media_diaria(total_gasto_mes, limite, user_id):
    """
        Calcula métricas financeiras baseadas no gasto atual do mês e
        combina com uma previsão baseada em regressão linear.

        As métricas incluem:
        - Média diária de gastos
        - Projeção linear para o final do mês
        - Previsão baseada em histórico (regressão)
        - Previsão final combinada
        - Indicador se o limite será ultrapassado

        Args:
            total_gasto_mes (float): Total gasto até o momento no mês atual.
            limite (float): Limite financeiro definido pelo usuário.
            user_id (int): Identificador do usuário.

        Returns:
            dict: Dicionário contendo:
                - media_diaria (float)
                - previsao_linear (float)
                - previsao_modelo (float)
                - previsao_final (float)
                - vai_estourar (bool)
        """
    hoje = date.today()
    dias_no_mes = calendar.monthrange(hoje.year, hoje.month)[1]

    media_diaria = total_gasto_mes / hoje.day
    previsao_linear = media_diaria * dias_no_mes

    previsao_modelo = prever_por_regressao(user_id)

    return {
        "media_diaria": round(media_diaria, 2),
        "previsao_linear": round(previsao_linear, 2),
        "previsao_modelo": round(previsao_modelo, 2),
        "previsao_final": round((previsao_linear + previsao_modelo) / 2, 2),
        "vai_estourar": bool(((previsao_linear + previsao_modelo) / 2) > limite)
    }


class AnalyticsService:
    def __init__(self, session):
        self.session = session

    @staticmethod
    def get_monthly_expend(user_id, limite):
        despesas = DespesaRepo.procurar_despesas_mensais(user_id)

        despesas_dict = {
            "total": 0,
            "despesas": [d.to_dict() for d in despesas],
            "valores": {}
        }

        for despesa in despesas:
            if despesa.tipo not in despesas_dict["valores"]:
                despesas_dict["valores"][despesa.tipo] = despesa.valor
            else:
                despesas_dict["valores"][despesa.tipo] += despesa.valor

            despesas_dict["total"] = despesa.valor + despesas_dict["total"]

        return media_diaria(despesas_dict["total"], limite, user_id), [d.to_dict() for d in despesas]
