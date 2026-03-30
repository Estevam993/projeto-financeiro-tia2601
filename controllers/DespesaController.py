from flask import Blueprint, request, jsonify, session
from db import SessionLocal
from services.DespesaService import DespesaService

despesa_bp = Blueprint("despesas", __name__)


@despesa_bp.route("/", methods=["POST"])
def criar_despesa():
    data = request.get_json()
    user_id = session.get("id")

    if user_id:
        with SessionLocal() as db_session:
            try:
                service = DespesaService(db_session)
                despesa = service.criar_despesa(data["valor"], data["tipo"], data["descricao"], user_id)

                if not isinstance(despesa, str):
                    return jsonify({
                        "id": despesa.id,
                        "message": "Despesa criada com sucesso"
                    }), 201
                else:
                    return jsonify({
                        "status": "Error",
                        "Message": despesa
                    }), 500
            except Exception as e:
                return jsonify({
                    "status": "Error",
                    "message": str(e)
                }), 500
    else:
        return jsonify({
            "status": "Error",
            "Message": "Não autorizado"
        }), 401


@despesa_bp.route("/", methods=["GET"])
def listar_despesas():
    user_id = session.get("id")

    if user_id:
        with SessionLocal() as db_session:
            service = DespesaService(db_session)
            despesa = service.get_despesa(user_id)

        return jsonify({
            "status": "OK",
            "despesa": despesa
        })
    else:
        return jsonify({
            "status": "Error",
            "Message": "Não autorizado"
        }), 401
