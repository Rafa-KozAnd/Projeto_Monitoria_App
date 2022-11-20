source /workspaces/Projeto_Monitoria_App/examples/config.txt

export MONITORIA_TOKEN=$(curl -X POST ${MONITORIA_URL}/auth/login/colaborador \
-H "Content-Type: application/json" \
-d '{"matricula":"752.604.839-10", "senha":"123456"}' | jq -r '.token')

sed -i "/export MONITORIA_TOKEN=/c\export MONITORIA_TOKEN='${MONITORIA_TOKEN}'" /workspaces/Projeto_Monitoria_App/examples/config.txt