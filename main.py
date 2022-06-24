game.set_score(0)
vidas = 3
delay = 450
posicao_jogador = 2
virus_x = randint(0, 4)
virus_y = 2
virus_tipo = 1
virus_descida_lenta = True
basic.show_string("GO!")

def on_forever():
    while vidas > 0:
        basic.clear_screen()
        if virus_tipo == 0:
            if virus_y <= 4:
                led.plot_brightness(virus_x, virus_y, 9)
            if virus_y > 0 and virus_y <= 5:
                led.plot_brightness(virus_x, virus_y - 1, 6)
            if virus_y > 1:
                led.plot_brightness(virus_x, virus_y - 2, 3)
        if virus_tipo == 1 and virus_y <= 4:
            for índice in range(6):
                pass
basic.forever(on_forever)
