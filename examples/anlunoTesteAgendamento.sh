source /workspaces/Projeto_Monitoria_App/examples/config.txt

## faz o login com o aluno
export MONITORIA_TOKEN=$(curl -X POST ${MONITORIA_URL}/auth/login/aluno \
    -H "Content-Type: application/json" \
    -d '{"matricula":"100113", "senha":"123"}' | jq -r '.token')

sed -i "/export MONITORIA_TOKEN=/c\export MONITORIA_TOKEN='${MONITORIA_TOKEN}'" /workspaces/Projeto_Monitoria_App/examples/config.txt

## busca as monitorias disponiveis

## pega o detalhe de uma monitoria

curl -X POST ${MONITORIA_URL}/aluno/monitoria \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d '{ "id_monitoria":42}'

## Busca os horarios disponiveis da monitoria

curl -X GET ${MONITORIA_URL}/aluno/agendamento/horarios/${ID_MONITORIA} \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d '{ "senha":"99999"}'


## Faz o agendamento em um dos horarios disponiveis

curl -X POST ${MONITORIA_URL}/aluno/agendar/monitoria \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d $'{ "id_monitoria":"42", "horario":"13:30", "data": "02/12/2022"}'

## tenta agendar novamente no mesmo horario e não da certo

## busca os horarios disponiveis, o horario marcado deve voltar como falso

