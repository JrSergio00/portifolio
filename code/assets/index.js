window.scrollReveal = ScrollReveal({ reset: true });

// Após a página estiver carregada
document.addEventListener("DOMContentLoaded", function (e) {

    // Deixando a visibility hidden nos elementos
    let figure = document.querySelector("div.container>section:nth-child(1) figure")
    figure.style.visibility = "hidden"
    let apresentacao = document.querySelector("div.container>section:nth-child(1) div.content")
    apresentacao.style.visibility = "hidden"
    let divExperiencia = document.querySelector("section#experiencias")
    divExperiencia.style.visibility = "hidden"
    let divHabilidades = document.querySelector("section#habilidades")
    divHabilidades.style.visibility = "hidden"
    let divSobre = document.querySelector("section#sobre")
    divSobre.style.visibility = "hidden"
    let divContato = document.querySelector("section#contato")
    divContato.style.visibility = "hidden"

    // Exibindo visualmente os elementos com a biblioteca JS
    // Gerando o efeito do scroll
    scrollReveal.reveal(figure, {
        origin: 'right', // Vem do lado direito
        distance: '200px', // Distância do deslocamento
        duration: 1500, // Duração da animação em milissegundos
        // rotate: { x: 0, y: 0, z: 0 }, // Rotação inicial
        // opacity: 0, // Opacidade inicial
        // delay: 0, // Atraso em milissegundos
        // easing: 'ease', // Tipo de easing
        // mobile: false, // Se deve funcionar em dispositivos móveis
        // reset: false, // Se a animação deve ser resetada em cada revelação
        // scale: 1, // Escala do elemento
    })
    scrollReveal.reveal(apresentacao, {
        origin: 'left',
        distance: '200px',
        duration: 1500,
    })
    scrollReveal.reveal(divExperiencia, {
        duration: 1500,
        scale: .6
    })
    scrollReveal.reveal(divHabilidades, {
        duration: 1500,
        scale: .6
    })
    scrollReveal.reveal(divSobre, {
        duration: 1500,
        scale: .6
    })
    scrollReveal.reveal(divContato, {
        duration: 1500,
        scale: .6
    })

    let submitForm = document.querySelector("section#contato form button")

    // Função que valida os dados do formulário de contato
    // E envia os dados para a API
    submitForm.addEventListener('click', (e) => {
        e.preventDefault()

        let nomeInput = document.querySelector("section#contato form fieldset:nth-child(2) input")
        let nome = nomeInput.value.trim()
        let emailInput = document.querySelector("section#contato form fieldset:nth-child(3) input")
        let email = emailInput.value.trim()
        let mensagemInput = document.querySelector("section#contato form fieldset textarea")
        let mensagem = mensagemInput.value.trim()

        // Verifica se todos os campos foram preenchidos
        if (!nome || !email || !mensagem) {
            alert("Todos os campos devem estar preenchidos")
            return
        }

        // Verifica se o valor do campo possui mais de 3 caracteres
        // Impossível existir nome + " " + sobrenome com menos de 3 caracteres
        if (nome.length < 3) {
            alert("Por favor informe seu nome e sobrenome")
            return
        }

        // Verifica se o email possui o caractere "@"
        if (!email.includes("@")) {
            alert('O e-mail deve possuir o caractere "@"')
            return
        }

        let ultimoCaractereDoEmail = email[email.length - 1]
        // Verifica se o email possui algo após o caractere "@"
        if (ultimoCaractereDoEmail == "@") {
            alert('O e-mail deve possuir algo após o caractere "@"')
            return
        }

        // Verifica se o email possui caracteres " "
        if (email.includes(" ")) {
            alert('O e-mail não deve possuir espaços vazios')
            return
        }

        // Verifica se o email possui o caractere "."
        if (!email.includes(".")) {
            alert('O e-mail deve possuir o caractere "."')
            return
        }
        
        // Verifica se o email possui algo após o caractere "."
        if (ultimoCaractereDoEmail == ".") {
            alert('O e-mail deve possuir algo após o caractere "."')
            return
        }

        // Objeto com as variáveis necessárias para fazer a requisição
        let data = {
            service_id: 'service_uosgarn',
            template_id: 'template_80i67cf',
            user_id: 'h-DFEYaqExJhmE3vw',
            template_params: {
                'from_name': nome,
                'message': mensagem,
                'email': email
            }
        };

        // Requisição à API que envia o e-mail
        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).done(function () {
            
            // Caso a requisição dê certo, a mensagem de sucesso é exibida
            // E os valores dos inputs são zerados
            alert('Obrigado! Seu e-mail foi enviado');
            nomeInput.value = ""
            emailInput.value = ""
            mensagemInput.value = ""

        }).fail(function (error) {
            alert('Não foi possível enviar seu e-mail ' + JSON.stringify(error));
        });
    })
})