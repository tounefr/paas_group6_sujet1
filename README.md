## Project0 module PAAS

Groupe6 : regroupant les villes Lyon, Strasbourg et Toulouse

Membres du groupe :

- jordan.augier@epitech.eu (Lyon)
- jacques.mingeon@epitech.eu (Lyon)
- thomas.henon@epitech.eu (Strasbourg)
- aurelien.darragon@epitech.eu (Strasbourg)
- thomas.lemoine@epitech.eu (Toulouse)

Pour lancer le projet:


## TODO

* Configuer jenkins pour le CI
* Mettre jenkins et l'app sur un namespace distinct

### Construire l'image et push vers un registry
```bash
cd /api
docker build .

cd ..
docker-compose up
```

### Générer un chart à partir de docker-compose
`kompose convert -c -o helm --build none --volumes hostPath`

### Installer le chart
`helm install --namespace epi-paas-subject1 --name epi-paas-app-subject1 ./helm/`

### Mettre le chart à jour
`helm upgrade epi-paas-app-subject1 ./helm/`

### Supprimer le chart
`helm delete --purge epi-paas-app-subject1`

### Créer le wildcard TLS pour l'ingress
`kubectl create secret -n epi-paas-subject1 tls wildcard-paas-epi --key privkey.pem --cert fullchain.pem`

### Installer l'ingress
`helm install --namespace epi-paas-subject1 --name nginx-ingress stable/nginx-ingress`

### Patch ingress
`kubectl patch service nginx-ingress-controller -n epi-paas-subject1 -p '{"spec": {"type": "LoadBalancer", "externalIPs":["192.168.126.4"]}}'`

### Créer ingress de l'app
`kubectl create  --namespace epi-paas-subject1 -f ./ingress.yml`

### Installer jenkins
`helm install --name jenkins --namespace epi-paas-subject1 stable/jenkins`

### Créer l'ingress pour jenkins
`kubectl create  --namespace epi-paas-subject1 -f ./jenkins-ingress.yml
