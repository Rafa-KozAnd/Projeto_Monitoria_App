curl -i -X GET https://projeto-monitoria-api.herokuapp.com/professor/aberturamonitoria \
-H "Content-Type: application/json" \
-H "authorization: ${TOKEN}" \
-d '{"cpf_professor":"321.940.758-79", "senha":"senha123"}'