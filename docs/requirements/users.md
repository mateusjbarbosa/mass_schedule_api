# Agenda de Missas - Paróquia Nossa Senhora da Conceição | Funcionalidades para o Usuário

> ## Usuários
> Um usuário na Agenda de Missas da Pároquia possui três funções: fiél, secretário e administrador.

### Funcionalidade 01: Cadastrar fiél
Um fiél possui diversos campos para cadastro, sendo:

- Nome completo
- Número de telefone/celular
- Data de nascimento
- Dizimista (sim/não)
- Endereço (Rua, número, bairro, cidade e estado)

#### Caso de sucesso no cadastro
1. Usuário insere os dados para cadastro
2. Sistema verifica se o nome completo possui pelo menos 5, e no máximo 100, caracteres.
3. Sistema verifica se o número de telefone possui somente números.
4. Sistema verifica se o DDD do telefone é 35.
5. Sistema verifica se o número de telefone possui 10 caracteres (DDD + número, para telefones fixos) ou 11 caracteres (DDD + numeros, para celulares).
6. Sistema verifica se a data de nascimento é válida, sendo que o fiél deve ter no mínimo 12 anos e no máximo 60, preferencialmente.
7. Sistema verifica se o endereço cadastrado é de Conceição dos Ouros.
8. Sistema retorna sucesso para o fiél.

#### Exceção 01: Nome fora dos limites
1. Sistema retorna erro

#### Exceção 02: Número de telefone não possui somente números
1. Sistema retorna erro

#### Exceção 03: Número de telefone com DDD diferente de 35
1. Sistema retorna erro

#### Exceção 04: Número de telefone fora dos limites
1. Sistema retorna erro

#### Exceção 05: Idade do fiél fora dos limites
1. Sistema retorna erro

#### Exceção 06: Endereço de outra cidade
1. Sistema retorna erro
