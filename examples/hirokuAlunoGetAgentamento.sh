source /workspaces/Projeto_Monitoria_App/examples/confighiroku.txt

curl -X GET ${MONITORIA_URL}/aluno/agendamento/horarios/43 \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d '{ "senha":"123"}'