from flask import Flask
from db import engine, Base
from controllers.UsuarioController import usuario_bp
from controllers.DespesaController import despesa_bp
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
app.secret_key = "minha_chave_super_secreta"

Base.metadata.create_all(bind=engine)

app.register_blueprint(usuario_bp, url_prefix="/usuarios")
app.register_blueprint(despesa_bp, url_prefix="/despesas")

@app.route("/")
def home():
    return {"message": "API Financeiro rodando 🚀"}

if __name__ == "__main__":
    app.run(debug=True)