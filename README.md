## Project0 module PAAS

Groupe6 : regroupant les villes Lyon, Strasbourg et Toulouse

Membres du groupe :

- jordan.augier@epitech.eu (Lyon)
- jacques.mingeon@epitech.eu (Lyon)
- thomas.henon@epitech.eu (Strasbourg)
- aurelien.darragon@epitech.eu (Strasbourg)
- thomas.lemoine@epitech.eu (Toulouse)

## Installation

### Construire l'image de l'app et push vers un registry
```bash
cd api
docker build .
docker login
docker push
```

### Création du chart à partir de Docker-Compose et installation
```bash
kompose convert -c -o helm --build none --volumes hostPath
helm install --namespace epi-paas-subject1 --name epi-paas-app-subject1 ./helm/
```

### Ingress NGINX

#### Créer le wildcard TLS pour l'ingress
`kubectl create secret -n epi-paas-subject1 tls wildcard-paas-epi --key privkey.pem --cert fullchain.pem`

#### Helm
`helm install --namespace epi-paas-subject1 --name nginx-ingress stable/nginx-ingress`

#### Patch service Nginx Ingress
`kubectl patch service nginx-ingress-controller -n epi-paas-subject1 -p '{"spec": {"type": "LoadBalancer", "externalIPs":["192.168.126.4"]}}'`

#### Créer l'ingress de l'app
`kubectl create  --namespace epi-paas-subject1 -f ./app-ingress.yml`

#### Mettre le chart à jour
`helm upgrade epi-paas-app-subject1 ./helm/`

#### Supprimer le chart
`helm delete --purge epi-paas-app-subject1`

### Intégration continue

### Installer jenkins
`helm install --name jenkins --namespace epi-paas-subject1 stable/jenkins`

### Créer l'ingress pour jenkins
`kubectl create  --namespace epi-paas-subject1 -f ./jenkins-ingress.yml`

## TODO

* Configuer jenkins pour le CI
* Mettre jenkins et l'app sur un namespace distinct
