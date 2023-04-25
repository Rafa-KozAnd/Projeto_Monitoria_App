<p align="center">
  <img src="http://img.shields.io/static/v1?label=STATUS&message=Concluded&color=blue&style=flat"/>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Rafa-KozAnd/Projeto_Monitoria_App">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/top/Rafa-KozAnd/Projeto_Monitoria_App">
  <img alt="GitHub repo file count" src="https://img.shields.io/github/directory-file-count/Rafa-KozAnd/Projeto_Monitoria_App">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/Rafa-KozAnd/Projeto_Monitoria_App">
  <img alt="GitHub language count" src="https://img.shields.io/github/license/Rafa-KozAnd/Projeto_Monitoria_App">
</p>

# Projeto_Monitoria_App

- Team: 
<div>
  <img align="center" height="600" widht="600" src="/Files/Grupo.jpg" /><br>
  (Supervisor: Malgarete Costa - Students: João Piovesan, Haissam Fawaz, Rafael Kozlowski, João Manoel)
</div><br>

## Provisionamento

Provisionamento do codigo atualmente se encontra no Heroku, juntamente com o banco de dados e pode ser acessado atravez da url: https://projeto-monitoria-api.herokuapp.com/ 

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

