function som_perdeu_vida () {
    music.playTone(698, music.beat(BeatFraction.Eighth))
    music.playTone(523, music.beat(BeatFraction.Eighth))
}
input.onButtonPressed(Button.A, function () {
    if (jogador_X > 0) {
        jogador_X = jogador_X - 1
    }
})
function som_abertura () {
    music.playTone(131, music.beat(BeatFraction.Quarter))
    music.rest(music.beat(BeatFraction.Eighth))
    music.playTone(262, music.beat(BeatFraction.Eighth))
    music.rest(music.beat(BeatFraction.Eighth))
    music.playTone(392, music.beat(BeatFraction.Sixteenth))
    music.rest(music.beat(BeatFraction.Eighth))
    music.playTone(440, music.beat(BeatFraction.Eighth))
    music.rest(music.beat(BeatFraction.Eighth))
    music.playTone(494, music.beat(BeatFraction.Sixteenth))
    music.rest(music.beat(BeatFraction.Eighth))
    music.playTone(440, music.beat(BeatFraction.Eighth))
    music.rest(music.beat(BeatFraction.Eighth))
    music.playTone(392, music.beat(BeatFraction.Sixteenth))
}
function som_ganha_ponto () {
    music.playTone(988, music.beat(BeatFraction.Quarter))
    music.playTone(587, music.beat(BeatFraction.Eighth))
    music.playTone(659, music.beat(BeatFraction.Eighth))
}
function som_ganhou_vida () {
    music.playTone(988, music.beat(BeatFraction.Eighth))
    music.rest(music.beat(BeatFraction.Eighth))
    music.playTone(494, music.beat(BeatFraction.Eighth))
    music.rest(music.beat(BeatFraction.Eighth))
    music.playTone(988, music.beat(BeatFraction.Quarter))
    music.rest(music.beat(BeatFraction.Eighth))
}
input.onButtonPressed(Button.B, function () {
    if (jogador_X < 4) {
        jogador_X = jogador_X + 1
    }
})
let jogador_X = 0
music.setTempo(200)
music.setVolume(255)
game.setScore(0)
game.setLife(3)
jogador_X = 2
let jogador_Y = 4
let virus_x = randint(0, 4)
let virus_y = 0
let virus_tipo = randint(0, 2)
let virus_descida_lenta = true
let fim_de_jogo = false
let resgates = 0
let perdas = 0
let espera_virus = 450
basic.showString("GO!")
som_abertura()
basic.forever(function () {
    while (!(game.isGameOver())) {
        basic.clearScreen()
        led.plotBrightness(jogador_X, jogador_Y, 255)
        // Inicio tela
        if (virus_tipo == 0) {
            if (virus_y <= 4) {
                led.plotBrightness(virus_x, virus_y, 198)
            }
            if (virus_y > 0 && virus_y <= 5) {
                led.plotBrightness(virus_x, virus_y - 1, 170)
            }
            if (virus_y > 1) {
                led.plotBrightness(virus_x, virus_y - 2, 56)
            }
        }
        if (virus_tipo == 1 && virus_y <= 4) {
            for (let índice = 0; índice <= 4; índice++) {
                if (índice == virus_x) {
                    led.plotBrightness(índice, virus_y, 0)
                } else {
                    led.plotBrightness(índice, virus_y, 56)
                }
            }
        }
        if (virus_tipo == 2 && virus_y <= 4) {
            led.plotBrightness(virus_x, virus_y, 141)
        }
        // inicio das regras
        if (virus_y == 4) {
            if (virus_tipo == 0) {
                if (virus_x == jogador_X) {
                    basic.showIcon(IconNames.Skull)
                    basic.pause(200)
                    game.removeLife(1)
                    som_perdeu_vida()
                    virus_y = 6
                } else {
                    som_ganha_ponto()
                    game.addScore(1)
                }
            }
            if (virus_tipo == 1 && virus_descida_lenta == false) {
                if (virus_x != jogador_X) {
                    basic.showIcon(IconNames.Skull)
                    basic.pause(200)
                    game.removeLife(1)
                    som_perdeu_vida()
                    virus_y = 6
                } else {
                    som_ganha_ponto()
                    game.addScore(1)
                }
            }
            if (virus_tipo == 2 && virus_descida_lenta == false) {
                if (virus_x == jogador_X) {
                    som_ganha_ponto()
                    game.addScore(1)
                    resgates += 1
                    if (resgates == 10) {
                        basic.showIcon(IconNames.Heart)
                        basic.pause(200)
                        game.addLife(1)
                        som_ganhou_vida()
                        resgates = 0
                    }
                } else {
                    basic.showIcon(IconNames.Asleep)
                    basic.pause(200)
                    perdas += 1
                    if (perdas == 10) {
                        basic.showIcon(IconNames.Skull)
                        basic.pause(500)
                        game.removeLife(1)
                        som_perdeu_vida()
                        perdas = 0
                        virus_y = 6
                    }
                }
            }
        }
        virus_y += 1
        if ((virus_tipo == 1 || virus_tipo == 2) && virus_descida_lenta == true) {
            virus_y += -1
            virus_descida_lenta = false
        } else {
            virus_descida_lenta = true
        }
        if (virus_y > 6) {
            virus_y = 0
            if (virus_tipo == 2) {
                virus_tipo = randint(0, 2)
                virus_x = randint(0, 4)
            } else if (virus_descida_lenta == true) {
                virus_tipo = randint(0, 2)
                virus_x = randint(0, 4)
            }
        }
        basic.pause(espera_virus)
        if (espera_virus > 150) {
            espera_virus += -2
        }
    }
})
