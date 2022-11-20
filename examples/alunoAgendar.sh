source /workspaces/Projeto_Monitoria_App/examples/config.txt

curl -X POST ${MONITORIA_URL}/aluno/agendar/monitoria \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d '{ "id_monitoria":"26", "horario":"17:00"}'