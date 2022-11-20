source /workspaces/Projeto_Monitoria_App/examples/config.txt

curl -i -X GET ${MONITORIA_URL}/professor/aberturamonitoria \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d '{"cpf_professor":"321.940.758-79", "senha":"senha123"}'