source /workspaces/Projeto_Monitoria_App/examples/config.txt

curl -X POST ${MONITORIA_URL}/create \
    -H "Content-Type: application/json" \
    -H "authorization: ${MONITORIA_TOKEN}" \
    -d '{"cpf":"03434343434", "senha":"blablaaa", "nome":"haissam", "role":"Professor", "email": "haissam@haissam.com"}'