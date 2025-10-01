import json
from fastapi import FastAPI
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
from pydantic import BaseModel
import logging


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)


app = FastAPI()

with open("faq.json", "r", encoding="utf-8") as f:
    faq = json.load(f)

faq_questions = [item["q"] for item in faq]

nltk.download("stopwords")
french_stopwords = stopwords.words("french")

vectorizer = TfidfVectorizer(stop_words=french_stopwords)
faq_matrix = vectorizer.fit_transform(faq_questions)


class QuestionRequest(BaseModel):
    question: str


@app.post("/chat")
async def answer_question(req: QuestionRequest):
    user_question = req.question
    user_vector = vectorizer.transform([user_question])

    similarities = cosine_similarity(user_vector, faq_matrix)

    best_index = similarities.argmax()
    best_score = similarities[0][best_index]

    if best_score > 0.2:
        answer = faq[best_index]["a"]
    else:
        answer = "Pas de réponse."

    logging.info(f"Question: {user_question} | Réponse : {answer}")

    return {"answer": answer}
