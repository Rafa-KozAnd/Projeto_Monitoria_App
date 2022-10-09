source /workspaces/Projeto_Monitoria_App/examples/config.txt

curl -X GET ${MONITORIA_URL}/aluno/perfil \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d '{"matricula":"99999", "senha":"99999"}'