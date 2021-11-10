# Cadastrar de Veículos

### Requisito Funcional

- Deve ser possível cadastrar um veículo.
- Deve ser possível listar todas as categorias.

### Regra de Negócio
- Não deve ser possível cadastrar um veículo com placa já existente.
- Não deve ser possível alterar placa de veículo cadastrado.
- Veículo deve se cadastrado por padrão disponibilidade.
- Somente usuário administrador deve cadastrar um veículo.

# Listagem de veículos

### Requisito Funcional

- Deve ser possível listar todos os veículos.
- Deve ser possível listar todos os veículos pela categoria.
- Deve ser possível listar todos os veículos pela marca.
- Deve ser possível listar todos os veículos pela nome.

### Regra de Negócio
- Para lista os veículos o usuário não precisa estar logado.


# Cadastrar de Especificação de Veículos

### Requisito Funcional

- Deve ser possível cadastrar um especificação para um veículo.
- Deve ser possivel listar todas especificações.
- Deve ser possível listar todos os veiculos.

### Regra de Negócio
- Não pode cadastrar uma especificação para um veículo não cadastrado.
- Não pode ser possível cadastrar um especicação já existente para o mesmo veículo.
- Somente usuário administrador deve cadastrar especificações.


# Cadastrar de Imagens do Veículo

### Requisito Funcional

- Deve ser possível cadastrar uma ou mais fotos do veículo.
- Deve ser possível listar todos os veículos

### Regra de Negócio
- Usar o multer para upload.
- Não pode cadastrar uma especificação para um veículo não cadastrado.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de Veículo

### Requisito Funcional

- Deve ser possível cadastrar um aluguel.
- Deve ser possível listar todos os veículos

### Regra de Negócio
- A duração mínima do aluguel deve ser 24h.
- Não deve ser possível cadastrar um aluguel caso já exista um alguel em aberto para o veículo.
- Ao realizar um aluguel o veículo deve ser alterado para indisponível.
