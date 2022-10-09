source /workspaces/Projeto_Monitoria_App/examples/config.txt
export MONITORIA_TOKEN=$(curl -X POST ${MONITORIA_URL}/auth/login/aluno \ 
-H "Content-Type: application/json" \ 
-d '{"matricula":"99999", "senha":"99999"}' | jq -r '.token')

sed -i "/export MONITORIA_TOKEN=/c\export MONITORIA_TOKEN='${MONITORIA_TOKEN}'" /workspaces/Projeto_Monitoria_App/examples/config.txt