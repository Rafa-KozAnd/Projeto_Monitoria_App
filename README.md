# Projeto_Monitoria_App


# Prisma

## Prisma migrate
'' npx prisma migrate dev --name init '' 

to generate the scheema run 
'' npx prisma generate ''


# Environment variables

Add a secret token to the environemnt variable

SECRET_TOKEN='YOURTOKEN'

the application on heroku will have its own secret token and the application will use it to gernetare the authorization.

