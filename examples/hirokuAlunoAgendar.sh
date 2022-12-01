source /workspaces/Projeto_Monitoria_App/examples/confighiroku.txt

curl -X POST ${MONITORIA_URL}/aluno/agendar/monitoria \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d '{ "id_monitoria":"42", "horario":"14:00", "data": "28/11/2022"}'