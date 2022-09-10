INSERT INTO public."Aluno"
(matricula, nome, senha, email, telefone, e_monitor)
VALUES('651651651', 'Pedro', '123', 'pedro@gmail.com', '41991234567', false);
INSERT INTO public."Aluno"
(matricula, nome, senha, email, telefone, e_monitor)
VALUES('5615165165', 'manoel', '123', 'manoel@gmail.com', '22888888888', true);
INSERT INTO public."Aluno"
(matricula, nome, senha, email, telefone, e_monitor)
VALUES('13058843', 'joao', '123', 'joao@gmail.com', '41999999999', false);

INSERT INTO public."Colaborador"
(nome, cpf, email, senha, "role")
VALUES('Vasco', '07337326993', 'Vasco@redes.com', '123', 'Professor'::public."Role");
INSERT INTO public."Colaborador"
(nome, cpf, email, senha, "role")
VALUES('Malga', '03521651685', 'Malga@gmail.com', '123', 'Professor'::public."Role");

INSERT INTO public."Disciplina"
(codigo_disciplina, professor_disciplina, nome)
VALUES('485135', '07337326993', 'Criptografia');
INSERT INTO public."Disciplina"
(codigo_disciplina, professor_disciplina, nome)
VALUES('651651', '07337326993', 'Redes');
INSERT INTO public."Disciplina"
(codigo_disciplina, professor_disciplina, nome)
VALUES('654168', '03521651685', 'Progamacao');

INSERT INTO public."Monitoria"
(id, codigo_disciplina, nome_disciplina, codigo_professor, horario)
VALUES(123456, '654168', 'Progamacao', '03521651685', '2022-08-21 13:54:15.134369');

INSERT INTO public."VagaMonitoria"
(id, professor_requisitante, monitoria, id_monitoria, aprovado, codigo_disciplina, status, pre_requisito)
VALUES(1, '07337326993', 0, 123456, false, '485135', 1, 'Bom');

INSERT INTO public."SolicitacaoMonitoria"
(id, codigo_disciplina, motivo, status, matricula_aluno, "monitorRecomendado")
VALUES(1, '485135', 'Quero criptografar tudo', 0, '13058843', 'O motorista do onibus');

INSERT INTO public."aluno_monitoria"
(id, matricula_aluno, id_monitoria)
VALUES(1, '5615165165', 123456);
INSERT INTO public."aluno_monitoria"
(id, matricula_aluno, id_monitoria)
VALUES(2, '651651651', 123456);

INSERT INTO public."Vagaaluno_monitoria"
(matricula_aluno, id_vaga)
VALUES('13058843', 1);
INSERT INTO public."Vagaaluno_monitoria"
(matricula_aluno, id_vaga)
VALUES('5615165165', 1);