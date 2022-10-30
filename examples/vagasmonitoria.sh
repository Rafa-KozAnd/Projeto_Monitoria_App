source /workspaces/Projeto_Monitoria_App/examples/config.txt

curl -X GET ${MONITORIA_URL}/aluno/vagasmonitoria \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d '{"matricula":"99999", "senha":"999999"}'