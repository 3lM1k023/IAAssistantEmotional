<img width="1858" height="922" alt="image" src="https://github.com/user-attachments/assets/b7f3f1cf-566c-42b3-b405-af4fc208cf35" />

# IA Assistant Emotional

## Overview

IA Assistant Emotional is an AI-powered emotional support assistant designed to identify emotions from user-written text and provide empathetic guidance through Natural Language Processing (NLP), Machine Learning, Generative AI, and Voice Synthesis. 

The platform combines a Multilingual BERT model, OpenAI API, Node.js, Flask, and ElevenLabs to create an interactive emotional support experience capable of understanding user emotions and responding through both text and voice.

---

# Problem Statement

Mental health challenges such as stress, anxiety, sadness, depression, and anger affect millions of people worldwide. However, immediate emotional support is not always available.

This project aims to provide an accessible AI-powered solution capable of understanding emotions expressed through text and delivering personalized emotional guidance in real time.

---

# Supported Emotions

The system currently detects:

* Anxiety
* Stress
* Depression
* Sadness
* Anger

---

# Technologies Used

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* LottiFiles
* Spline 3D Design

## Backend

* Node.js
* Express.js

## Artificial Intelligence

* Python
* Flask
* Transformers
* Scikit-Learn
* Multilingual BERT
* Optuna

## Generative AI

* OpenAI API

## Voice Synthesis

* ElevenLabs

## Database

* MySQL

---

# System Architecture

User

↓

React Frontend

↓

Node.js Backend

↓

Flask Machine Learning API

↓

Multilingual BERT Model

↓

Emotion Classification

↓

OpenAI API

↓

Empathetic Response Generation

↓

ElevenLabs

↓

Voice Synthesis

↓

Text + Audio Response

---

# Application Workflow

1. The user writes a message in the chat interface.
2. The Node.js backend receives the request.
3. The text is sent to the Flask Machine Learning API.
4. The Multilingual BERT model predicts the dominant emotion.
5. Personalized recommendations are generated.
6. OpenAI API creates an empathetic and context-aware response.
7. ElevenLabs converts the generated response into speech.
8. The user receives both text and voice feedback.

---

# Dataset

The emotional classification model was trained using the **Dreaddit Dataset** from Kaggle.

Dataset:

Stress Analysis in Social Media (Dreaddit)

Source:

https://www.kaggle.com/datasets/ruchi798/stress-analysis-in-social-media

The dataset contains Reddit posts related to emotional distress and stress analysis.

To support multilingual emotion detection, the dataset was translated into Spanish before training.

---

# Machine Learning Pipeline

## Data Preparation

The dataset undergoes several preprocessing steps:

* Text cleaning
* Translation to Spanish
* Tokenization
* Attention mask generation
* Dataset preparation for Transformer models

---

## Multilingual BERT

The project uses:

```text
bert-base-multilingual-cased
```

This Transformer model supports over 100 languages and provides contextual understanding of text.

Advantages:

* Multilingual support
* Semantic understanding
* Context-aware predictions
* Better performance than traditional machine learning approaches

---

## Hyperparameter Optimization with Optuna

To improve performance, Optuna was used to automatically search for the best configuration.

Parameters explored:

```python
learning_rate = [1e-5, 5e-5]

batch_size = [8, 16]

num_epochs = [3, 4, 5]

max_length = [96, 128, 160]

weight_decay = variable
```

Optimization objective:

```text
Maximize F1 Score
```

Optuna evaluated multiple combinations and selected the best-performing hyperparameters.

---

## Cross Validation

A 3-Fold Cross Validation strategy was implemented to improve model robustness and reduce overfitting.

Training procedure:

```text
Fold 1
Fold 2
Fold 3
```

For each fold:

1. The model was trained.
2. Validation metrics were calculated.
3. The best-performing model was saved.

Generated files:

```text
resultados_cross_validation_bert.csv
mejor_modelo_bert_cv.zip
```

---

# Model Performance

## Fold Results

| Fold | Accuracy | Precision | Recall | F1 Score |
| ---- | -------- | --------- | ------ | -------- |
| 1    | 0.7197   | 0.6892    | 0.8293 | 0.7528   |
| 2    | 0.6891   | 0.6842    | 0.7398 | 0.7109   |
| 3    | 0.7017   | 0.7364    | 0.6585 | 0.6953   |

---

## Average Cross Validation Results

| Metric    | Score  |
| --------- | ------ |
| Accuracy  | 0.7035 |
| Precision | 0.7033 |
| Recall    | 0.7425 |
| F1 Score  | 0.7197 |

Best F1 Score:

```text
0.7528
```

---

# Features

* Automatic emotion classification.
* Empathetic AI responses.
* Voice response generation.
* Modern conversational interface.
* React + Node.js + Flask architecture.
* OpenAI integration.
* ElevenLabs integration.
* Multilingual support.
* Machine Learning powered emotion detection.

---

# Demo Video

A complete demonstration of the project can be found here:

```md
https://youtu.be/nQPfFH5zI4s
```

---

# Google Colab Notebooks

Machine Learning development and experimentation were performed using Google Colab.

Training Notebook:

```md
https://colab.research.google.com/drive/1zXTqkhq3qYLP0Dh7ipmM1cIXWS97Td2l?usp=sharing
```

# Installation

## Frontend

```bash
npm install
npm run dev
```

## Backend

```bash
npm install
npm run dev
```

## Flask Machine Learning API

```bash
pip install -r requirements.txt

python app.py
```

---

# Environment Variables

Create a `.env` file:

```env
OPENAI_API_KEY=YOUR_OPENAI_API_KEY

ELEVENLABS_API_KEY=YOUR_ELEVENLABS_API_KEY

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=*****
DB_NAME=ia_emotional
```

---

# Future Improvements

* Facial emotion recognition.
* Multimodal emotion analysis.
* User emotion history tracking.
* Personalized emotional analytics dashboard.
* Advanced recommendation engine.
* Real-time speech input from users.
* Voice-to-text interaction.
* Fully conversational voice assistant mode.
* Mobile application support.
* Real-time emotional monitoring.

---

# Team Members

* Miguel Ángel Barrera Campos
  - Backend Developer
  - Machine Learning Engineer
  - NLP Engineer
  - BERT Model Training
  - OpenAI Integration
  - ElevenLabs Integration
  - Flask API Development
* Ángel Gabriel Rodríguez Damian
  - Frontend Developer
  - UI/UX Design
* Oscar Uriel Robles Soriano
  - Business & Pitch Lead
* Maria Fernanda Velasco Campos
  - Frontend Developer
  - UI/UX Design
* Martin Antonio Bautista Díaz
  - Testing and Validation
  - Backend Developer
* Adviser: Muñiz Rascado Jose Luis

---

# Competition

Hackatec 2026 – Local Phase

Instituto Tecnológico de Zacatepec

---

# License

This project was developed for educational, research, and innovation purposes as part of Hackatec 2026.
