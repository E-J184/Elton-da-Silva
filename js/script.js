
var CONFIG = {
    nomeDele: "Meu amor",
    inicio: "2023-11-12T00:00:00",

    pergunta: "Queres continuar a escrever esta história comigo?",
    respostaSim: "Eu sabia! Amo-te! ",

    // Número com indicativo 258, sem o +
    whatsapp: "258873834970",

    mensagens: [

        "Obrigado por estares sempre ao meu lado.",

        "Obrigado por cada momento de alegria.",

        `Meu amor, desculpa por cada lágrima que te fiz derramar, por cada discussão, por cada momento em que te fiz sentir mal, por cada vez que te julguei e por insistir tantas vezes nos mesmos assuntos. Desculpa por não ter sido o namorado que merecias, pelas minhas desconfianças, pelas minhas atitudes, pelas mentiras, pela traição e, acima de tudo, pela falta de respeito. Desculpa por todas as vezes em que te magoei quando tudo o que eu mais queria era fazer-te feliz.

Bby, dói-me olhar para nós hoje e perceber o quanto éramos felizes antes, o quanto sorríamos e o quanto tudo parecia mais bonito. Dói ainda mais saber que, com os meus erros, contribuí para que tanta coisa mudasse entre nós. Sei que não basta pedir desculpas para apagar tudo o que aconteceu, nem posso esperar que simplesmente esqueças as vezes em que te fiz sofrer.

Quero que saibas que me arrependo profundamente de cada erro, de cada mentira e de cada atitude que te fez perder a confiança em mim. Se pudesse voltar atrás, mudaria tantas coisas, não para fingir que nunca errei, mas para não te fazer passar por tanta dor.

Nunca foi minha intenção fazer-te sofrer, mas reconheço que as minhas atitudes falaram mais alto do que as minhas palavras. Hoje percebo que amar alguém não é apenas dizer que ama, é também respeitar, cuidar, compreender, ser sincero e transmitir segurança. E em muitos momentos falhei contigo.

Não te peço que esqueças tudo de um dia para o outro. Só te peço que, se ainda existir um espaço no teu coração para nós, me permitas mostrar, através das minhas atitudes, que estou verdadeiramente arrependido e que quero ser melhor.

Sinto muito por ter ferido o coração de alguém que só queria ver feliz. Perdoa-me, meu amor. Desculpa por não ter cuidado de nós como deveria. Desculpa por ter colocado em risco algo que significava tanto para mim.

Eu não quero apenas recuperar o que tínhamos. Quero aprender com os meus erros e construir contigo algo ainda melhor, com mais amor, respeito, sinceridade e confiança. Amo-te, bby, e lamento profundamente por todas as vezes em que fui o motivo da tua tristeza. ❤️`,

        "Perdoa-me, bby. Do fundo do meu coração, peço-te que não desistas de nós. Sei que errei e que te magoei, mas o meu arrependimento é sincero. Não quero perder aquilo que construímos juntos.",

        "Amo-te hoje, amanhã e sempre. "
    ],

    fotos: [
        "Foto$.jpeg",
        "foto1.jpeg",
        "Foto2.jpeg",
        
        
        "Foto5.jpeg",
        "Foto6.jpeg",
        "Foto7.jpeg",
        "Foto8.jpeg",
        "Foto9.jpeg",
        "Foto10.jpeg",
        "Foto11.jpeg",
        "Foto12.jpeg",
        "Foto13.jpeg",
        "video1.mp4",
        "video2.mp4",
        "Foto16.jpg",
        "Foto17.jpg",
        "Foto18.jpg",
        "Foto19.jpg",
        "Foto20.jpg",
        "Foto21.jpg",
        "Foto22.jpg",
        "Foto23.jpg"
    ],

    musica: "musica/Futuro.mp3"
};


/* ==========================================================
   INICIALIZAÇÃO
   ========================================================== */

$(function () {

    /* Títulos */
    $("#tituloIntro").text("Para ti, " + CONFIG.nomeDele);
    $("#pergunta").text(CONFIG.pergunta);


    /* Abrir presente */
    $("#abrir").on("click", function () {

        $("#intro").fadeOut(600, function () {
            $("#conteudo").prop("hidden", false).hide().fadeIn(800);
        });

        if (CONFIG.musica) {
            var audio = $("#musica")[0];
            audio.src = CONFIG.musica;
            audio.play().catch(function () {});
        }

    });


    /* Contador de tempo juntos */
    function actualizar() {

        var ini = new Date(CONFIG.inicio);
        var agora = new Date();

        var anos = agora.getFullYear() - ini.getFullYear();
        var meses = agora.getMonth() - ini.getMonth();

        if (agora.getDate() < ini.getDate()) {
            meses--;
        }

        if (meses < 0) {
            anos--;
            meses += 12;
        }

        var ref = new Date(ini);
        ref.setFullYear(ini.getFullYear() + anos);
        ref.setMonth(ini.getMonth() + meses);

        var resto = Math.max(0, agora - ref) / 1000;

        $("#cAnos").text(anos);
        $("#cMeses").text(meses);
        $("#cDias").text(Math.floor(resto / 86400));
        $("#cHoras").text(Math.floor(resto % 86400 / 3600));
        $("#cMin").text(Math.floor(resto % 3600 / 60));
        $("#cSeg").text(Math.floor(resto % 60));

    }

    actualizar();
    setInterval(actualizar, 1000);


    /* Mensagens uma a uma */
    var i = 0;

    $.each(CONFIG.mensagens, function (_, mensagem) {

        $("#mensagens").append(
            $("<div class='msg'>").text(mensagem)
        );

    });

    $("#proxima").on("click", function () {

        var mensagem = $("#mensagens .msg").eq(i);

        if (mensagem.length) {
            mensagem.fadeIn(700);
            i++;
        }

        if (i >= CONFIG.mensagens.length) {

            $(this)
                .text("Isso foi tudo... por agora ")
                .prop("disabled", true);

        }

    });


    /* Galeria de fotografias e vídeos */
    $.each(CONFIG.fotos, function (_, ficheiro) {

        var $div = $("<div class='foto'>");
        var extensao = ficheiro.split(".").pop().toLowerCase();

        if (["mp4", "webm", "ogg"].indexOf(extensao) !== -1) {

            var $video = $("<video>")
                .attr("src", "fotos/" + ficheiro)
                .attr("controls", true)
                .attr("preload", "metadata")
                .attr("playsinline", true);

            $div.append($video);

        } else {

            var $imagem = $("<img>")
                .attr("src", "fotos/" + ficheiro)
                .attr("alt", "Nossa recordação")
                .on("error", function () {
                    $(this).remove();
                    $div.text("💗");
                });

            $div.append($imagem);

        }

        $("#galeria").append($div);

    });


    /* Botão NÃO foge */
    $("#nao").on("mouseenter touchstart", function (e) {

        e.preventDefault();

        var $botao = $(this);

        var largura = Math.max(
            0,
            $(".botoes").width() - $botao.outerWidth()
        );

        $botao.css({
            position: "absolute"
        }).animate({

            left: Math.random() * largura,
            top: Math.random() * 60

        }, 200);

    });


    /* Botão SIM e envio pelo WhatsApp */
    $("#sim").on("click", function () {

        $("#nao").fadeOut();

        $("#resposta")
            .text(CONFIG.respostaSim)
            .prop("hidden", false)
            .hide()
            .fadeIn(600);

        chuva(40);

        var mensagem = "A Ámina respondeu SIM ";

        var link = "https://wa.me/" +
            CONFIG.whatsapp +
            "?text=" +
            encodeURIComponent(mensagem);

        window.open(link, "_blank");

    });


    /* Corações a subir */
    function coracao() {

        var $c = $("<span class='coracao'>")
            .text(["💖", "❤️", "💗", "💕"][
                Math.floor(Math.random() * 4)
            ])
            .css({

                left: Math.random() * 100 + "%",
                fontSize: 14 + Math.random() * 24 + "px",
                animationDuration: 5 + Math.random() * 5 + "s"

            });

        $("#coracoes").append($c);

        setTimeout(function () {
            $c.remove();
        }, 10000);

    }


    /* Chuva de corações */
    function chuva(quantidade) {

        for (var k = 0; k < quantidade; k++) {
            setTimeout(coracao, k * 80);
        }

    }

    setInterval(coracao, 900);

});
