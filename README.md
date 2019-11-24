## Project0 module PAAS

Groupe6 : regroupant les villes Lyon, Strasbourg et Toulouse

Membres du groupe :

- jordan.augier@epitech.eu (Lyon)
- jacques.mingeon@epitech.eu (Lyon)
- thomas.henon@epitech.eu (Strasbourg)
- aurelien.darragon@epitech.eu (Strasbourg)
- thomas.lemoine@epitech.eu (Toulouse)


Pour lancer le projet:

```bash
cd /api
docker build .

cd ..
docker-compose up
```

kompose convert -c -o helm --build none --volumes hostPath
helm install --namespace epi-paas-subject1 --name subject1 ./helm/
helm upgrade subject1 ./helm/
helm delete --purge subject1

kubectl create secret tls wildcard-paas-epi --key privkey.pem --cert fullchain.pem

helm install --namespace epi-paas-subject1 --name nginx-ingress stable/nginx-ingress

kubectl patch service nginx-ingress-controller -n epi-paas-subject1 -p '{"spec": {"type": "LoadBalancer", "externalIPs":["192.168.126.4"]}}'

kubectl create  --namespace epi-paas-subject1 -f ./ingress.yml
