source /workspaces/Projeto_Monitoria_App/examples/config.txt

curl -X GET ${MONITORIA_URL}/aluno/monitor/agendamento/monitoria \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d '{ "senha":"99999"}'