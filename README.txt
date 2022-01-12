Ce document retrace le raisonnement depuis le début du tp pour faire tourner à présent passer direct à l'étape 7

1) Build l'image à partir du dockerfile -t pour definir nom et tag
docker build . -t fizzbuzz:v1.0

2) Pour changer tag d'une version 
docker tag fizzbuzz:latest fizzbuzz:v1.0.0

3) Pour lancer le container 
# -d pour lancer en tache de fond (dans ce cas /bin/bash inutile)
# -rm detruit le conteneur une fois arrété
# -it  interactive mode --> lance un pseudo terminal
# -v pour les volume

docker run --rm -d -it -v ${pwd}:/app --name app fizzbuzz:v1.0
docker run --rm -it -v ${pwd}:/app --name app fizzbuzz:v1.0 /bin/bash

4) Se connecter au container
docker exec -it app /bin/bash

5) Tuer le container
docker kill app

6) 
docker pull mongo
docker run --rm -d -it -v ${pwd}:/app --name mongodb mongo
docker exec -it mongodb /bin/bash

7) Avec docker compose

docker-compose up 

docker-compose exec mongo_service /bin/bash
--> mongosh fizzbuzz -u admin -p Mdp64
--> db.games.find()

docker-compose exec fizzbuzz_service bash
--> npm run start