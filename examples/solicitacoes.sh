curl -i -X GET https://projeto-monitoria-api.herokuapp.com/professor/aberturamonitoria \
-H "Content-Type: application/json" \
-H "authorization: ${TOKEN}" \
-d '{"cpf_professor":"99999", "senha":"999999"}'