FROM ubuntu

#Install dependencies necessary for wav synthesis from midi and sound conversion
RUN apt-get update -y \
	&& apt-get install -y fluidsynth timidity libsndfile1 \
	#Install pip for managing pythonpackages
	python3-pip

ENV FLASK_ENV=production

WORKDIR /app

COPY ./requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD gunicorn -w 5 --threads 3 --bind 0.0.0.0:8000 wsgi:app