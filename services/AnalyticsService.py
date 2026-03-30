from sklearn.linear_model import LinearRegression
import numpy as np
from datetime import date
import calendar


meses = np.array([[1],[2],[3],[4]])
totais = np.array([1800,2300,1950,2100])

model = LinearRegression()
model.fit(meses, totais)

previsao_mes_5 = model.predict([[5]])

def media_diaria(total_gasto_mes, limite):
    dias_no_mes = calendar.monthrange(date.today().year, date.today().month)[1]

    media_diaria = total_gasto_mes / date.today().day
    previsao_final = media_diaria * dias_no_mes

    return {
        "media_diaria": round(media_diaria, 2),
        "previsao_final": round(previsao_final, 2),
        "vai_estourar": previsao_final > limite
    }

print(media_diaria(1200, 3000))
