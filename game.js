//Desafio NETUNO

// Desenvolvido por Phablo Carvalho

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Usuario {
  constructor(
    nome,
    dataNascimento,
    email,
    senha,
    confirmarSenha,
    classeEscolhida,
    caracteristicasAvatar,
    ferramentaBatalha,
    montariaEscolhida
  ) {
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.email = email;
    this.senha = senha;
    this.confirmarSenha = confirmarSenha;
    this.classeEscolhida = classeEscolhida;
    this.caracteristicasAvatar = caracteristicasAvatar;
    this.ferramentaBatalha = ferramentaBatalha;
    this.montariaEscolhida = montariaEscolhida;
  }
}

function exibirMensagemBoasVindas() {
  console.log("Bem-vindo ao MMORPG NETUDO, realize o seu cadastro");
}

let usuarios = [];

function cadastrarUsuario() {
  exibirMensagemBoasVindas();
  rl.question("Nome completo: ", (nome) => {
    rl.question("Data de nascimento (DDMMYYYY): ", (dataNascimento) => {
      if (!/^\d{8}$/.test(dataNascimento)) {
        console.log(
          "A data de nascimento deve conter exatamente 8 caracteres numéricos (DDMMYYYY)."
        );
        cadastrarUsuario();
        return;
      }

      const hoje = new Date();
      const anoAtual = hoje.getFullYear();
      const mesAtual = hoje.getMonth() + 1;
      const diaAtual = hoje.getDate();
      const anoNascimento = parseInt(dataNascimento.substring(4));
      const mesNascimento = parseInt(dataNascimento.substring(2, 4));
      const diaNascimento = parseInt(dataNascimento.substring(0, 2));
      let idade = anoAtual - anoNascimento;

      if (
        mesAtual < mesNascimento ||
        (mesAtual === mesNascimento && diaAtual < diaNascimento)
      ) {
        idade--;
      }

      if (idade < 18) {
        console.log(
          "Desculpe, você precisa ter pelo menos 18 anos para jogar."
        );
        rl.close();
        return;
      }

      rl.question("Email: ", (email) => {
        if (!email.includes("@") || !email.endsWith(".com")) {
          console.log("O email deve conter '@' e terminar com '.com'.");
          cadastrarUsuario();
          return;
        }

        rl.question("Senha: ", (senha) => {
          rl.question("Confirmar senha: ", (confirmarSenha) => {
            if (senha !== confirmarSenha) {
              console.log("As senhas não coincidem. Tente novamente.");
              cadastrarUsuario();
              return;
            }

            const usuario = new Usuario(nome, dataNascimento, email, senha);
            usuarios.push(usuario);

            console.log("Usuário cadastrado com sucesso!");
            login();
          });
        });
      });
    });
  });
}

let tentativasLogin = 0;
function login() {
  console.log("\n--- Login ---");
  rl.question("Email: ", (email) => {
    rl.question("Senha: ", (senha) => {
      const usuarioCadastrado = usuarios.find(
        (user) => user.email === email && user.senha === senha
      );
      if (usuarioCadastrado) {
        console.log(
          "Login bem-sucedido! Redirecionando para a tela do jogo..."
        );
        escolherClasse(usuarioCadastrado);
      } else {
        tentativasLogin++;
        if (tentativasLogin < 3) {
          console.log("Email ou senha incorretos. Tente novamente.");
          login();
        } else {
          console.log(
            "Você excedeu o número máximo de tentativas de login. O jogo será encerrado."
          );
          rl.close();
        }
      }
    });
  });
}

cadastrarUsuario();

function escolherClasse(usuario) {
  console.log("Escolha sua classe:");
  console.log("1) Paladino [Lança ou Escudo]");
  console.log("2) Atirador [Arma]");
  console.log("3) Guerreiro [Espada e Escudo]");
  console.log("4) Bárbaro [Machado ou Marreta]");
  console.log("5) Arqueiro [Arco]");
  rl.question("Escolha sua classe: ", (classe) => {
    switch (classe) {
      case "1":
        usuario.classeEscolhida = "Paladino";
        console.log("\nVocê escolheu a classe Paladino.");
        console.log("Atributos da classe:");
        console.log("- Vida: 85");
        console.log("- Mana: 35");
        console.log("- Velocidade de Ataque: 1.25");
        escolherFerramentaBatalha(usuario, "Paladino");
        break;
      case "2":
        usuario.classeEscolhida = "Atirador";
        console.log("\nVocê escolheu a classe Atirador.");
        console.log("Atributos da classe:");
        console.log("- Vida: 70");
        console.log("- Mana: 20");
        console.log("- Velocidade de Ataque: 1.5");
        escolherFerramentaBatalha(usuario, "Atirador");
        break;
      case "3":
        usuario.classeEscolhida = "Guerreiro";
        console.log("\nVocê escolheu a classe Guerreiro.");
        console.log("Atributos da classe:");
        console.log("- Vida: 90");
        console.log("- Mana: 25");
        console.log("- Velocidade de Ataque: 1.0");
        escolherFerramentaBatalha(usuario, "Guerreiro");
        break;
      case "4":
        usuario.classeEscolhida = "Bárbaro";
        console.log("\nVocê escolheu a classe Bárbaro.");
        console.log("Atributos da classe:");
        console.log("- Vida: 100");
        console.log("- Mana: 15");
        console.log("- Velocidade de Ataque: 0.75");
        escolherFerramentaBatalha(usuario, "Bárbaro");
        break;
      case "5":
        usuario.classeEscolhida = "Arqueiro";
        console.log("\nVocê escolheu a classe Arqueiro.");
        console.log("Atributos da classe:");
        console.log("- Vida: 75");
        console.log("- Mana: 30");
        console.log("- Velocidade de Ataque: 2.0");
        escolherFerramentaBatalha(usuario, "Arqueiro");
        break;
      default:
        console.log("Opção inválida. Por favor, escolha uma classe válida.");
        escolherClasse(usuario);
    }
  });
}

function escolherFerramentaBatalha(usuario, classe) {
  switch (classe) {
    case "Paladino":
      console.log("Escolha sua ferramenta de batalha:");
      console.log("1) Lança");
      console.log("2) Escudo");
      rl.question("Escolha sua ferramenta de batalha: ", (opcao) => {
        if (opcao === "1") {
          usuario.ferramentaBatalha = "Lança";
          console.log("Você escolheu a Lança como sua ferramenta de batalha.");
          cadastrarCaracteristicas(usuario);
        } else if (opcao === "2") {
          usuario.ferramentaBatalha = "Escudo";
          console.log("Você escolheu o Escudo como sua ferramenta de batalha.");
          cadastrarCaracteristicas(usuario);
        } else {
          console.log("Opção inválida. Por favor, escolha uma opção válida.");
          escolherFerramentaBatalha(usuario, classe);
        }
      });
      break;
    case "Atirador":
      console.log("Escolha sua arma:");
      console.log("1) Arma");
      rl.question("Escolha sua arma: ", (opcao) => {
        if (opcao === "1") {
          usuario.ferramentaBatalha = "Arma";
          console.log("Você escolheu a Arma.");
          cadastrarCaracteristicas(usuario);
        } else {
          console.log("Opção inválida. Por favor, escolha uma opção válida.");
          escolherFerramentaBatalha(usuario, classe);
        }
      });
      break;
    case "Guerreiro":
      console.log("Escolha sua arma:");
      console.log("1) Espada e Escudo");
      rl.question("Escolha sua arma: ", (opcao) => {
        if (opcao === "1") {
          usuario.ferramentaBatalha = "Espada e Escudo";
          console.log("Você escolheu a arma.");
          cadastrarCaracteristicas(usuario);
        } else {
          console.log("Opção inválida. Por favor, escolha uma opção válida.");
          escolherFerramentaBatalha(usuario, classe);
        }
      });
      break;
    case "Bárbaro":
      console.log("Escolha sua ferramenta de batalha:");
      console.log("1) Machado");
      console.log("2) Marreta");
      rl.question("Escolha sua ferramenta de batalha: ", (opcao) => {
        if (opcao === "1") {
          usuario.ferramentaBatalha = "Machado";
          console.log(
            "Você escolheu o Machado como sua ferramenta de batalha."
          );
          cadastrarCaracteristicas(usuario);
        } else if (opcao === "2") {
          usuario.ferramentaBatalha = "Marreta";
          console.log(
            "Você escolheu a Marreta como sua ferramenta de batalha."
          );
          cadastrarCaracteristicas(usuario);
        } else {
          console.log("Opção inválida. Por favor, escolha uma opção válida.");
          escolherFerramentaBatalha(usuario, classe);
        }
      });
      break;
    case "Arqueiro":
      console.log("Escolha sua arma:");
      console.log("1) Arco");
      rl.question("Escolha sua arma: ", (opcao) => {
        if (opcao === "1") {
          usuario.ferramentaBatalha = "Arco";
          console.log("Você escolheu o Arco.");
          cadastrarCaracteristicas(usuario);
        } else {
          console.log("Opção inválida. Por favor, escolha uma opção válida.");
          escolherFerramentaBatalha(usuario, classe);
        }
      });
      break;
    default:
      console.log("Classe inválida.");
      break;
  }
}

function cadastrarCaracteristicas(usuario) {
  console.log(
    "\nAgora, vamos cadastrar as características físicas do seu personagem:\n"
  );
  rl.question(
    "Escolha o tipo de cabelo:\n1) Longo\n2) Curto\n3) Com tranças\n4) Moicano\nEscolha uma opção (digite o número correspondente): ",
    (tipoCabelo) => {
      if (
        !isNaN(tipoCabelo) &&
        parseInt(tipoCabelo) >= 1 &&
        parseInt(tipoCabelo) <= 4
      ) {
        rl.question(
          "Escolha a cor do cabelo:\n1) Preto\n2) Marrom\n3) Azul\n4) Branco\n5) Vermelho\n6) Amarelo\nEscolha uma opção (digite o número correspondente): ",
          (corCabelo) => {
            if (
              !isNaN(corCabelo) &&
              parseInt(corCabelo) >= 1 &&
              parseInt(corCabelo) <= 6
            ) {
              rl.question(
                "Escolha a cor da pele:\n1) Branco\n2) Pardo\n3) Negro\nEscolha uma opção (digite o número correspondente): ",
                (corPele) => {
                  if (
                    !isNaN(corPele) &&
                    parseInt(corPele) >= 1 &&
                    parseInt(corPele) <= 3
                  ) {
                    rl.question(
                      "Escolha a cor dos olhos:\n1) Castanho\n2) Preto\n3) Branco\n4) Azul\n5) Vermelho\n6) Amarelo\n7) Verde\nEscolha uma opção (digite o número correspondente): ",
                      (corOlhos) => {
                        if (
                          !isNaN(corOlhos) &&
                          parseInt(corOlhos) >= 1 &&
                          parseInt(corOlhos) <= 7
                        ) {
                          rl.question(
                            "Escolha a altura:\n1) Baixo\n2) Médio\n3) Alto\nEscolha uma opção (digite o número correspondente): ",
                            (altura) => {
                              if (
                                !isNaN(altura) &&
                                parseInt(altura) >= 1 &&
                                parseInt(altura) <= 3
                              ) {
                                const caracteristicasAvatar = {
                                  tipoCabelo: tipoCabelo,
                                  corCabelo: corCabelo,
                                  corPele: corPele,
                                  corOlhos: corOlhos,
                                  altura: altura,
                                };
                                usuario.caracteristicasAvatar =
                                  caracteristicasAvatar;
                                escolherMontaria(usuario);
                              } else {
                                console.log(
                                  "Opção de altura inválida. Por favor, escolha um número válido."
                                );
                                cadastrarCaracteristicas(usuario);
                              }
                            }
                          );
                        } else {
                          console.log(
                            "Opção de cor dos olhos inválida. Por favor, escolha um número válido."
                          );
                          cadastrarCaracteristicas(usuario);
                        }
                      }
                    );
                  } else {
                    console.log(
                      "Opção de cor da pele inválida. Por favor, escolha um número válido."
                    );
                    cadastrarCaracteristicas(usuario);
                  }
                }
              );
            } else {
              console.log(
                "Opção de cor do cabelo inválida. Por favor, escolha um número válido."
              );
              cadastrarCaracteristicas(usuario);
            }
          }
        );
      } else {
        console.log(
          "Opção de tipo de cabelo inválida. Por favor, escolha um número válido."
        );
        cadastrarCaracteristicas(usuario);
      }
    }
  );
}

function escolherMontaria(usuario) {
  console.log("Escolha sua montaria:");
  console.log("1) Panda");
  console.log("2) Cavalo");
  console.log("3) Dragão");
  console.log("4) Hipogrífo");
  console.log("5) Vassoura");
  rl.question(
    "Escolha sua montaria (digite o número correspondente): ",
    (montaria) => {
      if (
        !isNaN(montaria) &&
        parseInt(montaria) >= 1 &&
        parseInt(montaria) <= 5
      ) {
        switch (montaria) {
          case "1":
            usuario.montariaEscolhida = "Panda";
            console.log("\nVocê escolheu o Panda como sua montaria.");
            console.log("Atributos da montaria:");
            console.log("- Velocidade: 2m/s");
            console.log("- Tempo para descanso: 10 minutos");
            break;
          case "2":
            usuario.montariaEscolhida = "Cavalo";
            console.log("\nVocê escolheu o Cavalo como sua montaria.");
            console.log("Atributos da montaria:");
            console.log("- Velocidade: 5m/s");
            console.log("- Tempo para descanso: 20 minutos");
            break;
          case "3":
            usuario.montariaEscolhida = "Dragão";
            console.log("\nVocê escolheu o Dragão como sua montaria.");
            console.log("Atributos da montaria:");
            console.log("- Velocidade: 10m/s");
            console.log("- Tempo para descanso: 30 minutos");
            break;
          case "4":
            usuario.montariaEscolhida = "Hipogrífo";
            console.log("\nVocê escolheu o Hipogrífo como sua montaria.");
            console.log("Atributos da montaria:");
            console.log("- Velocidade: 8m/s");
            console.log("- Tempo para descanso: 25 minutos");
            break;
          case "5":
            usuario.montariaEscolhida = "Vassoura";
            console.log("\nVocê escolheu a Vassoura como sua montaria.");
            console.log("Atributos da montaria:");
            console.log("- Velocidade: 3m/s");
            console.log("- Tempo para descanso: 15 minutos");
            break;
        }

        rl.question("\nDeseja finalizar a criação? (s/n): ", (resposta) => {
          if (resposta.toLowerCase() === "s") {
            exibirResumo(usuario);
          } else {
            cadastrarCaracteristicas(usuario);
          }
        });
      } else {
        console.log("Opção inválida. Por favor, escolha um número de 1 a 5.");
        escolherMontaria(usuario);
      }
    }
  );
}

function exibirResumo(usuario) {
  console.log("\n--- Resumo do Cadastro ---");
  console.log("Nome: " + usuario.nome);
  console.log("Data de Nascimento: " + usuario.dataNascimento);
  console.log("Email: " + usuario.email);
  console.log("Classe Escolhida: " + usuario.classeEscolhida);
  console.log("Características do Avatar:");
  console.log(
    "Tipo de Cabelo: " +
      obterDescricaoTipoCabelo(usuario.caracteristicasAvatar.tipoCabelo)
  );
  console.log(
    "Cor do Cabelo: " +
      obterDescricaoCorCabelo(usuario.caracteristicasAvatar.corCabelo)
  );
  console.log(
    "Cor da Pele: " +
      obterDescricaoCorPele(usuario.caracteristicasAvatar.corPele)
  );
  console.log(
    "Cor dos Olhos: " +
      obterDescricaoCorOlhos(usuario.caracteristicasAvatar.corOlhos)
  );
  console.log(
    "Altura: " + obterDescricaoAltura(usuario.caracteristicasAvatar.altura)
  );
  console.log("Ferramenta de Batalha: " + usuario.ferramentaBatalha);
  console.log("Montaria Escolhida: " + usuario.montariaEscolhida);
  console.log("\nTenha um ótimo jogo, criado por Phablo Carvalho!!!");
  rl.close();
}

function obterDescricaoTipoCabelo(tipoCabelo) {
  switch (tipoCabelo) {
    case "1":
      return "Longo";
    case "2":
      return "Curto";
    case "3":
      return "Com tranças";
    case "4":
      return "Moicano";
    default:
      return "Desconhecido";
  }
}

function obterDescricaoCorCabelo(corCabelo) {
  switch (corCabelo) {
    case "1":
      return "Preto";
    case "2":
      return "Marrom";
    case "3":
      return "Azul";
    case "4":
      return "Branco";
    case "5":
      return "Vermelho";
    case "6":
      return "Amarelo";
    default:
      return "Desconhecido";
  }
}

function obterDescricaoCorPele(corPele) {
  switch (corPele) {
    case "1":
      return "Branco";
    case "2":
      return "Pardo";
    case "3":
      return "Negro";
    default:
      return "Desconhecido";
  }
}

function obterDescricaoCorOlhos(corOlhos) {
  switch (corOlhos) {
    case "1":
      return "Castanho";
    case "2":
      return "Preto";
    case "3":
      return "Branco";
    case "4":
      return "Azul";
    case "5":
      return "Vermelho";
    case "6":
      return "Amarelo";
    case "7":
      return "Verde";
    default:
      return "Desconhecido";
  }
}

function obterDescricaoAltura(altura) {
  switch (altura) {
    case "1":
      return "Baixo";
    case "2":
      return "Médio";
    case "3":
      return "Alto";
    default:
      return "Desconhecido";
  }
}
