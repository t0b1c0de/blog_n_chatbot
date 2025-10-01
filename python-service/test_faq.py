import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_known_question():
    question = "Qu’est-ce que l’EBITDA ?"
    response = client.post("/chat", json={"question": question})
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert data["answer"] != "Pas de réponse."


def test_unknown_question():
    question = "Qui a gagné le concours de la plus belle voix ?"
    response = client.post("/chat", json={"question": question})
    assert response.status_code == 200
    data = response.json()
    assert data["answer"] == "Pas de réponse."
