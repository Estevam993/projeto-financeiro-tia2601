from flask import Blueprint, request, jsonify, session
from db import SessionLocal
from services.UsuarioService import UsuarioService

usuario_bp = Blueprint("usuarios", __name__)


@usuario_bp.route("/", methods=["POST"])
def criar_usuario():
    data = request.get_json()

    with SessionLocal() as db_session:
        try:
            service = UsuarioService(db_session)
            usuario = service.criar_usuario(data["nome"], data["email"])

            if not isinstance(usuario, str):
                return jsonify({
                    "id": usuario.id,
                    "nome": usuario.nome,
                    "email": usuario.email
                }), 201
            else:
                return jsonify({
                    "status": "Error",
                    "Message": usuario
                }), 409
        except Exception as e:
            return jsonify({
                "status": "Error",
                "message": str(e)
            }), 500


@usuario_bp.route("/login", methods=["POST"])
def login_usuario():
    data = request.get_json()

    with SessionLocal() as db_session:
        try:
            service = UsuarioService(db_session)
            exist = service.exist_user(data["email"])

            if exist:
                user = service.get_usuario(data["email"])
                session['email'] = user.email
                session['nome'] = user.nome
                session['id'] = user.id

                return jsonify({
                    "message": "sucesso ao realizar login",
                    "user": user.id
                }), 200
            else:
                return jsonify({
                    "status": "Error",
                    "Message": "Não existe"
                }), 401

        except Exception as e:
            return jsonify({
                "status": "Error",
                "message": str(e)
            }), 500
