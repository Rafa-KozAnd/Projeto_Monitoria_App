source /workspaces/Projeto_Monitoria_App/examples/config.txt

## faz o login com o aluno
export MONITORIA_TOKEN=$(curl -X POST ${MONITORIA_URL}/auth/login/aluno \
    -H "Content-Type: application/json" \
    -d '{"matricula":"100113", "senha":"123"}' | jq -r '.token')

sed -i "/export MONITORIA_TOKEN=/c\export MONITORIA_TOKEN='${MONITORIA_TOKEN}'" /workspaces/Projeto_Monitoria_App/examples/config.txt

## busca as monitorias disponiveis

export RESPONSE=$(curl -X GET ${MONITORIA_URL}/aluno/monitorias \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d '{ "id_monitoria":42}')

export id_monitoria=$(echo $RESPONSE | jq -r '.[0].id_monitoria') 
## pega o detalhe de uma monitoria

curl -X POST ${MONITORIA_URL}/aluno/monitoria \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d '{ "id_monitoria":42}'

export dia_monitoria=$(echo $RESPONSE | jq -r '.dia') 

## Busca os horarios disponiveis da monitoria

export RESPONSE=$(curl -X GET ${MONITORIA_URL}/aluno/agendamento/horarios/${id_monitoria} \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d '{ "senha":"99999"}')

export horario=$(echo $RESPONSE | jq -r '.[0].horario') 
echo $horario
## Faz o agendamento em um dos horarios disponiveis

curl -X POST ${MONITORIA_URL}/aluno/agendar/monitoria \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" \
-d $'{ "id_monitoria":"42", "horario":"13:30", "data": "02/12/2022"}'

## tenta agendar novamente no mesmo horario e não da certo


curl -X GET ${MONITORIA_URL}/aluno/agendamentos \
-H "Content-Type: application/json" \
-H "authorization: ${MONITORIA_TOKEN}" 
## busca os horarios disponiveis, o horario marcado deve voltar como falso


## o monitor faz login

## o monitor busca os agendamentos 

## o monitoria aprova o agendamento

## o monitoria ve sua agenda

# o aluno ve sua agenda


