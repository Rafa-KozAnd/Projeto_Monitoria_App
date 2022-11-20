source /workspaces/Projeto_Monitoria_App/examples/config.txt

curl -X POST ${MONITORIA_URL}/factory/aluno \
    -H "Content-Type: application/json" \
    -H "authorization: ${MONITORIA_TOKEN}" \
    -d '{"matricula":"99999", "senha":"99999", "nome":"haissam", "email": "haissam@haissam.com", "telefone":"9999gold"}'