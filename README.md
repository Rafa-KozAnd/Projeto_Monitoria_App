# Projeto_Monitoria_App

## Provisionamento

Provisionamento do codigo atualmente se encontra no Heroku, juntamente com o banco de dados e pode ser acessado atravez da url:https://projeto-monitoria-api.herokuapp.com/ 

Ao fazer commit na branch de delopment o ambiente é atualizado com o novo codigo.


# Prisma

## Prisma migrate
'' npx prisma migrate dev --name init '' 

to generate the scheema run 
'' npx prisma generate ''


# Environment variables

Add a secret token to the environemnt variable

SECRET_TOKEN='YOURTOKEN'

the application on heroku will have its own secret token and the application will use it to gernetare the authorization.

