## RF/ RNF/ RN - Cadastro do carro:
**RF** - Requisitos funcionais
- Deve ser possível cadastrar um novo carro.

**RN** - Regras de negócio
- Não deve ser possível cadastrar um carro com uma placa já existente.
<!-- - Não deve ser possível alterar a placa de um carro já cadastrado. -->
- O carro deve ser cadastrado, por padrão, com disponibilidade.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

## RF/ RNF/ RN - Listagem de carros:
**RF** - Requisitos funcionais
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN** - Regras de negócio
- O usuário não precisa estar logado no sistema.

## RF/ RNF/ RN - Cadastro de especificação no carro:
**RF** - Requisitos funcionais
- Deve ser possível cadastrar uma especificação para um carro.
<!-- - Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros. -->

**RN** - Regras de negócio
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

## RF/ RNF/ RN - Cadastro de imagens do carro:
**RF** - Requisitos funcionais
- Deve ser possível cadastrar a imagem do carro.
<!-- - Deve ser possível listar todos os carros. -->

**RNF** - Requisitos Não funcionais
- Utilizar o `multer` para upload dos arquivos.

**RN** - Regras de negócio
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

## RF/ RNF/ RN - Aluguel de carro:
**RF** - Requisitos funcionais
- Deve ser possível cadastrar um aluguel.

**RN** - Regras de negócio
- O aluguel deve ter duração mínima de `24` horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- O usuário deve estar logado na aplicação.
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

## RF/ RNF/ RN - Devolução de carro:
**RF** - Requisitos funcionais
- Deve ser possível realizar a devolução de um carro.

**RN** - Regras de negócio
- Se o carro for devolvido com menos de `24` horas, deverá ser cobrado diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deve estar logado na aplicação.

## RF/ RNF/ RN - Listagem de alugueis para usuário:
**RF** - Requisitos funcionais
- Deve ser possível realizar a busca de todos os alugueis para o usuario

**RN** - Regras de negócio
- o usuario deve estar logado na aplicação

## RF/ RNF/ RN - Recuperar senha:
**RF** - Requisitos funcionais
- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O usuário deve conseguir inserir uma nova senha

**RN** - Regras de negócio
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas
